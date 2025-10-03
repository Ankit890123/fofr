# WhatsApp Company Name Setup

## 🎯 Goal
When customers click the WhatsApp button, they should see "Foldfresh" as the company name in their WhatsApp chat.

## ✅ What's Already Configured

### 1. Frontend (WhatsApp Button)
- **File**: `Frontend/client/components/WhatsAppFAB.tsx`
- **Message**: "Hi Foldfresh, I want to place a laundry order."
- **Result**: When customers click WhatsApp, they'll see "Foldfresh" in the message

### 2. Backend (API Configuration)
- **File**: `Backend/api/views.py` - `site_info` endpoint
- **Company Name**: Dynamically loaded from `COMPANY_NAME` setting
- **Default**: "Foldfresh" if not set

### 3. Environment Variables
- **Backend**: `COMPANY_NAME=Foldfresh` in `env.production`
- **Frontend**: `VITE_COMPANY_NAME=Foldfresh` in `env.example`
- **Render**: Company name configured in `render.yaml`

## 🔧 How It Works

1. **Customer clicks WhatsApp button**
2. **WhatsApp opens with message**: "Hi Foldfresh, I want to place a laundry order."
3. **Customer sees**: The message clearly shows they're contacting "Foldfresh"
4. **Your WhatsApp**: You'll receive the message with "Foldfresh" mentioned

## 📱 WhatsApp Business Setup (Optional)

For even better branding, you can:

1. **Set up WhatsApp Business Profile**:
   - Add "Foldfresh" as your business name
   - Add business description
   - Add business hours
   - Add business address

2. **WhatsApp Business API** (Advanced):
   - Get verified business account
   - Custom message templates
   - Automated responses

## 🚀 Deployment Notes

After deploying to Render and Vercel:

1. **Update environment variables** with your actual company name
2. **Test the WhatsApp button** to ensure it shows "Foldfresh"
3. **Configure WhatsApp Business** for professional appearance

## 🎉 Result

When customers click your WhatsApp button, they'll see:
```
Hi Foldfresh, I want to place a laundry order.
```

This makes it clear they're contacting your company "Foldfresh"!
