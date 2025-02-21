import { Router } from 'express';
import Payroll from './models/Payroll.js';

const router = Router();

router.post('/generate-payslip', async (req, res) => {
  const { employeeId, month, basicSalary, allowances, deductions } = req.body;

  
  try {
    const totalPay = basicSalary + allowances - deductions;

    const payroll = new Payroll({
      employeeId,
      month,
      basicSalary,
      allowances,
      deductions,
      totalPay,
    });

    await payroll.save();
    res.status(201).json({ message: 'Payslip generated successfully', payroll });


    // Generate PDF from Form Data
    // Create a new PDF document
    const doc = new PDFDocument();
    const pdfPath = path.join(__dirname, "output.pdf");
    const writeStream = fs.createWriteStream(pdfPath);

    doc.pipe(writeStream);

    // Add content to PDF
    doc.fontSize(20).text("Employee Details", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Name: ${name}`);
    doc.text(`Email: ${email}`);
    doc.text(`Role: ${role}`);

    doc.end();

    writeStream.on("finish", () => {
      res.download(pdfPath, "employee-details.pdf", (err) => {
        if (err) console.log(err);
        fs.unlinkSync(pdfPath); // Delete file after download
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating payslip', error });
  }
});

export default router;