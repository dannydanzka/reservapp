#!/bin/bash

# Script to setup Android signing configuration
# Usage: ./scripts/setup-android-signing.sh

set -e

echo "🔐 Setting up Android signing configuration..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if keytool is available
if ! command -v keytool &> /dev/null; then
    echo -e "${RED}❌ keytool not found. Please install Java JDK.${NC}"
    exit 1
fi

# Create keystore directory
mkdir -p android/keystore

# Function to generate keystore
generate_keystore() {
    local keystore_name=$1
    local alias=$2
    local keystore_path="android/keystore/${keystore_name}.keystore"
    
    echo -e "${YELLOW}📋 Generating ${keystore_name} keystore...${NC}"
    echo "Please provide the following information:"
    
    read -p "Store Password: " -s store_password
    echo
    read -p "Key Password: " -s key_password
    echo
    read -p "First and Last Name: " first_last_name
    read -p "Organizational Unit: " org_unit
    read -p "Organization: " organization
    read -p "City or Locality: " city
    read -p "State or Province: " state
    read -p "Country Code (2 letters): " country
    
    keytool -genkeypair -v \
        -keystore "$keystore_path" \
        -alias "$alias" \
        -keyalg RSA \
        -keysize 2048 \
        -validity 10000 \
        -storepass "$store_password" \
        -keypass "$key_password" \
        -dname "CN=$first_last_name, OU=$org_unit, O=$organization, L=$city, S=$state, C=$country"
    
    echo -e "${GREEN}✅ Keystore generated: $keystore_path${NC}"
    
    # Update properties file
    {
        echo "# Generated on $(date)"
        echo "KEYSTORE_FILE=../keystore/${keystore_name}.keystore"
        echo "KEYSTORE_PASSWORD=$store_password"
        echo "KEY_ALIAS=$alias"
        echo "KEY_PASSWORD=$key_password"
    } > "android/keystore/${keystore_name}.properties"
    
    echo -e "${GREEN}✅ Properties file created: android/keystore/${keystore_name}.properties${NC}"
    echo -e "${YELLOW}⚠️  Make sure to backup this keystore and never lose it!${NC}"
}

# Main menu
echo "Select keystore type to generate:"
echo "1) Release keystore (for production)"
echo "2) Upload keystore (for Play App Signing)"
echo "3) Debug keystore (development only)"
echo "4) Exit"

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        generate_keystore "release" "release-key"
        ;;
    2)
        generate_keystore "upload" "upload-key"
        ;;
    3)
        echo -e "${YELLOW}🔧 Generating debug keystore...${NC}"
        keytool -genkey -v \
            -keystore android/keystore/debug.keystore \
            -storepass android \
            -alias androiddebugkey \
            -keypass android \
            -keyalg RSA \
            -keysize 2048 \
            -validity 10000 \
            -dname "CN=Android Debug,O=Android,C=US"
        echo -e "${GREEN}✅ Debug keystore generated${NC}"
        ;;
    4)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo -e "${RED}❌ Invalid choice${NC}"
        exit 1
        ;;
esac

# Update .gitignore
if ! grep -q "keystore.properties" android/.gitignore 2>/dev/null; then
    echo "" >> android/.gitignore
    echo "# Keystore files" >> android/.gitignore
    echo "keystore.properties" >> android/.gitignore
    echo "keystore/*.keystore" >> android/.gitignore
    echo "keystore/*.jks" >> android/.gitignore
    echo -e "${GREEN}✅ Updated .gitignore${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Android signing setup complete!${NC}"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo "1. Backup your keystore file(s) in a secure location"
echo "2. Add the keystore properties to your CI/CD secrets"
echo "3. Never commit keystore files or properties to version control"
echo "4. Test your signing configuration with: ./gradlew assembleRelease"
echo ""
echo -e "${YELLOW}🔐 For CI/CD, encode your keystore to base64:${NC}"
echo "base64 -i android/keystore/release.keystore | pbcopy"