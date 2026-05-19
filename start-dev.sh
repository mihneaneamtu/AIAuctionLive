#!/bin/bash

# AI Auction Live - Development Server Startup Script

echo "🚀 Starting AI Auction Live..."
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo -e "${BLUE}Node version:${NC} $(node --version)"
echo -e "${BLUE}npm version:${NC} $(npm --version)"
echo ""

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Create .env files if they don't exist
if [ ! -f "apps/frontend/.env.local" ]; then
    echo -e "${YELLOW}📝 Creating frontend .env.local...${NC}"
    cp apps/frontend/.env.example apps/frontend/.env.local
    echo -e "${GREEN}✅ Frontend .env.local created${NC}"
fi

if [ ! -f "apps/backend/.env.local" ]; then
    echo -e "${YELLOW}📝 Creating backend .env.local...${NC}"
    cp apps/backend/.env.example apps/backend/.env.local
    echo -e "${GREEN}✅ Backend .env.local created${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}✨ Ready to start development servers!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}📝 Next steps:${NC}"
echo ""
echo "1️⃣  ${YELLOW}Frontend${NC} (Open new terminal):"
echo "   cd apps/frontend"
echo "   npm run dev"
echo "   → http://localhost:3000"
echo ""
echo "2️⃣  ${YELLOW}Backend${NC} (Open new terminal):"
echo "   cd apps/backend"
echo "   npm run dev"
echo "   → http://localhost:3001"
echo ""
echo "3️⃣  ${YELLOW}Database${NC} (Make sure PostgreSQL is running):"
echo "   Or use Docker: docker-compose up -d postgres"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}🎉 Enjoy developing!${NC}"
