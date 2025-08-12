#!/bin/bash

# Script to setup complete CI/CD pipeline for ReservApp Mobile
# Usage: ./scripts/setup-ci-cd.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Setting up CI/CD Pipeline for ReservApp Mobile${NC}"
echo "========================================================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install missing dependencies
install_dependencies() {
    echo -e "\n${YELLOW}📦 Checking dependencies...${NC}"
    
    # Check Ruby
    if ! command_exists ruby; then
        echo -e "${RED}❌ Ruby not found. Please install Ruby first.${NC}"
        exit 1
    else
        echo -e "${GREEN}✅ Ruby found: $(ruby --version)${NC}"
    fi
    
    # Check Bundler
    if ! command_exists bundle; then
        echo -e "${YELLOW}📦 Installing Bundler...${NC}"
        gem install bundler
    else
        echo -e "${GREEN}✅ Bundler found: $(bundle --version)${NC}"
    fi
    
    # Check Node.js
    if ! command_exists node; then
        echo -e "${RED}❌ Node.js not found. Please install Node.js first.${NC}"
        exit 1
    else
        echo -e "${GREEN}✅ Node.js found: $(node --version)${NC}"
    fi
    
    # Check Yarn
    if ! command_exists yarn; then
        echo -e "${YELLOW}📦 Installing Yarn...${NC}"
        npm install -g yarn
    else
        echo -e "${GREEN}✅ Yarn found: $(yarn --version)${NC}"
    fi
    
    # Install Ruby dependencies
    echo -e "\n${YELLOW}💎 Installing Ruby dependencies...${NC}"
    bundle install
    
    # Install Node.js dependencies
    echo -e "\n${YELLOW}📦 Installing Node.js dependencies...${NC}"
    yarn install --frozen-lockfile
}

# Function to setup iOS
setup_ios() {
    echo -e "\n${BLUE}🍎 Setting up iOS configuration...${NC}"
    
    # Check if iOS directory exists
    if [ ! -d "ios" ]; then
        echo -e "${RED}❌ iOS directory not found. Make sure you're in the project root.${NC}"
        exit 1
    fi
    
    # Install CocoaPods if needed
    if ! command_exists pod; then
        echo -e "${YELLOW}📦 Installing CocoaPods...${NC}"
        gem install cocoapods
    fi
    
    # Install iOS dependencies
    echo -e "${YELLOW}📦 Installing iOS pods...${NC}"
    cd ios && pod install && cd ..
    
    echo -e "${GREEN}✅ iOS setup complete${NC}"
}

# Function to setup Android
setup_android() {
    echo -e "\n${BLUE}🤖 Setting up Android configuration...${NC}"
    
    # Check if Android directory exists
    if [ ! -d "android" ]; then
        echo -e "${RED}❌ Android directory not found. Make sure you're in the project root.${NC}"
        exit 1
    fi
    
    # Make gradlew executable
    if [ -f "android/gradlew" ]; then
        chmod +x android/gradlew
        echo -e "${GREEN}✅ Made gradlew executable${NC}"
    fi
    
    # Create keystore directory
    mkdir -p android/keystore
    echo -e "${GREEN}✅ Created keystore directory${NC}"
    
    # Setup gitignore for keystore
    if [ -f "android/.gitignore" ]; then
        if ! grep -q "keystore.properties" android/.gitignore; then
            echo "" >> android/.gitignore
            echo "# Keystore files" >> android/.gitignore
            echo "keystore.properties" >> android/.gitignore
            echo "keystore/*.keystore" >> android/.gitignore
            echo "keystore/*.jks" >> android/.gitignore
            echo -e "${GREEN}✅ Updated Android .gitignore${NC}"
        fi
    fi
    
    echo -e "${GREEN}✅ Android setup complete${NC}"
}

# Function to setup Fastlane
setup_fastlane() {
    echo -e "\n${BLUE}⚡ Setting up Fastlane...${NC}"
    
    # Initialize Fastlane if not exists
    if [ ! -f "fastlane/Fastfile" ]; then
        echo -e "${YELLOW}📋 Initializing Fastlane...${NC}"
        bundle exec fastlane init
    fi
    
    # Test Fastlane installation
    if bundle exec fastlane --version > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Fastlane setup complete: $(bundle exec fastlane --version)${NC}"
    else
        echo -e "${RED}❌ Fastlane setup failed${NC}"
        exit 1
    fi
}

# Function to setup environment files
setup_environment() {
    echo -e "\n${BLUE}🔧 Setting up environment configuration...${NC}"
    
    # Create .env from example if not exists
    if [ ! -f ".env" ] && [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${GREEN}✅ Created .env from example${NC}"
        echo -e "${YELLOW}⚠️  Please configure your .env file with actual values${NC}"
    fi
    
    # Create .env.local if not exists
    if [ ! -f ".env.local" ]; then
        touch .env.local
        echo -e "${GREEN}✅ Created .env.local for local overrides${NC}"
    fi
}

# Function to run initial tests
run_initial_tests() {
    echo -e "\n${BLUE}🧪 Running initial tests...${NC}"
    
    # TypeScript check
    if yarn type-check > /dev/null 2>&1; then
        echo -e "${GREEN}✅ TypeScript check passed${NC}"
    else
        echo -e "${YELLOW}⚠️  TypeScript check has warnings/errors${NC}"
    fi
    
    # Lint check
    if yarn lint > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Lint check passed${NC}"
    else
        echo -e "${YELLOW}⚠️  Lint check has warnings/errors${NC}"
    fi
    
    # Test if available
    if yarn test --listTests --json | jq -r '.[] | length' | grep -q '^0$'; then
        echo -e "${YELLOW}⚠️  No tests found${NC}"
    else
        if yarn test --watchAll=false --passWithNoTests > /dev/null 2>&1; then
            echo -e "${GREEN}✅ Tests passed${NC}"
        else
            echo -e "${YELLOW}⚠️  Some tests failed${NC}"
        fi
    fi
}

# Function to create directory structure
create_directories() {
    echo -e "\n${BLUE}📁 Creating build directories...${NC}"
    
    # iOS build directories
    mkdir -p ios/builds/{debug,release,production}
    
    # Android build directories
    mkdir -p android/builds/{debug,release,production}
    
    # Scripts directory
    mkdir -p scripts
    
    echo -e "${GREEN}✅ Directory structure created${NC}"
}

# Function to display setup summary
display_summary() {
    echo -e "\n${BLUE}📋 Setup Summary${NC}"
    echo "=================="
    
    echo -e "${GREEN}✅ Dependencies installed${NC}"
    echo -e "${GREEN}✅ iOS configured${NC}"
    echo -e "${GREEN}✅ Android configured${NC}"
    echo -e "${GREEN}✅ Fastlane setup${NC}"
    echo -e "${GREEN}✅ Environment files created${NC}"
    echo -e "${GREEN}✅ Directory structure created${NC}"
    
    echo -e "\n${YELLOW}📋 Next Steps:${NC}"
    echo "1. Configure your .env file with actual values"
    echo "2. Setup iOS certificates: bundle exec fastlane match"
    echo "3. Generate Android keystore: ./scripts/setup-android-signing.sh"
    echo "4. Configure GitHub Secrets for CI/CD"
    echo "5. Test local builds: bundle exec fastlane debug_all"
    
    echo -e "\n${YELLOW}📚 Documentation:${NC}"
    echo "• CI/CD Setup: ./CI_CD_SETUP.md"
    echo "• Deployment Guide: ./DEPLOYMENT_GUIDE.md"
    echo "• Testing Flows: ./TESTING_FLOWS.md"
    
    echo -e "\n${BLUE}🚀 CI/CD Pipeline Commands:${NC}"
    echo "• Debug builds:      bundle exec fastlane debug_all"
    echo "• Release builds:    bundle exec fastlane release_all"
    echo "• Production builds: bundle exec fastlane production_all"
    echo "• Clean workspace:   bundle exec fastlane clean_workspace"
    
    echo -e "\n${GREEN}🎉 CI/CD Setup Complete!${NC}"
}

# Main execution
main() {
    echo -e "${BLUE}Starting CI/CD setup...${NC}\n"
    
    # Check if we're in the right directory
    if [ ! -f "package.json" ]; then
        echo -e "${RED}❌ package.json not found. Please run this script from the project root.${NC}"
        exit 1
    fi
    
    # Execute setup steps
    install_dependencies
    setup_ios
    setup_android
    setup_fastlane
    setup_environment
    create_directories
    run_initial_tests
    display_summary
}

# Handle script interruption
trap 'echo -e "\n${RED}❌ Setup interrupted${NC}"; exit 1' INT TERM

# Run main function
main "$@"