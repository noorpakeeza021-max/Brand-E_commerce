# Brand E-Commerce Website 🚀

Ek complete, production-ready e-commerce marketplace jo React.js aur TailwindCSS se build kiya gaya hai.

---

## 📋 Step-by-Step Setup Guide

### Step 1: Node.js Install Karo
- Website: https://nodejs.org
- LTS version download karo aur install karo

### Step 2: Terminal/Open Karo
- Windows: `Win + R` type karo `cmd` press Enter
- Ya VS Code use karo: Open folder `brand-ecommerce` → Press `Ctrl + `` `

### Step 3: Project Folder Mein Jao
```bash
cd D:\xampp\htdocs\Trendhive\brand-ecommerce
```

### Step 4: Dependencies Install Karo
```bash
npm install
```
*(Yeh sab packages install karega - 1-2 minutes lag sakte hain)*

### Step 5: Server Start Karo
```bash
npm run dev
```

### Step 6: Website Open Karo
Browser mein ye link open karo:
```
http://localhost:5173/
```

**Website chalne ke liye ready hai! 🎉**

---

## 🔐 Demo Accounts

### User Login
- Email: `user@brand.com`
- Password: `123456`

### Admin Login (Product Management ke liye)
- Email: `admin@brand.com`
- Password: `admin123`
- URL: `http://localhost:5173/admin`

---

## 📁 Project Structure

```
brand-ecommerce/
├── src/
│   ├── components/     # UI components (Header, Footer, ProductCard, ProtectedRoute)
│   ├── context/        # React contexts (Auth, Cart, Order)
│   ├── pages/         # Website pages (Home, Products, Cart, Checkout, etc.)
│   ├── data/          # Products data
│   ├── App.jsx        # Main app
│   └── main.jsx       # Entry point
├── public/             # Static assets
├── index.html          # HTML entry
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies
```

---

## 🌐 Available Routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/products` | Products |
| `/product/:id` | Product Detail |
| `/cart` | Shopping Cart |
| `/checkout` | Checkout |
| `/order-success` | Order Success |
| `/login` | Login |
| `/register` | Register |
| `/profile` | User Profile |
| `/messages` | Messages (with AI Chat) |
| `/orders` | My Orders |
| `/gift` | Gift Items |
| `/projects` | Projects |
| `/menu` | Menu Items |
| `/contact` | Contact |
| `/contact-us` | Contact Us |
| `/help` | Help |
| `/admin` | Admin Panel |

---

---

## ⚡ Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server start karega |
| `npm run build` | Production build banayega |
| `npm run preview` | Production build test karega |

---

## 🌟 Features

- ✅ Homepage (Sidebar, Hero, Deals, Products)
- ✅ Product Listing (Filters, Sort, Grid/List view)
- ✅ Product Detail (Images, Bulk pricing, Reviews)
- ✅ Shopping Cart (Add/Remove items, Quantity)
- ✅ Checkout (Shipping info, Payment simulation)
- ✅ Login/Register (User authentication)
- ✅ Admin Panel (Products & Orders manage karo)
- ✅ Mobile Responsive (Mobile/Tablet/Desktop)
- ✅ Clean Design (#0A84FF blue, #00C853 green)
- ✅ User Profile (Personalized)
- ✅ AI Chat Assistant (Like ChatGPT)
- ✅ Order Tracking System
- ✅ Gift Items Page
- ✅ Projects Page
- ✅ Menu Items Page
- ✅ Contact & Help Pages

---

## ❓ Troubleshooting

### Port Error (Port 5173 busy hai):
```bash
npm run dev -- --port 3000
# Phir open karo: http://localhost:3000
```

### Node nahi milta:
- Node.js dobara install karo
- Computer restart karo

### Dependencies error:
```bash
rmdir /s node_modules
npm install
```

---

## 🚀 Deployment to Vercel

### Option 1: GitHub + Vercel (Recommended)

1. **Push code to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/trendhive.git
git push -u origin main
```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New" → "Project"
   - Select your GitHub repository
   - Configure settings:
     - Framework Preset: `Vite`
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Click "Deploy"

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or production deploy
vercel --prod
```

---

## 📞 Koi Problem Ho To

1. Terminal error check karo
2. `npm install` dobara run karo
3. Computer restart karo

---

**Made with ❤️ using React.js + TailwindCSS**
**© 2026 Brand E-Commerce**