# KAidO High School - Complete Website System

A modern, fully-functional school website with dynamic pages, student application system, and backend database management.

## 📁 Project Structure

```
kaido-school/
├── Frontend (HTML/CSS/JS)
│   ├── index.html          # Landing page
│   ├── about.html          # About page
│   ├── programs.html       # Programs page
│   ├── contact.html        # Contact page
│   ├── apply.html          # Application form
│   ├── styles.css          # Shared styles
│   └── script.js           # Shared JavaScript
│
├── Backend (Node.js)
│   ├── server.js           # Express server
│   ├── package.json        # Dependencies
│   └── .env                # Environment variables
│
└── Documentation
    └── README.md           # This file
```

## 🚀 Quick Start

### Frontend Only (No Database)
1. Open any HTML file directly in a browser
2. All pages work independently with local data
3. Forms will show alerts but won't save data

### Full Stack Setup (With Database)

#### 1. Prerequisites
- Node.js (v14+) [Download](https://nodejs.org)
- MongoDB (Local or Cloud) [Download](https://www.mongodb.com/try/download/community)
- Git (Optional)

#### 2. Backend Setup

```bash
# Navigate to project directory
cd kaido-school

# Install dependencies
npm install

# Create .env file with your credentials
# Edit .env with:
# - MongoDB connection string
# - Email credentials for notifications
# - Admin panel URL

# Start the server
npm start
# or for development with auto-reload:
npm run dev
```

Server will run at: `http://localhost:5000`

#### 3. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Start MongoDB service
mongod

# Verify connection
mongo mongodb://localhost:27017
```

**Option B: MongoDB Atlas (Cloud)**
1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kaido_school
```

#### 4. Email Setup (Gmail)

1. Enable 2-Factor Authentication on your Gmail
2. Generate App Password:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Find "App passwords"
   - Select Mail and Windows Computer
   - Copy the generated password
3. Update `.env`:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ADMIN_EMAIL=admin@school.edu
   ```

## 📚 Features

### Frontend Features
- ✨ Modern, responsive design
- 🎨 Beautiful animations and transitions
- 📱 Mobile-friendly layout
- 🔗 Internal page navigation
- 📝 Dynamic forms
- 💬 Contact and application forms

### Backend Features
- 🗄️ MongoDB database for data persistence
- 📧 Automated email notifications
- 🔐 Secure data handling
- 📊 Admin dashboard statistics
- 👥 Application management
- 💾 Contact form management

### Pages Included

1. **Landing Page (index.html)**
   - Hero section with CTA
   - Program overview
   - Student testimonials
   - School statistics

2. **About Page (about.html)**
   - Mission and vision
   - Core values
   - School history
   - Leadership team
   - Achievements
   - Facilities

3. **Programs Page (programs.html)**
   - 6 main academic programs
   - Extracurricular activities
   - STEM focus
   - Sports and wellness
   - Global citizenship

4. **Contact Page (contact.html)**
   - Contact information
   - Contact form
   - FAQ section
   - Campus map

5. **Application Page (apply.html)**
   - Comprehensive application form
   - Personal information
   - Academic details
   - Program interests
   - Parent information
   - Document storage ready

## 🔗 API Endpoints

### Applications
```
POST   /api/applications              # Submit application
GET    /api/applications              # Get all applications (admin)
GET    /api/applications/:id          # Get single application
PUT    /api/applications/:id          # Update application status
```

### Contact
```
POST   /api/contact                   # Submit contact form
GET    /api/contact                   # Get all messages (admin)
```

### Admin Dashboard
```
GET    /api/admin/dashboard           # Dashboard statistics
GET    /api/admin/applications/status/:status  # Filter by status
GET    /api/statistics/applications   # Detailed analytics
```

## 📊 Database Schemas

### Application Schema
```javascript
{
  firstName: String,
  lastName: String,
  dob: Date,
  gender: String,
  email: String (unique),
  phone: String,
  currentSchool: String,
  currentGrade: String,
  gpa: Number,
  programs: [String],
  strengths: String,
  achievements: String,
  activities: String,
  parentName: String,
  parentEmail: String,
  parentPhone: String,
  parentOccupation: String,
  motivation: String,
  reference: String,
  boarding: String,
  status: String,
  submittedAt: Date,
  updatedAt: Date
}
```

### Contact Schema
```javascript
{
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  submittedAt: Date,
  responded: Boolean
}
```

## 🎯 Testing

### Test Application Submission
1. Go to `http://localhost:5000/apply.html`
2. Fill in the form
3. Click Submit
4. Check:
   - Success message on page
   - Email confirmation
   - Data in MongoDB

### Test Contact Form
1. Go to `http://localhost:5000/contact.html`
2. Fill contact form
3. Submit and verify email

## 🔐 Security Notes

- Never commit `.env` file to Git
- Update default email credentials
- Use strong MongoDB passwords
- Enable MongoDB IP whitelist
- Validate all inputs server-side
- Consider adding rate limiting

## 🛠️ Customization

### Change School Name
Find and replace "KAidO" with your school name in:
- All HTML files
- Email templates in server.js
- Environment variables

### Customize Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary: #0f172a;
    --secondary: #0ea5e9;
    --accent: #f59e0b;
}
```

### Update Content
Edit text content directly in HTML files for:
- School information
- Programs description
- Contact details
- Social media links

### Modify Forms
Add/remove form fields in:
- `apply.html` - Application form
- `contact.html` - Contact form
- Update corresponding MongoDB schema in `server.js`

## 📧 Email Templates

Emails are automatically sent for:
1. **Application Confirmation** - Student receives confirmation with app ID
2. **Admin Notification** - Admin receives new application alert
3. **Contact Confirmation** - Visitor receives message confirmation

To customize email templates, edit the HTML in `server.js` mail options.

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- For MongoDB Atlas, check IP whitelist

### Email Not Sending
```
Error: Invalid login credentials
```
- Verify Gmail app password (not regular password)
- Check 2FA is enabled
- Verify email in .env matches Gmail account

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
- Change PORT in `.env` to 5001, 5002, etc.
- Or kill process: `lsof -ti:5000 | xargs kill -9`

### Forms Not Submitting
- Check browser console for errors
- Ensure backend server is running
- Verify CORS settings in .env
- Check network tab in DevTools

## 🚀 Deployment

### Deploy Frontend (Vercel, Netlify)
1. Push HTML/CSS/JS to GitHub
2. Connect to Vercel/Netlify
3. Auto-deploy on every push

### Deploy Backend (Heroku, Railway)
1. Connect repository to hosting platform
2. Set environment variables
3. Deploy with one click

### Deploy Database (MongoDB Atlas)
- Use MongoDB Atlas (recommended)
- Automatic backups
- Scalable pricing
- Global distribution

## 📝 License

This project is provided as-is for educational purposes.

## 🤝 Support

For issues or questions:
1. Check troubleshooting section
2. Review API documentation
3. Check browser console for errors
4. Verify all environment variables

## ✨ Features Coming Soon

- Admin portal with login
- Student portal
- Online payment system
- Application status tracking
- Email verification
- File upload for documents
- Student dashboard
- Parent access

---

**Version:** 1.0.0
**Last Updated:** 2026
**Made for:** KAidO High School