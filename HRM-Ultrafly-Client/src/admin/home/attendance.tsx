import React, { useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import axios from "axios";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { environment } from "../../environments/environment";

interface rowData {
  employee_id: string,
  name: string,
  designation: string,
  department: string,
  status: string,
  date: string,
  checkIn: string,
  checkOut: string,
}

const AttendancePage: React.FC = () => {
  // const [rowData, setRowData] = useState([
    // {
    //   empId: "E001",
    //   empName: "John Doe",
    //   designation: "Software Engineer",
    //   team: "Development",
    //   status: "Present",
    //   date: "2025-01-25",
    //   checkIn: "09:00 AM",
    //   checkOut: "06:00 PM",
    // },
    // {
    //   empId: "E002",
    //   empName: "Jane Smith",
    //   designation: "QA Analyst",
    //   team: "Testing",
    //   status: "Absent",
    //   date: "2025-01-25",
    //   checkIn: "-",
    //   checkOut: "-",
    // },
    // {
    //   empId: "E003",
    //   empName: "Mike Johnson",
    //   designation: "Project Manager",
    //   team: "Management",
    //   status: "Present",
    //   date: "2025-01-25",
    //   checkIn: "10:00 AM",
    //   checkOut: "03:00 PM",
    // },
    // {
    //   empId: "E004",
    //   empName: "Emily Davis",
    //   designation: "Designer",
    //   team: "Design",
    //   status: "Present",
    //   date: "2025-01-25",
    //   checkIn: "09:30 AM",
    //   checkOut: "06:00 PM",
    // },
  // ]);
  const [rowData, setRowData] = useState<rowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterTeam, setFilterTeam] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  // Fetch attendance data
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`${environment.apiPort}/attendance/get-today-attendance`);
        // console.log(response.data)
        setRowData(response.data);
        // console.log(rowData);
      } catch (err) {
        setError("Failed to fetch attendance data. Please try again later.");
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [error]);



  // Filtered Data
  const filteredData = useMemo(() => {
    return rowData.filter((row) => {
      const matchesTeam = filterTeam ? row.department === filterTeam : true;
      const matchesSearch = searchTerm
        ? row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.employee_id.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesDate = filterDate ? row.date === filterDate : true;
      const matchesStatus = filterStatus ? row.status === filterStatus : true;
      return matchesTeam && matchesSearch && matchesDate && matchesStatus;
    });
  }, [filterTeam, searchTerm, filterDate, filterStatus, rowData]);
  // console.log(filteredData)
  const columnDefs: ColDef[] =
    [
      { field: "empId", headerName: "Employee ID", minWidth: 100 },
      { field: "empName", headerName: "Employee Name", minWidth: 150 },
      { field: "designation", headerName: "Designation", minWidth: 150 },
      { field: "team", headerName: "Team", minWidth: 120 },
      { field: "status", headerName: "Status", minWidth: 120 },
      { field: "date", headerName: "Date", minWidth: 120 },
      { field: "checkIn", headerName: "Check-in Time", minWidth: 150 },
      { field: "checkOut", headerName: "Check-out Time", minWidth: 150 },
    ]



  const defaultColDef = useMemo(() => ({ flex: 1, resizable: true }), []);

  // Calculate totals
  const totalPresent = filteredData.filter((row) => row.status === "Present").length;
  const totalAbsent = filteredData.filter((row) => row.status === "Absent").length;
  // const totalLeave = filteredData.filter((row) => row.status === "Permission").length;

  return (
    <div>

      {loading ? <div>Loading</div> : 
       <div className="bg-white px-8 py-6 min-h-screen">
       {/* Summary Section */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
         <div className="p-4 border-2 rounded-lg border-yellow-600">
           <h3 className="font-bold text-lg text-yellow-600">Total Persons</h3>
           <p className="text-2xl font-bold mt-2">{rowData.length}</p>
         </div>
 
         <div className="p-4 border-2 rounded-lg border-green-600">
           <h3 className="font-bold text-lg text-green-600">Present</h3>
           <p className="text-2xl font-bold mt-2">{totalPresent}</p>
         </div>
 
         <div className="p-4 border-2 rounded-lg border-red-600">
           <h3 className="font-bold text-lg text-red-600">Absent</h3>
           <p className="text-2xl font-bold mt-2">{totalAbsent}</p>
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
             {Array.from(new Set(rowData.map((row) => row.department))).map((team) => (
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
           <h3 className="font-bold text-lg text-green-600">Filter by Date</h3>
           <input
             type="date"
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
             <option value="Present">Present</option>
             <option value="Absent">Absent</option>
           </select>
         </div>
       </div>
 
       {/* Employee Details Table */}
       <div className="mb-6">
         <h3 className="text-lg font-bold mb-3">Student Details</h3>
         <table className="table-auto w-full border border-gray-300">
           <thead className="bg-gray-100">
             <tr>
               <th className="border px-4 py-2">Student ID</th>
               <th className="border px-4 py-2">Student Name</th>
               <th className="border px-4 py-2">Designation</th>
               <th className="border px-4 py-2">Team</th>
               <th className="border px-4 py-2">Status</th>
               <th className="border px-4 py-2">Date</th>
               <th className="border px-4 py-2">Check-in</th>
               <th className="border px-4 py-2">Check-out</th>
             </tr>
           </thead>
           <tbody>
             {filteredData.map((row) => (
               
               <tr key={row.employee_id}>
                 <td className="border px-4 py-2">{row.employee_id}</td>
                 <td className="border px-4 py-2">{row.name}</td>
                 <td className="border px-4 py-2">{row.designation}</td>
                 <td className="border px-4 py-2">{row.department}</td>
                 <td
                   className={`border px-4 py-2 ${row.status === "Present"
                     ? "text-green-500"
                     : row.status === "Absent"
                       ? "text-red-500"
                       : "text-yellow-500"
                     }`}
                 >
                   {row.status}
                 </td>
                 <td className="border px-4 py-2">{row.date}</td>
                 <td className="border px-4 py-2">{row.checkIn as unknown as string}</td>
                 <td className="border px-4 py-2">{row.checkOut as unknown as string }</td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
 
       {/* Attendance Table */}
       <div className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
         <AgGridReact
           rowData={filteredData}
           columnDefs={columnDefs}
           defaultColDef={defaultColDef}
         />
       </div>
     </div>}
    </div>
   
  );
};

export default AttendancePage;
