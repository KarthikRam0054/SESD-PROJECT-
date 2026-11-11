@echo off
echo ===================================================
echo   REALTOR - Seeding Database (18 Properties)
echo ===================================================
cd backend
call npm run seed
cd ..
echo ===================================================
pause

