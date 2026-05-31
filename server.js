// KAidO High School - Backend Server
// This is the backend API server for handling applications and contacts

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../')); // Serve static HTML files

// ===== MONGODB CONNECTION =====
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kaido_school', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// ===== DATABASE SCHEMAS =====

// Application Schema
const applicationSchema = new mongoose.Schema({
    // Personal Info
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },

    // School Info
    currentSchool: { type: String, required: true },
    currentGrade: { type: String, required: true },
    gpa: { type: Number, required: true },

    // Interests
    programs: [String],
    strengths: { type: String, required: true },
    achievements: String,
    activities: { type: String, required: true },

    // Parent Info
    parentName: { type: String, required: true },
    parentEmail: { type: String, required: true },
    parentPhone: { type: String, required: true },
    parentOccupation: String,

    // Additional
    motivation: { type: String, required: true },
    reference: String,
    boarding: { type: String, enum: ['day', 'boarding'], required: true },

    // Metadata
    status: { type: String, enum: ['submitted', 'reviewed', 'interview', 'accepted', 'rejected'], default: 'submitted' },
    submittedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    subject: { type: String, required: true },
    message: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
    responded: { type: Boolean, default: false }
});

// Admin User Schema
const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ['admin', 'admissions'], default: 'admin' },
    createdAt: { type: Date, default: Date.now }
});

// Create Models
const Application = mongoose.model('Application', applicationSchema);
const Contact = mongoose.model('Contact', contactSchema);
const Admin = mongoose.model('Admin', adminSchema);

// ===== EMAIL CONFIGURATION =====
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your-app-password'
    }
});

// ===== ROUTES =====

// Test Route
app.get('/', (req, res) => {
    res.json({ message: 'KAidO High School API is running' });
});

// ===== APPLICATION ROUTES =====

// Submit Application
app.post('/api/applications', async (req, res) => {
    try {
        const application = new Application(req.body);
        await application.save();

        // Send confirmation email to student
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: 'Application Received - KAidO High School',
            html: `
                <h2>Application Received!</h2>
                <p>Dear ${req.body.firstName} ${req.body.lastName},</p>
                <p>Thank you for applying to KAidO High School. We have received your application.</p>
                <p><strong>Application ID:</strong> ${application._id}</p>
                <p>Our admissions team will review your application and contact you soon with next steps.</p>
                <p><strong>Important Dates:</strong></p>
                <ul>
                    <li>Application Deadline: March 31, 2025</li>
                    <li>Entrance Exams: April 15-17, 2025</li>
                    <li>Interviews: May 1-10, 2025</li>
                    <li>Results: June 1, 2025</li>
                </ul>
                <p>If you have any questions, please contact our admissions office.</p>
                <p>Best regards,<br>KAidO High School Admissions Team</p>
            `
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log('Email error:', err);
            else console.log('Confirmation email sent');
        });

        // Send notification to admin
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL || 'admissions@kaido.edu',
            subject: `New Application Received - ${req.body.firstName} ${req.body.lastName}`,
            html: `
                <h2>New Application Received</h2>
                <p><strong>Student Name:</strong> ${req.body.firstName} ${req.body.lastName}</p>
                <p><strong>Email:</strong> ${req.body.email}</p>
                <p><strong>Phone:</strong> ${req.body.phone}</p>
                <p><strong>Current Grade:</strong> ${req.body.currentGrade}</p>
                <p><strong>GPA:</strong> ${req.body.gpa}</p>
                <p><strong>Boarding Preference:</strong> ${req.body.boarding}</p>
                <p><a href="${process.env.ADMIN_PANEL_URL || 'http://localhost:5000/admin'}/applications/${application._id}">View Full Application</a></p>
            `
        };

        transporter.sendMail(adminMailOptions, (err, info) => {
            if (err) console.log('Admin email error:', err);
            else console.log('Admin notification sent');
        });

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            applicationId: application._id
        });

    } catch (error) {
        console.error('Application submission error:', error);
        res.status(400).json({
            success: false,
            message: 'Error submitting application',
            error: error.message
        });
    }
});

// Get all applications (Admin only)
app.get('/api/applications', async (req, res) => {
    try {
        const applications = await Application.find().sort({ submittedAt: -1 });
        res.json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching applications',
            error: error.message
        });
    }
});

// Get single application
app.get('/api/applications/:id', async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }
        res.json({ success: true, data: application });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching application',
            error: error.message
        });
    }
});

// Update application status
app.put('/api/applications/:id', async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status, updatedAt: Date.now() },
            { new: true }
        );
        res.json({ success: true, message: 'Application updated', data: application });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating application',
            error: error.message
        });
    }
});

// ===== CONTACT ROUTES =====

// Submit Contact Form
app.post('/api/contact', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();

        // Send confirmation to user
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: 'We Received Your Message - KAidO High School',
            html: `
                <h2>Thank You for Contacting Us!</h2>
                <p>Dear ${req.body.name},</p>
                <p>We have received your message and will respond as soon as possible.</p>
                <p><strong>Subject:</strong> ${req.body.subject}</p>
                <p>Thank you for your interest in KAidO High School.</p>
                <p>Best regards,<br>KAidO High School Team</p>
            `
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log('Email error:', err);
        });

        res.status(201).json({
            success: true,
            message: 'Message received successfully'
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error submitting contact form',
            error: error.message
        });
    }
});

// Get all contact messages
app.get('/api/contact', async (req, res) => {
    try {
        const messages = await Contact.find().sort({ submittedAt: -1 });
        res.json({
            success: true,
            count: messages.length,
            data: messages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching messages',
            error: error.message
        });
    }
});

// ===== ADMIN ROUTES =====

// Admin Dashboard Data
app.get('/api/admin/dashboard', async (req, res) => {
    try {
        const totalApplications = await Application.countDocuments();
        const submittedApplications = await Application.countDocuments({ status: 'submitted' });
        const acceptedApplications = await Application.countDocuments({ status: 'accepted' });
        const totalMessages = await Contact.countDocuments();
        const unreadMessages = await Contact.countDocuments({ responded: false });

        res.json({
            success: true,
            statistics: {
                totalApplications,
                submittedApplications,
                acceptedApplications,
                totalMessages,
                unreadMessages
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard data',
            error: error.message
        });
    }
});

// Get applications by status
app.get('/api/admin/applications/status/:status', async (req, res) => {
    try {
        const applications = await Application.find({ status: req.params.status });
        res.json({
            success: true,
            status: req.params.status,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching applications',
            error: error.message
        });
    }
});

// ===== STATISTICS ROUTES =====

// Application Statistics
app.get('/api/statistics/applications', async (req, res) => {
    try {
        const byGrade = await Application.aggregate([
            { $group: { _id: '$currentGrade', count: { $sum: 1 } } }
        ]);

        const byProgram = await Application.aggregate([
            { $unwind: '$programs' },
            { $group: { _id: '$programs', count: { $sum: 1 } } }
        ]);

        const byBoarding = await Application.aggregate([
            { $group: { _id: '$boarding', count: { $sum: 1 } } }
        ]);

        res.json({
            success: true,
            statistics: {
                byGrade,
                byProgram,
                byBoarding
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics',
            error: error.message
        });
    }
});

// ===== ERROR HANDLING =====
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: err.message
    });
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`KAidO High School API Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;