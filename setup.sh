#!/bin/bash

# KEJA Real Estate Platform - Quick Start Script
# This script helps you get started with KEJA development

echo "================================"
echo "  KEJA - Real Estate Platform"
echo "  Quick Start Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cp .env.example .env.local
    echo "✅ .env.local created. Please update it with your configuration."
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "================================"
echo "  Setup Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Start development server:"
echo "   npm run dev"
echo ""
echo "2. Open your browser:"
echo "   http://localhost:3000"
echo ""
echo "3. Read the documentation:"
echo "   - README.md - Project overview"
echo "   - DEVELOPMENT.md - Development guide"
echo "   - PROJECT_SUMMARY.md - Feature summary"
echo ""
echo "================================"
