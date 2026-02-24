@echo off
chcp 65001 >nul
echo ========================================
echo XSS Lab - Installing dependencies
echo ========================================
echo.

cd /d "%~dp0"

echo Installing npm packages...
npm install

echo.
echo ========================================
echo Installation complete!
echo.
echo To run PROTECTED version:
echo    npm start
echo.
echo To run VULNERABLE version (for testing only):
echo    node app-vulnerable.js
echo.
echo Open in browser: http://localhost:3000
echo ========================================
pause
