import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { environment } from "../../environments/environment";


// Define the type for employee
interface Employee {
  id: number;
  name: string;
  role: string;
  // Add other employee properties as needed
}
interface FormData {
  email: string,
  name: string,
  department: string,
  designation: string,
  salary: undefined,
  password: string
}

const AllEmployees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTeam, setFilterTeam] = useState("");
  const [filterDesignation, setFilterDesignation] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const [formData, setFormData] = useState({
  //   email: "",
  //   name: "",
  //   department: "",
  //   salary: "",
  //   description: "",
  // });
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    department: "",
    designation: "",
    salary: undefined,
    password: ""
  });
  // const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Fetch employees from the backend
  useEffect(() => {
    axios
      // .get("https://api.example.com/employees") // Replace with your API endpoint
      .get(`${environment.apiPort}/employees/get`) // Replace with your API endpoint

      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, [employees]);

  // Filter logic
  const filteredEmployees = employees.filter((employee: any) => {
    const matchesSearchQuery =
      searchQuery === "" ||
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employee_id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTeam = filterTeam === "" || employee.team === filterTeam;

    const matchesDesignation =
      filterDesignation === "" || employee.designation === filterDesignation;

    return matchesSearchQuery && matchesTeam && matchesDesignation;
  });
console.log(filteredEmployees)
  // Current page employees
  const currentEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const viewEmployeeDetails = (employee: any) => {

    navigate("/home/profile")
    // navigate(`/employee-details/${employee.id}`, { state: { employee } });
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to add a new employee
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    axios({ method: "POST", url: `${environment.apiPort}/employees/create`, data: formData, headers: { "Authorization": localStorage.getItem("Authorization") } }) // Replace with your API endpoint
      .then((response) => {

        // setEmployees((prev)=> [...prev,response.data] )
        // setEmployees((prevState: never[]) => [...prevState, response.data]);
        setEmployees((prevState: Employee[]) => [...prevState, response.data]);
        // setFormData({
        //   email: "",
        //   name: "",
        //   department: "",
        //   designation: "",
        //   salary: undefined,
        //   password: "",
        // });
        setIsDrawerOpen(!isDrawerOpen);
        console.log(formData)
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
      });
  };

  return (
    <div className="bg-white h-full px-8 py-6">
      <h2 className="text-2xl font-bold mb-4">All Employees</h2>

      {/* Filters and Search */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or Employee ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded w-1/3"
        />
        <select
          title="department"
          value={filterTeam}
          onChange={(e) => setFilterTeam(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="">All Teams</option>
          <option value="Development">Development</option>
          <option value="Marketing">Marketing</option>
          <option value="HR">HR</option>
        </select>
        <select
          title="designation"
          value={filterDesignation}
          onChange={(e) => setFilterDesignation(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="">All Designations</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Manager">Manager</option>
        </select>
        <button
          type="button"
          onClick={toggleDrawer}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-1/6 mx-auto"
        >
          Add Employee
        </button>
        <button
          type="button"
          onClick={toggleDrawer}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-1/6 mx-auto"
        >
          Delete Employee
        </button>
      </div>

      {/* Employee Table */}
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">S.No</th>
            <th className="border border-gray-300 px-4 py-2">Employee ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Designation</th>
            <th className="border border-gray-300 px-4 py-2">Department</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee: any, index) => (
            <tr key={employee.employee_id}>
              <td className="border border-gray-300 px-4 py-2">
                {index + 1 + (currentPage - 1) * itemsPerPage}
              </td>
              <td className="border border-gray-300 px-4 py-2">{employee.employee_id}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.name}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.designation}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.department}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  type="button"
                  onClick={() => viewEmployeeDetails(employee)}
                  className="text-blue-500 hover:bg-blue-500 hover:text-white px-2 py-1 rounded"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mx-auto items-center mt-4 w-1/6 gap-10">
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`py-1 px-3 rounded ${currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredEmployees.length / itemsPerPage)))}
          disabled={currentPage === Math.ceil(filteredEmployees.length / itemsPerPage)}
          className={`py-1 px-3 rounded ${currentPage === Math.ceil(filteredEmployees.length / itemsPerPage)
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
        >
          Next
        </button>
      </div>

      {/* Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end z-50">
          <div className="bg-white w-1/3 h-full p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Add Employee</h3>
              <button
                onClick={toggleDrawer}
                className="text-red-500 hover:text-red-700 text-lg font-bold w-10"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Personal Mail ID</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border px-4 py-2 rounded w-full"
                  placeholder="Enter Personal Mail ID"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border px-4 py-2 rounded w-full"
                  placeholder="Enter Name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="border px-4 py-2 rounded w-full"
                  placeholder="Enter Department Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="border px-4 py-2 rounded w-full"
                  placeholder="Enter Designation Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="border px-4 py-2 rounded w-full"
                  placeholder="Enter Salary"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="border px-4 py-2 rounded w-full"
                  placeholder="Enter Password"
                  required
                ></input>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllEmployees;
