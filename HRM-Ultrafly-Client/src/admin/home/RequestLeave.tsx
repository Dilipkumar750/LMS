import React, { useState, useEffect } from "react";
import axios from "axios";
import { environment } from "../../environments/environment";

interface LeaveRequest {
  id: number;
  employeeId: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
}

const RequestLeave: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [filterMonth, setFilterMonth] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch leave requests on component mount
  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  // Set current month for filtering
  useEffect(() => {
    const currentMonth = new Date().toISOString().split("-")[1];
    setFilterMonth(currentMonth);
  }, []);

  // Axios function to fetch leave requests
  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get(`${environment.apiPort}/api/leave-requests`); // Replace with your API endpoint
      setLeaveRequests(response.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  // Axios function to update leave request status
  const updateLeaveRequestStatus = async (id: number, newStatus: string) => {
    try {
      await axios.put(`${environment.apiPort}/api/leave-requests/${id}`, { status: newStatus }); // Replace with your API endpoint
      setLeaveRequests((prev) =>
        prev.map((request) =>
          request.id === id ? { ...request, status: newStatus } : request
        )
      );
    } catch (error) {
      console.error("Error updating leave request status:", error);
    }
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    updateLeaveRequestStatus(id, newStatus);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterMonth(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filterRequests = (requests: LeaveRequest[]) => {
    let filtered = requests;

    // Filter by month if selected
    if (filterMonth) {
      filtered = filtered.filter((request) => {
        const startMonth = request.startDate.split("/")[1];
        return startMonth === filterMonth;
      });
    }

    // Filter by search term if provided
    if (searchTerm) {
      filtered = filtered.filter(
        (request) =>
          request.employeeName.toLowerCase().includes(searchTerm) ||
          request.employeeId.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  };

  const filteredRequests = filterRequests(leaveRequests);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-6">Leave Requests</h2>

      {/* Filters */}
      <div className="flex flex-wrap items-center mb-4 gap-4">
        {/* Month Filter */}
        <div>
          <label htmlFor="month-filter" className="font-medium mr-4">
            Filter by Month:
          </label>
          <select
            id="month-filter"
            value={filterMonth}
            onChange={handleMonthChange}
            className="py-1 px-3 border border-gray-300 rounded"
          >
            <option value="">All</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        {/* Search Filter */}
        <div>
          <label htmlFor="search-filter" className="font-medium mr-4">
            Search by Name/ID:
          </label>
          <input
            id="search-filter"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Enter name or ID"
            className="py-1 px-3 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Leave Requests Table */}
      <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-4 py-2 border">S.No</th>
            <th className="px-4 py-2 border">Employee ID</th>
            <th className="px-4 py-2 border">Employee Name</th>
            <th className="px-4 py-2 border">Leave Type</th>
            <th className="px-4 py-2 border">Start Date</th>
            <th className="px-4 py-2 border">End Date</th>
            <th className="px-4 py-2 border">Reason</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request, index) => (
            <tr key={request.id} className="text-gray-700">
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">{request.employeeId}</td>
              <td className="px-4 py-2 border">{request.employeeName}</td>
              <td className="px-4 py-2 border">{request.leaveType}</td>
              <td className="px-4 py-2 border">{request.startDate}</td>
              <td className="px-4 py-2 border">{request.endDate}</td>
              <td className="px-4 py-2 border">{request.reason}</td>
              <td
                className={`px-4 py-2 border font-medium ${
                  request.status === "Approved"
                    ? "text-green-600"
                    : request.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {request.status}
              </td>
              <td className="px-4 py-2 border">
                {request.status === "Pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusChange(request.id, "Approved")}
                      className="py-1 px-3 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(request.id, "Rejected")}
                      className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}
                {request.status !== "Pending" && (
                  <span className="text-gray-500 italic">No actions</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestLeave;
