import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the interface for payslip data
interface Payslip {
  id: string;
  employeeName: string;
  department: string;
  salary: number;
  hra: number;
  convayance: number;
  medical: number;
  educational: number;
  special: number;
  deductions: number;
  monthYear: string;
  workingDays: number;
  presentDays: number;
  absentDays: number;
  status: 'Unpaid' | 'Paid';
}

export const PayslipGenerator: React.FC = () => {
  const [filterTeam, setFilterTeam] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterDate, setFilterDate] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; // Define number of items per page
  const [payslipData, setPayslipData] = useState<Payslip[]>([]); // Use the Payslip type
  const [loading, setLoading] = useState<boolean>(false); // State to track loading
  const [error, setError] = useState<string>(''); // State for error handling

  // Fetch data using Axios
  useEffect(() => {
    const fetchPayslipData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get<Payslip[]>('YOUR_API_URL_HERE'); // Replace with your API endpoint
        setPayslipData(response.data); // Assuming the response data is an array of payslips
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchPayslipData();
  }, []);

  const calculatePayComponents = (salary: number) => {
    const basic = salary * 0.4; // 40% of salary
    const hra = basic * 0.4; // 40% of basic
    const conveyance = 1600; // Fixed
    const medical = 1250; // Fixed
    const educational = 200; // Fixed
    const special = salary - (basic + hra + conveyance + medical + educational); // Remaining after all deductions

    return { basic, hra, conveyance, medical, educational, special };
  };

  const handleStatusChange = (id: string) => {
    const updatedPayslipData = payslipData.map(payslip =>
      payslip.id === id
        ? {
            ...payslip,
            status: (payslip.status === "Unpaid" ? "Paid" : "Unpaid") as "Unpaid" | "Paid", // Explicit cast to the correct type
          }
        : payslip
    );
    setPayslipData(updatedPayslipData);
  };
  

  const filteredPayslips = payslipData.filter((payslip) => {
    return (
      (filterTeam ? payslip.department === filterTeam : true) &&
      (searchTerm ? payslip.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || payslip.id.toLowerCase().includes(searchTerm.toLowerCase()) : true) &&
      (filterStatus ? payslip.status === filterStatus : true) &&
      (filterDate ? payslip.monthYear.includes(filterDate) : true)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPayslips.length / itemsPerPage);
  const paginatedPayslips = filteredPayslips.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Group by department to show team salary totals
  const departmentSalaries = filteredPayslips.reduce((acc, payslip) => {
    const totalSalary = payslip.salary + payslip.hra + payslip.convayance + payslip.medical + payslip.educational + payslip.special - payslip.deductions;
    acc[payslip.department] = (acc[payslip.department] || 0) + totalSalary;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white h-full px-8 py-6">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 border-2 rounded-lg border-yellow-600">
          <h3 className="font-bold text-lg text-yellow-600">Total Persons</h3>
          <p className="text-2xl font-bold mt-2">{filteredPayslips.length}</p>
        </div>

        <div className="p-4 border-2 rounded-lg border-green-600">
          <h3 className="font-bold text-lg text-green-600">Total Salary</h3>
          <p className="text-2xl font-bold mt-2">
            ₹{filteredPayslips.reduce((acc, payslip) => acc + payslip.salary + payslip.hra + payslip.convayance + payslip.medical + payslip.educational + payslip.special - payslip.deductions, 0)}
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 border-2 rounded-lg border-yellow-600">
          <h3 className="font-bold text-lg text-yellow-600">Filter by Team</h3>
          <select
            className="mt-2 border rounded px-2 py-1 w-full"
            value={filterTeam}
            onChange={(e) => setFilterTeam(e.target.value)}
          >
            <option value="">All Teams</option>
            {Array.from(new Set(payslipData.map((row) => row.department))).map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        <div className="p-4 border-2 rounded-lg border-blue-600">
          <h3 className="font-bold text-lg text-blue-600">Search by Name/ID</h3>
          <input
            type="text"
            placeholder="Enter name or ID"
            className="mt-2 border rounded px-2 py-1 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="p-4 border-2 rounded-lg border-green-600">
          <h3 className="font-bold text-lg text-green-600">Filter by Month</h3>
          <input
            type="month"
            className="mt-2 border rounded px-2 py-1 w-full"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>

        <div className="p-4 border-2 rounded-lg border-red-600">
          <h3 className="font-bold text-lg text-red-600">Filter by Status</h3>
          <select
            className="mt-2 border rounded px-2 py-1 w-full"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
      </div>

      {/* Payslip Table */}
      <div className="overflow-y-auto max-h-[500px] mb-6">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">S.No</th>
              <th className="border border-gray-300 px-4 py-2">month-Year</th>
              <th className="border border-gray-300 px-4 py-2">Employee ID</th>
              <th className="border border-gray-300 px-4 py-2">Employee Name</th>
              <th className="border border-gray-300 px-4 py-2">Department</th>
              <th className="border border-gray-300 px-4 py-2">Salary</th>
              <th className="border border-gray-300 px-4 py-2">Basic</th>
              <th className="border border-gray-300 px-4 py-2">HRA</th>
              <th className="border border-gray-300 px-4 py-2">Convayance</th>
              <th className="border border-gray-300 px-4 py-2">Medical Allowance</th>
              <th className="border border-gray-300 px-4 py-2">Educational Allowance</th>
              <th className="border border-gray-300 px-4 py-2">Special Allowance</th>
              <th className="border border-gray-300 px-4 py-2">Deductions</th>
              <th className="border border-gray-300 px-4 py-2">Total Salary</th>
              <th className="border border-gray-300 px-4 py-2">Working Days</th>
              <th className="border border-gray-300 px-4 py-2">Present Days</th>
              <th className="border border-gray-300 px-4 py-2">Absent Days</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPayslips.map((payslip, index) => {
              const { basic, hra, conveyance, medical, educational, special } = calculatePayComponents(payslip.salary);
              const totalSalary = basic + hra + conveyance + medical + educational + special;
              return (
                <tr key={payslip.id}>
                  <td className="border border-gray-300 px-4 py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{payslip.monthYear}</td>
                  <td className="border border-gray-300 px-4 py-2">{payslip.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{payslip.employeeName}</td>
                  <td className="border border-gray-300 px-4 py-2">{payslip.department}</td>
                  <td className="border border-gray-300 px-4 py-2">₹{payslip.salary}</td>
                  <td className="border border-gray-300 px-4 py-2">₹{payslip.hra}</td>
                  <td className="border border-gray-300 px-4 py-2">₹{payslip.convayance}</td>
                  <td className="border border-gray-300 px-4 py-2">₹{payslip.medical}</td>
                  <td className="border border-gray-300 px-4 py-2">₹{payslip.educational}</td>
                  <td className="border border-gray-300 px-4 py-2">₹{payslip.special}</td>
                  <td className="border border-gray-300 px-4 py-2">₹{payslip.deductions}</td>
                  <td className="border border-gray-300 px-4 py-2">₹{totalSalary}</td>
                  <td className="border border-gray-300 px-4 py-2">{payslip.workingDays}</td>
                  <td className="border border-gray-300 px-4 py-2">{payslip.presentDays}</td>
                  <td className="border border-gray-300 px-4 py-2">{payslip.absentDays}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleStatusChange(payslip.id)}
                      className={`text-white py-1 px-3 rounded ${payslip.status === 'Unpaid' ? 'bg-red-500' : 'bg-green-500'}`}
                    >
                      {payslip.status}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Department-wise Salary Totals */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
        {Object.entries(departmentSalaries).map(([department, totalSalary]) => (
          <div key={department} className="p-4 border-2 rounded-lg border-blue-600">
            <h3 className="font-bold text-lg text-blue-600">{department} Total Salary</h3>
            <p className="text-2xl font-bold mt-2">₹{totalSalary.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-300 rounded-lg mr-2 text-sm w-1/6"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-sm">{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-gray-300 rounded-lg ml-2 text-sm w-1/6"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PayslipGenerator;
