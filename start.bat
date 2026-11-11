@echo off
echo ========================================================
echo   REALTOR - Real Estate Marketplace Web Application
echo   Tagline: "Find Your Place. Build Your Future."
echo ========================================================

:: Check Node.js availability
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not found in PATH!
    echo Please make sure Node.js is installed.
    pause
    exit /b 1
)

:: Check if backend dependencies are installed
if not exist "backend\node_modules" (
    echo [Setup] Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

:: Check if frontend dependencies are installed
if not exist "frontend\node_modules" (
    echo [Setup] Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

echo.
echo ========================================================
echo   Starting REALTOR Backend and Frontend Services...
echo ========================================================
echo [Backend]  API and Socket.IO: http://localhost:5000
echo [Frontend] Web Client:        http://localhost:5173
echo ========================================================
echo.

:: Launch backend in a separate terminal window
start "REALTOR Backend API (Port 5000)" cmd /k "cd /d "%~dp0backend" && npm start"

:: Wait 3 seconds for backend to initialize
powershell -NoProfile -Command "Start-Sleep -Seconds 3"

:: Launch frontend in a separate terminal window
start "REALTOR Frontend Web Client (Port 5173)" cmd /k "cd /d "%~dp0frontend" && npm run dev"

:: Wait 2 seconds and launch default browser
powershell -NoProfile -Command "Start-Sleep -Seconds 2"
echo Opening REALTOR in your browser...
start http://localhost:5173

echo.
echo ========================================================
echo   REALTOR is now running!
echo   Demo Logins:
echo     Buyer : buyer@realtor.com / password123
echo     Owner : owner@realtor.com / password123
echo ========================================================

