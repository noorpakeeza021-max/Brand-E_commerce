@echo off
chcp 65001 >nul
title Brand E-Commerce - Setup Wizard

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║        Brand E-Commerce Website Setup                ║
echo ║        Website Run Karne Ka Complete Guide           ║
echo ╚══════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: Node.js install nahi hai!
    echo.
    echo Step 1: Node.js download karna:
    echo   https://nodejs.org (LTS version)
    echo.
    echo Step 2: Node.js install karna
    echo Step 3: Command Prompt restart karna
    echo Step 4: Dobara ye file run karna
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js installed: 
node --version
echo.

cd /d "%~dp0"

echo ==========================================
echo Step 1: Installing Dependencies
echo ==========================================
echo.

if not exist "node_modules" (
    echo Packages install ho rahi hain...
    echo (First time 1-2 minutes lag sakte hain)
    echo.
    call npm install
    echo.
    echo ✅ Dependencies installed!
) else (
    echo ✅ Dependencies pehle se install hain!
)

echo.
echo ==========================================
echo Step 2: Starting Development Server
echo ==========================================
echo.
echo 🌐 Website chalne ke baad ye link open karo:
echo    http://localhost:5173
echo.
echo 🔐 Demo Accounts:
echo    User: user@brand.com / 123456
echo    Admin: admin@brand.com / admin123
echo.
echo Press Ctrl+C to stop server
echo.
call npm run dev

echo.
echo Server band ho gaya.
pause