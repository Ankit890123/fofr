@echo off
echo 🚀 Foldfresh Deployment Helper
echo ================================

REM Check if we're in the right directory
if not exist "Backend" (
    echo ❌ Error: Backend folder not found
    echo    Please run this script from the project root directory
    pause
    exit /b 1
)

if not exist "Frontend" (
    echo ❌ Error: Frontend folder not found
    echo    Please run this script from the project root directory
    pause
    exit /b 1
)

echo ✅ Project structure looks good!

REM Check Backend requirements
echo.
echo 📋 Checking Backend requirements...
if exist "Backend\requirements.txt" (
    echo ✅ requirements.txt found
) else (
    echo ❌ requirements.txt not found in Backend folder
)

if exist "Backend\render.yaml" (
    echo ✅ render.yaml found
) else (
    echo ❌ render.yaml not found in Backend folder
)

REM Check Frontend requirements
echo.
echo 📋 Checking Frontend requirements...
if exist "Frontend\package.json" (
    echo ✅ package.json found
) else (
    echo ❌ package.json not found in Frontend folder
)

if exist "Frontend\vercel.json" (
    echo ✅ vercel.json found
) else (
    echo ❌ vercel.json not found in Frontend folder
)

echo.
echo 🎯 Next Steps:
echo 1. Deploy Backend to Render:
echo    - Go to https://render.com
echo    - Create new Web Service
echo    - Connect your GitHub repo
echo    - Set root directory to 'Backend'
echo    - Use the render.yaml configuration
echo.
echo 2. Deploy Frontend to Vercel:
echo    - Go to https://vercel.com
echo    - Create new Project
echo    - Connect your GitHub repo
echo    - Set root directory to 'Frontend'
echo    - Configure environment variables
echo.
echo 3. Update CORS settings after deployment
echo    - Add your Vercel frontend URL to backend CORS settings
echo    - Update frontend API URL to your Render backend URL
echo.
echo 📖 For detailed instructions, see DEPLOYMENT_GUIDE.md
echo.
echo 🎉 Happy Deploying!
pause
