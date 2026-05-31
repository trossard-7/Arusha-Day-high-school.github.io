# 🚀 KAidO High School - Quick Start Guide

## Files Included

### Frontend Files (HTML/CSS/JS)
- `index.html` - Landing page
- `about.html` - About the school
- `programs.html` - Academic programs
- `contact.html` - Contact form & info
- `apply.html` - Student application form
- `admin-dashboard.html` - Admin portal
- `styles.css` - Shared styling
- `script.js` - Shared JavaScript

### Backend Files (Node.js/Express)
- `server.js` - Express server with API endpoints
- `package.json` - Project dependencies
- `.env` - Environment configuration

### Documentation
- `README.md` - Full documentation
- This file

---

## ⚡ Quick Start (Frontend Only - No Database)

### Step 1: Open in Browser
Simply open any `.html` file in your web browser:
```
Right-click → Open with → Browser
OR
Drag & drop into browser
```

### What Works:
✅ All pages load and navigate correctly
✅ Beautiful designs with animations
✅ Contact form displays
✅ Application form displays
✅ All interactive features work locally

### What Doesn't Work:
❌ Submitting forms won't save data
❌ No email notifications
❌ No database storage
❌ Admin dashboard won't function

**Perfect for:** Demos, presentations, initial testing

---

## 🔧 Full Stack Setup (With Database)

### Prerequisites
You need to install:

1. **Node.js** (v14+)
   - Download: https://nodejs.org/
   - Includes npm (Node Package Manager)

2. **MongoDB** (Choose one):
   - **Option A:** Local installation
     - Download: https://www.mongodb.com/try/download/community
   - **Option B:** Cloud (recommended)
     - Sign up: https://www.mongodb.com/cloud/atlas
     - Free tier available

---

## 📦 Installation Steps

### Step 1: Install Node.js
```bash
# Download from https://nodejs.org/
# Follow installation instructions
# Verify installation:
node --version
npm --version
```

### Step 2: Install Dependencies
```bash
# Navigate to project folder
cd kaido-school

# Install packages
npm install
```

### Step 3: Configure Environment Variables
```bash
# Open .env file and update:
MONGODB_URI=mongodb://localhost:27017/kaido_school
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admissions@kaido.edu
PORT=5000
```

**Note:** For Gmail, you need an [App Password](https://myaccount.google.com/apppasswords)

### Step 4: Set Up Database

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Start MongoDB (keep this running):
mongod

# In another terminal, verify:
mongo
# Type: exit to close
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account: https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update MONGODB_URI in .env

### Step 5: Start Backend Server
```bash
# In project folder:
npm start

# You should see:
# "KAidO High School API Server running on port 5000"
```

### Step 6: Access Website
Open in browser:
```
http://localhost:5000/index.html
```

---

## 🧪 Test Everything Works

### Test 1: Application Form
1. Go to http://localhost:5000/apply.html
2. Fill the form completely
3. Click "Submit Application"
4. **Expected:** Success message + email sent + data in database

### Test 2: Contact Form
1. Go to http://localhost:5000/contact.html
2. Fill and submit
3. **Expected:** Success message + email sent

### Test 3: Admin Dashboard
1. Go to http://localhost:5000/admin-dashboard.html
2. Check statistics
3. View applications
4. **Expected:** All data displays correctly

---

## 📊 Database Explained

### What Gets Stored?

**Applications Table:**
- Student names, emails, phone
- School info & GPA
- Program interests
- Parent information
- Motivation & achievements
- Application status

**Contacts Table:**
- Message sender info
- Subject & message content
- Timestamp

### Access Database

**Local MongoDB:**
```bash
mongo kaido_school
db.applications.find()  # View all applications
db.contacts.find()      # View all messages
```

**MongoDB Atlas:**
- Use web dashboard
- Or use MongoDB Compass

---

## 🎨 Customization

### Change School Colors
Edit `styles.css`:
```css
:root {
    --primary: #0f172a;      /* Dark blue */
    --secondary: #0ea5e9;    /* Light blue */
    --accent: #f59e0b;       /* Amber */
}
```

### Change School Name
Search and replace "KAidO" in all files

### Update Contact Information
Edit `contact.html`:
```html
<p>Phone: +1 (555) 123-4567</p>
<p>Email: hello@kaido.edu</p>
<p>Address: 123 Education Lane</p>
```

### Add New Programs
Edit `programs.html` and add to array in `apply.html` form

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module"
**Solution:**
```bash
npm install
```

### Issue: MongoDB Connection Error
**Solution:**
- Check MongoDB is running: `mongod`
- Verify connection string in `.env`
- Ensure port 27017 is available

### Issue: Email Not Sending
**Solution:**
- Use Gmail app password (not regular password)
- Enable 2FA on Gmail
- Check .env has correct email

### Issue: Port 5000 Already in Use
**Solution:**
```bash
# Change PORT in .env to 5001 or another number
# Or kill the process:
lsof -ti:5000 | xargs kill -9
```

### Issue: Form Not Submitting
**Solution:**
- Check console: F12 → Console tab
- Ensure backend is running
- Check backend URL in forms (should be http://localhost:5000)

---

## 📋 Project Checklist

### Basic Setup
- [ ] Extract all files to a folder
- [ ] Have Node.js installed
- [ ] Have MongoDB ready

### Configuration
- [ ] Updated .env with your MongoDB URI
- [ ] Updated .env with your email settings
- [ ] Updated contact info in HTML files

### Testing
- [ ] Frontend pages load (index.html)
- [ ] Backend server starts (npm start)
- [ ] Application form submits
- [ ] Email notifications work
- [ ] Data appears in database

### Customization
- [ ] Changed school name
- [ ] Updated colors to match brand
- [ ] Updated all contact information
- [ ] Added school logo/images

---

## 🚀 Next Steps

After everything works locally:

1. **Deploy Frontend** to Vercel, Netlify
2. **Deploy Backend** to Heroku, Railway
3. **Use MongoDB Atlas** for database (if not already)
4. **Set up custom domain**
5. **Enable HTTPS**
6. **Add more features**

---

## 📞 Support

For issues:
1. Check error messages in terminal
2. Check browser console (F12)
3. Review README.md for details
4. Check MongoDB is running
5. Verify .env configuration

---

## 📝 Quick Command Reference

```bash
# Install dependencies
npm install

# Start server
npm start

# Start with auto-reload (requires nodemon)
npm run dev

# Check Node version
node --version

# Check npm version
npm --version

# List running processes
ps aux | grep node

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

---

## ✅ You're All Set!

Your KAidO High School website is ready to:
- ✨ Impress visitors
- 📝 Collect applications
- 📧 Send notifications
- 📊 Manage data
- 🎯 Track admissions

**Enjoy!** 🎓