#!/bin/bash

# Foldfresh Deployment Helper Script
# This script helps prepare your project for deployment

echo "🚀 Foldfresh Deployment Helper"
echo "================================"

# Check if we're in the right directory
if [ ! -d "Backend" ] || [ ! -d "Frontend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    echo "   Make sure you have 'Backend' and 'Frontend' folders"
    exit 1
fi

echo "✅ Project structure looks good!"

# Check Backend requirements
echo ""
echo "📋 Checking Backend requirements..."
if [ -f "Backend/requirements.txt" ]; then
    echo "✅ requirements.txt found"
else
    echo "❌ requirements.txt not found in Backend folder"
fi

if [ -f "Backend/render.yaml" ]; then
    echo "✅ render.yaml found"
else
    echo "❌ render.yaml not found in Backend folder"
fi

# Check Frontend requirements
echo ""
echo "📋 Checking Frontend requirements..."
if [ -f "Frontend/package.json" ]; then
    echo "✅ package.json found"
else
    echo "❌ package.json not found in Frontend folder"
fi

if [ -f "Frontend/vercel.json" ]; then
    echo "✅ vercel.json found"
else
    echo "❌ vercel.json not found in Frontend folder"
fi

echo ""
echo "🎯 Next Steps:"
echo "1. Deploy Backend to Render:"
echo "   - Go to https://render.com"
echo "   - Create new Web Service"
echo "   - Connect your GitHub repo"
echo "   - Set root directory to 'Backend'"
echo "   - Use the render.yaml configuration"
echo ""
echo "2. Deploy Frontend to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Create new Project"
echo "   - Connect your GitHub repo"
echo "   - Set root directory to 'Frontend'"
echo "   - Configure environment variables"
echo ""
echo "3. Update CORS settings after deployment"
echo "   - Add your Vercel frontend URL to backend CORS settings"
echo "   - Update frontend API URL to your Render backend URL"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md"
echo ""
echo "🎉 Happy Deploying!"
