@echo off
echo ==========================================
echo   Brand E-Commerce - Run Website
echo ==========================================
echo.

cd /d "%~dp0"

echo Step 1: Installing dependencies...
echo (First time sirf chalega, baad mein skip ho jayega)
npm install

echo.
echo Step 2: Starting development server...
echo.
echo Website open hoga: http://localhost:5173
echo Press Ctrl+C to stop server
echo.

npm run dev

pause