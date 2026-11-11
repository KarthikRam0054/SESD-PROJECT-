@echo off
echo ===================================================
echo   REALTOR - Installing Dependencies
echo ===================================================

echo [1/3] Installing root dependencies...
call npm install

echo [2/3] Installing backend dependencies...
cd backend
call npm install

echo [3/3] Installing frontend dependencies...
cd ..\frontend
call npm install

cd ..
echo ===================================================
echo   All dependencies installed successfully!
echo ===================================================
pause

