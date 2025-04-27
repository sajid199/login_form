const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

// Initialize Firebase Admin (you'll replace this with your own config)
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
});

const firestore = admin.firestore();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..')));

// Form Submission Route
app.post('/submit-form', async (req, res) => {
    try {
        const { 
            firstName, 
            lastName, 
            email, 
            phoneNumber, 
            password, 
            confirmPassword,
            investmentGoal,
            riskTolerance,
            employmentStatus,
            annualIncome
        } = req.body;

        // Basic validation
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Create user document in Firestore
        const userRef = await firestore.collection('users').add({
            firstName,
            lastName,
            email,
            phoneNumber,
            investmentGoal,
            riskTolerance,
            employmentStatus,
            annualIncome,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(200).json({ 
            message: 'Form submitted successfully', 
            userId: userRef.id 
        });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ error: 'Form submission failed' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Server shutting down');
    process.exit(0);
});