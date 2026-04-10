@echo off
REM KEJA Real Estate Platform - Quick Start Script for Windows
REM This script helps you get started with KEJA development

echo.
echo ================================
echo   KEJA - Real Estate Platform
echo   Quick Start Setup
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 18+ first from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo npm version:
npm --version
echo.

REM Install dependencies
echo Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo Dependencies installed successfully
echo.

REM Create .env.local if it doesn't exist
if not exist ".env.local" (
    echo Creating .env.local file...
    copy .env.example .env.local
    echo .env.local created. Please update it with your configuration.
) else (
    echo .env.local already exists
)

echo.
echo ================================
echo   Setup Complete!
echo ================================
echo.
echo Next steps:
echo.
echo 1. Start development server:
echo    npm run dev
echo.
echo 2. Open your browser:
echo    http://localhost:3000
echo.
echo 3. Read the documentation:
echo    - README.md - Project overview
echo    - DEVELOPMENT.md - Development guide
echo    - PROJECT_SUMMARY.md - Feature summary
echo.
echo ================================
echo.
pause
