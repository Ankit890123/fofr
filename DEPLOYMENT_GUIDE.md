# Foldfresh Deployment Guide

This guide will help you deploy your Foldfresh project to Vercel (Frontend) and Render (Backend) for easy hosting.

## 🚀 Quick Deployment Steps

### 1. Backend Deployment (Render)

#### Step 1: Prepare Backend
1. Make sure your backend is in the `Backend/` folder
2. Ensure `requirements.txt` has all dependencies
3. The `render.yaml` file is already configured

#### Step 2: Deploy to Render
1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the `Backend` folder as the root directory
5. Render will automatically detect the `render.yaml` configuration
6. Set environment variables in Render dashboard:
   - Copy values from `Backend/env.production`
   - Update URLs with your actual domain names
   - Generate secure secret keys

#### Step 3: Get Backend URL
- After deployment, you'll get a URL like: `https://your-app-name.onrender.com`
- Note this URL for frontend configuration

### 2. Frontend Deployment (Vercel)

#### Step 1: Prepare Frontend
1. Make sure your frontend is in the `Frontend/` folder
2. The `vercel.json` file is already configured

#### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Set the root directory to `Frontend`
5. Vercel will automatically detect the configuration

#### Step 3: Configure Environment Variables
In Vercel dashboard, add these environment variables:
```
VITE_API_BASE_URL=https://your-backend-url.onrender.com
VITE_WHATSAPP_NUMBER=919999999999
VITE_PHONE_DISPLAY=+91 98765 43210
VITE_INSTAGRAM_HANDLE=foldfresh.in
VITE_SITE_NAME=Foldfresh
VITE_SITE_URL=https://your-frontend-url.vercel.app
```

#### Step 4: Get Frontend URL
- After deployment, you'll get a URL like: `https://your-project-name.vercel.app`
- Note this URL for backend CORS configuration

### 3. Update CORS Settings

After both deployments, update the CORS settings:

1. **In Render (Backend):**
   - Go to your service dashboard
   - Update environment variables:
     - `CORS_ALLOWED_ORIGINS`: Add your Vercel frontend URL
     - `CSRF_TRUSTED_ORIGINS`: Add your Vercel frontend URL
     - `DJANGO_ALLOWED_HOSTS`: Add your Render backend URL

2. **In Vercel (Frontend):**
   - Update `VITE_API_BASE_URL` with your Render backend URL

## 🔧 Configuration Files Created

### Backend (Render)
- `Backend/render.yaml` - Render deployment configuration
- `Backend/env.production` - Production environment variables template

### Frontend (Vercel)
- `Frontend/vercel.json` - Vercel deployment configuration
- `Frontend/env.example` - Frontend environment variables template

## 📝 Important Notes

### Security
- Change all default secret keys in production
- Use strong, unique passwords
- Enable HTTPS (both platforms do this automatically)

### Database
- Render provides PostgreSQL automatically
- Your SQLite database will be migrated to PostgreSQL
- No additional database setup required

### Custom Domain
- Both Vercel and Render support custom domains
- Update CORS and allowed hosts when using custom domains

## 🚨 Troubleshooting

### Common Issues
1. **CORS Errors**: Make sure frontend URL is in backend CORS settings
2. **Database Errors**: Check if migrations ran successfully
3. **Static Files**: Render handles this automatically with WhiteNoise

### Debugging
- Check Render logs in the dashboard
- Check Vercel function logs
- Use browser developer tools for frontend issues

## 📞 Support

If you encounter issues:
1. Check the logs in both platforms
2. Verify environment variables are set correctly
3. Ensure all URLs are updated with actual deployment URLs

## 🎉 Success!

Once deployed, your Foldfresh application will be live and accessible to users worldwide!

### URLs to Update After Deployment:
- Backend: `https://your-backend-name.onrender.com`
- Frontend: `https://your-frontend-name.vercel.app`

Remember to update the CORS settings in your backend with the actual frontend URL!
