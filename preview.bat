@echo off
setlocal
title Father Kaz Website - Production Preview
cd /d "%~dp0"

echo ==========================================================
echo   Father Kaz Ligeza - production preview
echo ==========================================================
echo.

where node >nul 2>nul
if errorlevel 1 goto :no_node

if not exist "node_modules" goto :install
goto :build

:install
echo First run - installing dependencies. This may take a minute...
echo.
call npm install
if errorlevel 1 goto :install_failed

:build
echo Building the production site...
echo.
call npm run build
if errorlevel 1 goto :build_failed

echo.
echo Starting the preview server...
echo It will open in your browser at http://localhost:4173
echo Close this window or press Ctrl+C to stop the server.
echo.
call npm run preview -- --open
echo.
echo Preview stopped.
pause
exit /b 0

:no_node
echo [ERROR] Node.js was not found on your PATH.
echo Install Node.js 18 or newer from https://nodejs.org/ and run this file again.
echo.
pause
exit /b 1

:install_failed
echo.
echo [ERROR] npm install failed. Review the messages above.
pause
exit /b 1

:build_failed
echo.
echo [ERROR] The build failed. Review the messages above.
pause
exit /b 1
