import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../Assets/paysliplogo-removebg-preview.png";

export const PayslipTemplate: React.FC = () => {
  const payslipRef = useRef<HTMLDivElement>(null);

  const downloadPayslip = async () => {
    if (payslipRef.current) {
      try {
        const canvas = await html2canvas(payslipRef.current, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 10, imgWidth, imgHeight);
        pdf.save("Payslip.pdf");
      } catch (error) {
        console.error("Error generating PDF: ", error);
      }
    }
  };

  const samplePayslip = {
    id: "EMP12345",
    employeeName: "John Doe",
    joiningDate: "01-Jan-2023",
    teamDesignation: "Software Engineer",
    department: "IT",
    location: "Coimbatore",
    bankName: "XYZ Bank",
    bankAccount: "1234567890",
    panNumber: "ABCDE1234F",
    effectiveWorkDays: 22,
    lopDays: 2,
    salary: 50000,
    salaryDetails: {
      month: "January",
      basicPay: 20000,
      hra: 10000,
      conveyance: 5000,
      medicalAllowance: 3000,
      specialAllowance: 7000,
      educationalAllowance: 5000,
      deductions: 0,
    },
  };

  return (
    <div className="flex flex-col items-center">
      {/* Payslip Content */}
      <div ref={payslipRef} className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-300">
        <div className="flex justify-between items-center mb-4">
          <img src={logo} alt="Company Logo" className="h-16" />
          <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-800">GESSDEMN GLOBAL SERVICES</h1>
            <p className="text-gray-600">
              25, Lakshmipuram 4th Street, Peelamedu, Coimbatore, Tamil Nadu, 641004
            </p>
          </div>
        </div>

        <h2 className="font-bold text-lg mt-2 mb-2 text-center">
          Payslip for {samplePayslip.salaryDetails.month} 2025
        </h2>

        <div className="border border-gray-300 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>
                <strong>Name:</strong> {samplePayslip.employeeName}
              </p>
              <p>
                <strong>Joining Date:</strong> {samplePayslip.joiningDate}
              </p>
              <p>
                <strong>Designation:</strong> {samplePayslip.teamDesignation}
              </p>
              <p>
                <strong>Department:</strong> {samplePayslip.department}
              </p>
              <p>
                <strong>Location:</strong> {samplePayslip.location}
              </p>
              <p>
                <strong>Effective Work Days:</strong> {samplePayslip.effectiveWorkDays}
              </p>
              <p>
                <strong>LOP (Loss of Pay):</strong> {samplePayslip.lopDays}
              </p>
            </div>
            <div>
              <p>
                <strong>Employee No:</strong> {samplePayslip.id}
              </p>
              <p>
                <strong>Bank Name:</strong> {samplePayslip.bankName}
              </p>
              <p>
                <strong>Bank Account No:</strong> {samplePayslip.bankAccount}
              </p>
              <p>
                <strong>PAN No:</strong> {samplePayslip.panNumber}
              </p>
            </div>
          </div>
        </div>

        <table className="w-full border-collapse border border-gray-300 text-left mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Earnings</th>
              <th className="border border-gray-300 p-2">Gross</th>
              <th className="border border-gray-300 p-2">Actual</th>
              <th className="border border-gray-300 p-2">Deductions</th>
              <th className="border border-gray-300 p-2">Actual</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Basic Pay</td>
              <td className="border border-gray-300 p-2">₹{samplePayslip.salaryDetails.basicPay}</td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2">{samplePayslip.salaryDetails.deductions}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">HRA</td>
              <td className="border border-gray-300 p-2">₹{samplePayslip.salaryDetails.hra}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Conveyance</td>
              <td className="border border-gray-300 p-2">₹{samplePayslip.salaryDetails.conveyance}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Medical Allowance</td>
              <td className="border border-gray-300 p-2">₹{samplePayslip.salaryDetails.medicalAllowance}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Special Allowance</td>
              <td className="border border-gray-300 p-2">₹{samplePayslip.salaryDetails.specialAllowance}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Educational Allowance</td>
              <td className="border border-gray-300 p-2">₹{samplePayslip.salaryDetails.educationalAllowance}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-between bg-gray-200 p-4 rounded-lg">
          <p>
            <strong>Total Earnings INR:</strong> ₹{samplePayslip.salary}
          </p>
          <p>
            <strong>Total Deductions INR:</strong> ₹{samplePayslip.salaryDetails.deductions}
          </p>
        </div>

        <div className="text-center mt-4">
          <p>
            <strong>Net Pay for the Month:</strong> ₹
            {samplePayslip.salary - samplePayslip.salaryDetails.deductions}
          </p>
          <p>(Rupees in words: Fifty Thousand Only)</p>
        </div>

        <div className="mt-6 text-center text-gray-600">
          <p className="text-sm">This is a system-generated payslip and does not require a signature.</p>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center mt-4">
        <button onClick={downloadPayslip} className="bg-blue-500  text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Download Payslip
        </button>
      </div>
    </div>
  );
};
