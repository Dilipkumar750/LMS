import express, { json } from 'express';
import { config } from 'dotenv';
import cors from "cors";
import bcrypt from 'bcrypt';
import connectDB from './config/mongoConfig.js';
import authRoutes from './routes/auth-routes.js';
import employeeRoutes from './routes/employee-routes.js';
import attendanceRoutes from './routes/attendance-routes.js';
import companyPolicyRoutes from './routes/company-policy-routes.js';
import User from './models/User.js';

config();
connectDB();

const app = express();
app.use(json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/employees', employeeRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/company-policies',companyPolicyRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Function to create the admin user
const createAdminUser = async () => {
    try {
        // Establish database connection
        await connectDB();

        // Password hashing (you should always hash passwords)
        const hashedPassword = await bcrypt.hash('new-email', 10);  // Replace with a more secure password

        // Create the admin user
        const adminUser = new User({
            employee_id: "GGSCB25000",
            name: 'Admin User',
            email: 'hr@ultraflysolutions.com',
            password: hashedPassword,
            department: "Admin",
            designation:"Manager",
            role: 'Admin',
            archieved: false,
        });

        // Save to database
        const savedUser = await adminUser.save();

        console.log('Admin user created:', savedUser);
    } catch (err) {
        console.error('Error creating admin user:', err);
    }
};

// Uncomment the line below to create an admin user when needed
// createAdminUser();