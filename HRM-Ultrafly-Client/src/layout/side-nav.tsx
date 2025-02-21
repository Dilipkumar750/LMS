// import React, { useState, useRef } from "react";
// import { useSelector } from "react-redux";
// import { NavLink, useLocation } from "react-router-dom";
// import {
//   FaTachometerAlt,
//   FaCogs,
//   FaUsers,
//   FaBox,
//   FaLayerGroup,
//   FaMoneyBillAlt,
//   FaComment,
//   FaRegLightbulb,
//   FaFileAlt,
//   FaUserGraduate,
// } from "react-icons/fa";
// import logo from "../Assets/logo.webp.png"
// interface SideNavProps {
//   sidebarOpen: boolean;
//   setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   variant?: "default" | "v2" | "v3";
// }

// export const SideBar: React.FC<SideNavProps> = ({
//   sidebarOpen,
//   setSidebarOpen,
//   variant = "default",
// }) => {
//   const location = useLocation();
//   const { pathname } = location;

//   const trigger = useRef(null);
//   const sidebar = useRef(null);

//   const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
//   const [sidebarExpanded, setSidebarExpanded] = useState(
//     storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
//   );

//   const { isAuthenticated, isPageLoaded, currentUser } = useSelector(
//     (state: {
//       userAuth: { isAuthenticated: boolean; isPageLoaded: boolean, currentUser: any };
//     }) => state.userAuth
//   );
// // console.log(currentUser,'kytdytd')
//   return (
//     <div className="min-w-fit">
//       {/* Sidebar backdrop (mobile only) */}
//       <div
//         className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//           }`}
//         aria-hidden="true"
//       ></div>

//       {/* Sidebar */}
//       <div
//         id="sidebar"
//         ref={sidebar}
//         className={`flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-gray-100 dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"
//           } ${variant === "v2"
//             ? "border-r border-gray-200 dark:border-gray-700/60"
//             : "rounded-r-2xl shadow-sm"
//           }`}
//       >
//         {/* Sidebar header */}
//         <div className="flex justify-between mb-10 pr-3 sm:px-2">
//           {/* Close button */}
//           <button
//             ref={trigger}
//             className="lg:hidden text-gray-500 hover:text-gray-400"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             aria-controls="sidebar"
//             aria-expanded={sidebarOpen}
//           >
//             <span className="sr-only">Close sidebar</span>
//             <FaTachometerAlt className="w-6 h-6" />
//           </button>
//           {/* Logo */}
//           <NavLink end to="/" className="block">
//             <img src={logo} alt="" />
//           </NavLink>
//         </div>

//         <div className="space-y-8">
//           <div>
//             <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
//               <span
//                 className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
//                 aria-hidden="true"
//               >
//                 •••
//               </span>
//               <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
//                 Pages
//               </span>
//             </h3>
//             <ul className="mt-3">
//               <li
//                 className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 ${pathname === "/home/dashboard"
//                   ? "bg-violet-500 text-white"
//                   : "text-gray-800 dark:text-gray-100 hover:bg-violet-500 hover:text-white"
//                   }`}
//               >
//                 <NavLink
//                   end
//                   to="/home/dashboard"
//                   className="block truncate transition duration-150"
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="grow flex items-center">
//                       <FaTachometerAlt className="shrink-0 text-gray-400 dark:text-gray-500" />
//                       <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
//                         Dashboard
//                       </span>
//                     </div>
//                   </div>
//                 </NavLink>
//               </li>
//               <li

//                 className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 ${pathname === "/home/all-employee"
//                   ? "bg-violet-500 text-white"
//                   : "hover:bg-violet-500 hover:text-white"
//                   }`}
//               >
//                 <NavLink
//                   to="/home/all-employee"
//                   className="flex items-center transition"
//                 >
//                   <FaBox className="shrink-0 text-gray-400 dark:text-gray-500" />
//                   <span className="ml-4 text-sm font-medium">All Employee</span>
//                 </NavLink>
//               </li>
//               <li
//                 className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 ${pathname === "/home/attendance-page"
//                   ? "bg-violet-500 text-white"
//                   : "hover:bg-violet-500 hover:text-white"
//                   }`}
//               >
//                 <NavLink
//                   to="/home/attendance-page"
//                   className="flex items-center transition"
//                 >
//                   <FaBox className="shrink-0 text-gray-400 dark:text-gray-500" />
//                   <span className="ml-4 text-sm font-medium">Attendance</span>
//                 </NavLink>
//               </li>
//               <li
//                 className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 ${pathname === "/home/leave-calendar"
//                   ? "bg-violet-500 text-white"
//                   : "hover:bg-violet-500 hover:text-white"
//                   }`}
//               >
//                 <NavLink
//                   to="/home/leave-calendar"
//                   className="flex items-center transition"
//                 >
//                   <FaLayerGroup className="shrink-0 text-gray-400 dark:text-gray-500" />
//                   <span className="ml-4 text-sm font-medium">Leave Calender</span>
//                 </NavLink>
//               </li>
//               <li
//                 className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 ${pathname === "/home/pay-report"
//                   ? "bg-violet-500 text-white"
//                   : "hover:bg-violet-500 hover:text-white"
//                   }`}
//               >
//                 <NavLink
//                   to="/home/pay-report"
//                   className="flex items-center transition"
//                 >
//                   <FaLayerGroup className="shrink-0 text-gray-400 dark:text-gray-500" />
//                   <span className="ml-4 text-sm font-medium">Pay Report</span>
//                 </NavLink>
//               </li>

//               <li
//                 className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 ${pathname === "/home/announcement"
//                   ? "bg-violet-500 text-white"
//                   : "hover:bg-violet-500 hover:text-white"
//                   }`}
//               >
//                 <NavLink
//                   to="/home/announcement"
//                   className="flex items-center transition"
//                 >
//                   <FaLayerGroup className="shrink-0 text-gray-400 dark:text-gray-500" />
//                   <span className="ml-4 text-sm font-medium">Announcement</span>
//                 </NavLink>
//               </li>
//               <li
//                 className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 ${pathname === "/home/company-policy"
//                   ? "bg-violet-500 text-white"
//                   : "hover:bg-violet-500 hover:text-white"
//                   }`}
//               >
//                 <NavLink
//                   to="/home/company-policy"
//                   className="flex items-center transition"
//                 >
//                   <FaUsers className="shrink-0 text-gray-400 dark:text-gray-500" />
//                   <span className="ml-4 text-sm font-medium">Company Policy</span>
//                 </NavLink>
//               </li>
//               <li
//                 className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 ${pathname === "home/profile"
//                   ? "bg-violet-500 text-white"
//                   : "hover:bg-violet-500 hover:text-white"
//                   }`}
//               >
//                 <NavLink
//                   to="/home/profile"
//                   className="flex items-center transition"
//                 >
//                   <FaUsers className="shrink-0 text-gray-400 dark:text-gray-500" />
//                   <span className="ml-4 text-sm font-medium">Profile</span>
//                 </NavLink>
//               </li>
//               <li
//                 className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 ${pathname === "/home/personal-details"
//                   ? "bg-violet-500 text-white"
//                   : "hover:bg-violet-500 hover:text-white"
//                   }`}
//               >
//                 <NavLink
//                   to="/home/personal-details"
//                   className="flex items-center transition"
//                 >
//                   <FaBox className="shrink-0 text-gray-400 dark:text-gray-500" />
//                   <span className="ml-4 text-sm font-medium">Personal details</span>
//                 </NavLink>
//               </li>
//               <li
//                 className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 ${pathname === "/home/leave-form"
//                   ? "bg-violet-500 text-white"
//                   : "hover:bg-violet-500 hover:text-white"
//                   }`}
//               >
//                 <NavLink
//                   to="/home/leave-form"
//                   className="flex items-center transition"
//                 >
//                   <FaMoneyBillAlt className="shrink-0 text-gray-400 dark:text-gray-500" />
//                   <span className="ml-4 text-sm font-medium">Apply Leave</span>
//                 </NavLink>
//               </li>
//               <li
//                 className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 ${pathname === "/home/payslip-generator"
//                   ? "bg-violet-500 text-white"
//                   : "hover:bg-violet-500 hover:text-white"
//                   }`}
//               >
//                 <NavLink
//                   to="/home/payslip-generator"
//                   className="flex items-center transition"
//                 >
//                   <FaComment className="shrink-0 text-gray-400 dark:text-gray-500" />
//                   <span className="ml-4 text-sm font-medium">Payroll details</span>
//                 </NavLink>
//               </li>
//               <li
//                 className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 ${pathname === "/home/request-leave"
//                   ? "bg-violet-500 text-white"
//                   : "hover:bg-violet-500 hover:text-white"
//                   }`}
//               >
//                 <NavLink
//                   to="/home/request-leave"
//                   className="flex items-center transition"
//                 >
//                   <FaLayerGroup className="shrink-0 text-gray-400 dark:text-gray-500" />
//                   <span className="ml-4 text-sm font-medium">Request Leaves</span>
//                 </NavLink>
//               </li>
//               {/* <li
//                 className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 ${pathname === "/home/payslip"
//                   ? "bg-violet-500 text-white"
//                   : "hover:bg-violet-500 hover:text-white"
//                   }`}
//               >
//                 <NavLink
//                   to="/home/payslip"
//                   className="flex items-center transition"
//                 >
//                   <FaComment className="shrink-0 text-gray-400 dark:text-gray-500" />
//                   <span className="ml-4 text-sm font-medium">Payslip </span>
//                 </NavLink>
//               </li> */}
//             </ul>
//           </div>
//         </div>

//         {/* Expand / collapse button */}
//         <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
//           <div className="w-12 pl-4 pr-3 py-2">
//             <button
//               className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
//               onClick={() => setSidebarExpanded(!sidebarExpanded)}
//             >
//               <span className="sr-only">Expand / collapse sidebar</span>
//               <FaCogs className="shrink-0 text-gray-400 dark:text-gray-500 sidebar-expanded:rotate-180" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };



import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBox,
  FaLayerGroup,
  FaMoneyBillAlt,
  FaComment,
} from "react-icons/fa";
import logo from "../Assets/logo.webp";

interface SideNavProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  variant?: "default" | "v2" | "v3";
}

export const SideBar: React.FC<SideNavProps> = ({ sidebarOpen, setSidebarOpen, variant = "default" }) => {
  const location = useLocation();
  const { pathname } = location;
  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  const {  currentUser } = useSelector(
    (state: { userAuth: { isAuthenticated: boolean; currentUser: any } }) => state.userAuth
  );
  // console.log(currentUser.user.role);
  const userRole = currentUser?.user.role || "employee"; // Default role is employee
  // console.log(userRole);

  const adminMenu = [
    { path: "/home/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/home/all-employee", label: "All Employee", icon: <FaUsers /> },
    { path: "/home/attendance-page", label: "Attendance", icon: <FaBox /> },
    { path: "/home/leave-calendar", label: "Leave Calendar", icon: <FaLayerGroup /> },
    { path: "/home/pay-report", label: "Pay Report", icon: <FaLayerGroup /> },
    { path: "/home/announcement", label: "Announcement", icon: <FaLayerGroup /> },
    { path: "/home/company-policy", label: "Company Policy", icon: <FaUsers /> },
    { path: "/home/payslip-generator", label: "Payroll Details", icon: <FaComment /> },
    { path: "/home/request-leave", label: "Request Leaves", icon: <FaLayerGroup /> },
  ];

  const employeeMenu = [
    { path: "/home/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/home/leave-calendar", label: "Leave Calendar", icon: <FaLayerGroup /> },
    // { path: "/home/company-policy", label: "Company Policy", icon: <FaUsers /> },
    { path: "/home/profile", label: "Profile", icon: <FaUsers /> },
    { path: "/home/personal-details", label: "Personal Details", icon: <FaBox /> },
    { path: "/home/leave-form", label: "Apply Leave", icon: <FaMoneyBillAlt /> },
    { path: "/home/Course", label: "Courses", icon: <FaMoneyBillAlt /> },
    { path: "/home/TaskAllocation", label: "Task Allocation", icon: <FaMoneyBillAlt /> },
  ];

  const menuItems = userRole === "Admin" ? adminMenu : employeeMenu;

  return (
    <div className="min-w-fit">
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:translate-x-0 h-[100dvh] overflow-y-scroll no-scrollbar w-64 lg:w-cover lg:sidebar-expanded:!w-64 bg-gray-100 dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } ${variant === "v2" ? "border-r border-gray-200 dark:border-gray-700/60" : "rounded-r-2xl shadow-sm"}`}
      >
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <FaTachometerAlt className="w-6 h-6" />
          </button>
          <NavLink end to="/" className="block">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
            </h3>
            <ul className="mt-3">
              {menuItems.map((item) => (
                <li
                  key={item.path}
                  className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 ${
                    pathname === item.path
                      ? "bg-violet-500 text-white"
                      : "text-gray-800 dark:text-gray-100 hover:bg-violet-500 hover:text-white"
                  }`}
                >
                  <NavLink to={item.path} className="flex items-center transition">
                    <span className="shrink-0 text-gray-400 dark:text-gray-500">{item.icon}</span>
                    <span className="ml-4 text-sm font-medium">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="w-12 pl-4 pr-3 py-2">
            <button
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
            >
              <span className="sr-only">Expand / collapse sidebar</span>
              <FaBox className="shrink-0 text-gray-400 dark:text-gray-500 sidebar-expanded:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};