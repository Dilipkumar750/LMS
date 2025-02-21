import User from "../models/User.js";
import EmployeeDetails from '../models/EmployeeDetails.js';
import Payroll from "../models/Payroll.js";
import Attendance from "../models/Attendance.js";
import Counter from '../models/Counter.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';


// Add new employee and send email for validation
export async function createEmployee(req, res) {

  const { name, department, salary, email, password, designation } = req.body;

  const GGS = "GGS";
  const location = "CB";
  const date = new Date;
  const year = date.getFullYear().toString().slice(-2);

  const employeeCount = await Counter.findOneAndUpdate({}, { $inc: { count: 1 } }, { new: true, upsert: true });
  const formattedEmployeeCount = String(employeeCount.count).padStart(3, "0");
  const employee_id = `${GGS}${location}${year}${formattedEmployeeCount}`;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newEmployee = new User({ name: name, department: department, salary: salary, email: email, password: hashPassword, employee_id: employee_id, designation: designation });
    const activationRoute = `${process.env.BASE_URL}/auth/login`
    // Generate validation token
    // const validationToken = randomBytes(20).toString('hex');
    // newEmployee.validationToken = validationToken;

    await newEmployee.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Replace with your email service (e.g., Gmail, Outlook, etc.)
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });
    // console.log(transporter)
    // Send email for validation
    // const validationLink = `${process.env.BASE_URL}/validate/${validationToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Employee Email Validation from Ultrafly',
      html: `
      <p>Dear ${name},</p>
      <p>We are excited to have you join the <strong>[Your Company]</strong> family! To help you get started, we need you to activate your employee account.</p>
      <p>Please click the link below to complete the activation process:</p>
      <p>Login with your email and ${password}.
      <p><a href="${activationRoute}" style="color: #007bff; text-decoration: none;">Activate My Account</a></p>
      <p>Once your account is activated, you will gain access to the <strong>HRM</strong>.</p>
      <p>If you encounter any issues during activation, please don't hesitate to reach out to us at <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a>.</p>
      <p>We look forward to working together and achieving great success!</p>
      <br />
      <p>Best regards,</p>
      <p><strong>[Your Full Name]</strong></p>
      <p>[Your Job Title]</p>
      <p>[Your Company Name]</p>
    `
    };
    // console.log(mailOptions)
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Employee created! Please check your email to validate.' });
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(400).json({ error: 'Failed to add employee' });
  }
}


export async function activateEmail(req, res) {
  const { token, } = req.params;
  if (!token || !email) {
    return res.status(400).send('Invalid activation link');
  }
  try {
    const employee = await User.findOne({ validationToken: token });

    if (!employee) return res.status(400).json({ message: 'Invalid or expired token' });

    employee.isValidated = true;  // Update the validation status
    employee.validationToken = null;  // Clear the token

    await employee.save();

    res.status(200).json({ message: 'Email validated successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}


// // Get all employees
export async function getEmployees(req, res) {

  try {
    const employees = await User.find({ archived: false });
    if (employees.length === 0) return res.status(200).json({ message: "No active employees" })
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getEmployeeProfile(req, res) {
  const {employee_id} = req.body;
  try {
    const employee = await EmployeeDetails.findOne({employee_id});
   return res.status(200).json(employee);
  } catch {
    return res.status(500).json({ error: "Server error" });
  }
}

export async function updateEmployeeProfileDetails(req, res) {

  app.post("/upload", upload.single("file"), async (req, res) => {
    try {
      const fileUrl = req.file.location; // S3 URL
      res.json({ fileUrl });
    } catch (error) {
      res.status(500).json({ error: "Upload failed" });
    }
  });
  res.status(200).json(employees);
}



export const uploadMultipleFiles = async (req, res) => {
  try {
    if (!req.file || req.files.length == 0) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const uploadFiles = req.files.map(file =>({
      fileName: file.originalName,
      fileUrl : file.location
    }));

    res.status(200).json({
      message: 'File uploaded successfully',
      files: uploadFiles
    });
  } catch (error) {
    res.status(500).json({ error: 'File upload failed' });
  }
};


export async function deleteEmployee(req, res) {
  try {
    const employee_id = req.query.employee_id;
    if (!employee_id) {
      return res.status(400).json({ message: "Employee ID is required" });
    }

    const deleteEmployee = await User.findOneAndUpdate({ employee_id }, { archived: true }, { new: true });
    if (!deleteEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: 'Server error' });
  }
}