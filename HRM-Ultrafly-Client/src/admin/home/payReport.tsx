import React, { useMemo, useState } from "react";

const PayrollPage: React.FC = () => {
  interface Employee {
    empId: string;
    empName: string;
    designation: string;
    team: string;
    salary: number;
    month: string;
  }

  const [rowData, setRowData] = useState<Employee[]>([
    {
      empId: "E001",
      empName: "John Doe",
      designation: "Software Engineer",
      team: "IT",
      salary: 10000,
      month: "2025-01",
    },
    {
      empId: "E002",
      empName: "Jane Smith",
      designation: "QA Analyst",
      team: "Marketing",
      salary: 12000,
      month: "2025-01",
    },
    {
      empId: "E003",
      empName: "Mike Johnson",
      designation: "Project Manager",
      team: "Management",
      salary: 15000,
      month: "2025-01",
    },
    {
      empId: "E004",
      empName: "Emily Davis",
      designation: "Designer",
      team: "IT",
      salary: 9000,
      month: "2025-01",
    },
  ]);

  const [filterTeam, setFilterTeam] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterMonth, setFilterMonth] = useState<string>("");
  const [filterPeriod, setFilterPeriod] = useState<string>("");

  // Filtered Data
  const filteredData = useMemo(() => {
    return rowData.filter((row) => {
      const matchesTeam = filterTeam ? row.team === filterTeam : true;
      const matchesSearch =
        searchTerm
          ? row.empName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.empId.toLowerCase().includes(searchTerm.toLowerCase())
          : true;
      const matchesMonth = filterMonth ? row.month === filterMonth : true;

      let matchesPeriod = true;
      if (filterPeriod === "quarterly") {
        const month = parseInt(row.month.split("-")[1]);
        matchesPeriod = month >= 1 && month <= 3; // Quarter 1 (Jan-Mar)
      } else if (filterPeriod === "half-yearly") {
        const month = parseInt(row.month.split("-")[1]);
        matchesPeriod = month >= 1 && month <= 6; // First Half (Jan-Jun)
      } else if (filterPeriod === "annually") {
        // All months are valid for the annual period
        matchesPeriod = true;
      }

      return matchesTeam && matchesSearch && matchesMonth && matchesPeriod;
    });
  }, [filterTeam, searchTerm, filterMonth, filterPeriod, rowData]);

  // Calculate totals
  const totalSalary = filteredData.reduce((acc, row) => acc + row.salary, 0);
  const totalItSalary = filteredData
    .filter((row) => row.team === "IT")
    .reduce((acc, row) => acc + row.salary, 0);
  const totalMarketingSalary = filteredData
    .filter((row) => row.team === "Marketing")
    .reduce((acc, row) => acc + row.salary, 0);
  const totalOtherTeamSalary = filteredData
    .filter((row) => row.team !== "IT" && row.team !== "Marketing")
    .reduce((acc, row) => acc + row.salary, 0);

  return (
    <div className="bg-white px-8 py-6 min-h-screen">
      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="p-4 border-2 rounded-lg border-yellow-600">
          <h3 className="font-bold text-lg text-yellow-600">Total Employees</h3>
          <p className="text-2xl font-bold mt-2">{filteredData.length}</p>
        </div>
        <div className="p-4 border-2 rounded-lg border-green-600">
          <h3 className="font-bold text-lg text-green-600">Overall Salary</h3>
          <p className="text-2xl font-bold mt-2">₹{totalSalary}</p>
        </div>
        <div className="p-4 border-2 rounded-lg border-blue-600">
          <h3 className="font-bold text-lg text-blue-600">IT Team Salary</h3>
          <p className="text-2xl font-bold mt-2">₹{totalItSalary}</p>
        </div>
        <div className="p-4 border-2 rounded-lg border-red-600">
          <h3 className="font-bold text-lg text-red-600">Marketing Team Salary</h3>
          <p className="text-2xl font-bold mt-2">₹{totalMarketingSalary}</p>
        </div>
        <div className="p-4 border-2 rounded-lg border-gray-600">
          <h3 className="font-bold text-lg text-gray-600">Other Team Salary</h3>
          <p className="text-2xl font-bold mt-2">₹{totalOtherTeamSalary}</p>
        </div>
      </div>

      {/* Search Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 border-2 rounded-lg border-yellow-600">
          <h3 className="font-bold text-lg text-yellow-600">Search by Name/ID</h3>
          <input
            type="text"
            placeholder="Enter name or ID"
            className="mt-2 border rounded px-2 py-1 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="p-4 border-2 rounded-lg border-blue-600">
          <h3 className="font-bold text-lg text-blue-600">Filter by Month</h3>
          <input
            type="month"
            className="mt-2 border rounded px-2 py-1 w-full"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
          />
        </div>
        <div className="p-4 border-2 rounded-lg border-green-600">
          <h3 className="font-bold text-lg text-green-600">Filter by Team</h3>
          <select
            className="mt-2 border rounded px-2 py-1 w-full"
            value={filterTeam}
            onChange={(e) => setFilterTeam(e.target.value)}
          >
            <option value="">All Teams</option>
            {Array.from(new Set(rowData.map((row) => row.team))).map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>
        <div className="p-4 border-2 rounded-lg border-purple-600">
          <h3 className="font-bold text-lg text-purple-600">Filter by Period</h3>
          <select
            className="mt-2 border rounded px-2 py-1 w-full"
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
          >
            <option value="">All Periods</option>
            <option value="quarterly">Quarterly</option>
            <option value="half-yearly">Half-Yearly</option>
            <option value="annually">Annually</option>
          </select>
        </div>
      </div>

      {/* Simple HTML Table */}
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Employee ID</th>
            <th className="border px-4 py-2">Employee Name</th>
            <th className="border px-4 py-2">Designation</th>
            <th className="border px-4 py-2">Team</th>
            <th className="border px-4 py-2">Salary (INR)</th>
            <th className="border px-4 py-2">Month</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.empId}>
              <td className="border px-4 py-2">{row.empId}</td>
              <td className="border px-4 py-2">{row.empName}</td>
              <td className="border px-4 py-2">{row.designation}</td>
              <td className="border px-4 py-2">{row.team}</td>
              <td className="border px-4 py-2">{row.salary}</td>
              <td className="border px-4 py-2">{row.month}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollPage;
