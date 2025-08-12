#!/bin/bash

# Development Setup Script for ReservApp Mobile
# Sets up the development environment with all dependencies

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  ReservApp Mobile - Setup Script     ${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check Node.js version
echo -e "${YELLOW}Checking Node.js version...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    echo "Please install Node.js 18 or higher from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}Error: Node.js version $NODE_VERSION is too old${NC}"
    echo "Please install Node.js 18 or higher"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node -v) is installed${NC}"

# Check Yarn
echo -e "${YELLOW}Checking Yarn...${NC}"
if ! command -v yarn &> /dev/null; then
    echo -e "${YELLOW}Installing Yarn...${NC}"
    npm install -g yarn
fi
echo -e "${GREEN}✓ Yarn $(yarn -v) is installed${NC}"

# Install dependencies
echo -e "${YELLOW}Installing project dependencies...${NC}"
yarn install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installed successfully${NC}"
else
    echo -e "${RED}✗ Failed to install dependencies${NC}"
    exit 1
fi

# Check React Native CLI
echo -e "${YELLOW}Checking React Native CLI...${NC}"
if ! command -v npx react-native &> /dev/null; then
    echo -e "${YELLOW}Installing React Native CLI...${NC}"
    yarn global add @react-native-community/cli
fi
echo -e "${GREEN}✓ React Native CLI is available${NC}"

# iOS Setup (macOS only)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo -e "${YELLOW}Setting up iOS development environment...${NC}"

    # Check Xcode
    if ! command -v xcodebuild &> /dev/null; then
        echo -e "${YELLOW}Warning: Xcode is not installed${NC}"
        echo "Please install Xcode from the App Store for iOS development"
    else
        echo -e "${GREEN}✓ Xcode is installed${NC}"
    fi

    # Check CocoaPods
    if ! command -v pod &> /dev/null; then
        echo -e "${YELLOW}Installing CocoaPods...${NC}"
        sudo gem install cocoapods
    fi
    echo -e "${GREEN}✓ CocoaPods is installed${NC}"

    # Install iOS dependencies
    echo -e "${YELLOW}Installing iOS dependencies...${NC}"
    cd ios
    pod install
    cd ..
    echo -e "${GREEN}✓ iOS dependencies installed${NC}"
fi

# Android Setup
echo -e "${YELLOW}Checking Android development environment...${NC}"

if [ -z "$ANDROID_HOME" ]; then
    echo -e "${YELLOW}Warning: ANDROID_HOME is not set${NC}"
    echo "Please install Android Studio and set ANDROID_HOME environment variable"
    echo "Add these lines to your shell profile (~/.bashrc, ~/.zshrc, etc.):"
    echo "export ANDROID_HOME=\$HOME/Library/Android/sdk  # macOS"
    echo "export ANDROID_HOME=\$HOME/Android/Sdk          # Linux"
    echo "export PATH=\$PATH:\$ANDROID_HOME/emulator"
    echo "export PATH=\$PATH:\$ANDROID_HOME/platform-tools"
else
    echo -e "${GREEN}✓ Android SDK is configured${NC}"
fi

# Check Java
if ! command -v java &> /dev/null; then
    echo -e "${YELLOW}Warning: Java is not installed${NC}"
    echo "Please install Java JDK 11 or higher for Android development"
else
    JAVA_VERSION=$(java -version 2>&1 | head -n1 | cut -d'"' -f2 | cut -d'.' -f1)
    if [ "$JAVA_VERSION" -lt 11 ]; then
        echo -e "${YELLOW}Warning: Java version is too old${NC}"
        echo "Please install Java JDK 11 or higher"
    else
        echo -e "${GREEN}✓ Java is installed and compatible${NC}"
    fi
fi

# Setup Git hooks
echo -e "${YELLOW}Setting up Git hooks...${NC}"
if [ -d ".git" ]; then
    # Pre-commit hook
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "Running pre-commit checks..."

# Run linter
yarn lint
if [ $? -ne 0 ]; then
    echo "ESLint failed. Please fix the errors before committing."
    exit 1
fi

# Run type check
yarn type-check
if [ $? -ne 0 ]; then
    echo "TypeScript errors found. Please fix them before committing."
    exit 1
fi

echo "Pre-commit checks passed!"
EOF
    chmod +x .git/hooks/pre-commit
    echo -e "${GREEN}✓ Git hooks installed${NC}"
else
    echo -e "${YELLOW}Warning: Not a Git repository. Skipping Git hooks.${NC}"
fi

# Create environment file
echo -e "${YELLOW}Creating environment configuration...${NC}"
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${GREEN}✓ Environment file created${NC}"
    echo -e "${YELLOW}Please update .env with your configuration${NC}"
else
    echo -e "${GREEN}✓ Environment file already exists${NC}"
fi

# Final setup summary
echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}  Setup completed successfully!        ${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo "Next steps:"
echo "1. Update .env file with your configuration"
echo "2. Start Metro bundler: yarn start"
echo "3. Run iOS app: yarn ios"
echo "4. Run Android app: yarn android"
echo ""
echo "Available scripts:"
echo "  yarn start      - Start Metro bundler"
echo "  yarn ios        - Run iOS app"
echo "  yarn android    - Run Android app"
echo "  yarn lint       - Run ESLint"
echo "  yarn type-check - Run TypeScript check"
echo "  yarn test       - Run tests"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
