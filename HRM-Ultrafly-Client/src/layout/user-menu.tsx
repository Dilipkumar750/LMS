// import React, { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import logo from "../Assets/logo.webp.png";
// import axios from 'axios'; // Import axios
// import { logoutSession } from '../store/sessionUserReducer';
// import Transition from './utils/transition';
// import { environment } from '../environments/environment';

// interface DropdownProfileProps {
//   align?: "left" | "right";
// }

// const DropdownProfile: React.FC<DropdownProfileProps> = ({
//   align = "left",
// }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [userData, setUserData] = useState<any>(null); // State to store user data
//   const trigger = useRef<HTMLButtonElement>(null);
//   const dropdown = useRef<HTMLDivElement>(null);

//   const dispatch = useDispatch();

//   // Fetch employee data on component mount
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`${environment.apiPort}/employees/get-employee-profile`); // Replace with your API endpoint
//         setUserData(response.data); // Assuming response contains user data (name, email, role, etc.)
//         // console.log(response)
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   // Close dropdown on click outside
//   useEffect(() => {
//     const clickHandler = ({ target }: MouseEvent) => {
//       if (!dropdown.current || !trigger.current) return;
//       if (
//         !dropdownOpen ||
//         dropdown.current.contains(target as Node) ||
//         trigger.current.contains(target as Node)
//       )
//         return;
//       setDropdownOpen(false);
//     };
//     document.addEventListener("click", clickHandler);
//     return () => document.removeEventListener("click", clickHandler);
//   }, [dropdownOpen]);

//   // Close if the esc key is pressed
//   useEffect(() => {
//     const keyHandler = ({ keyCode }: KeyboardEvent) => {
//       if (!dropdownOpen || keyCode !== 27) return;
//       setDropdownOpen(false);
//     };
//     document.addEventListener("keydown", keyHandler);
//     return () => document.removeEventListener("keydown", keyHandler);
//   }, [dropdownOpen]);

//   // Handle sign-out action
//   const handleLogout = () => {
//     dispatch(logoutSession() as any); // Dispatch logout action
//   };

//   return (
//     <div className="relative inline-flex ">
//       <button
//         ref={trigger}
//         className="inline-flex justify-center items-center group no-hover"
//         aria-haspopup="true"
//         onClick={() => setDropdownOpen(!dropdownOpen)}
//         aria-expanded={dropdownOpen}
//       >
//         <img
//           className="w-8 h-8 rounded-full"
//           src={logo}
//           width="32"
//           height="32"
//           alt="User"
//         />
//         <div className="flex items-center truncate">
//           <span className="truncate ml-2 text-sm font-medium text-gray-600 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-white">
//             {userData?.name || "Loading..."}
//           </span>
//           <svg
//             className="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500"
//             viewBox="0 0 12 12"
//           >
//             <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
//           </svg>
//         </div>
//       </button>

//       <Transition
//         className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 ${
//           align === "right" ? "right-0" : "left-0"
//         }`}
//         show={dropdownOpen}
//         enter="transition ease-out duration-200 transform"
//         enterStart="opacity-0 -translate-y-2"
//         enterEnd="opacity-100 translate-y-0"
//         leave="transition ease-out duration-200"
//         leaveStart="opacity-100"
//         leaveEnd="opacity-0"
//       >
//         <div
//           ref={dropdown}
//           onFocus={() => setDropdownOpen(true)}
//           onBlur={() => setDropdownOpen(false)}
//         >
//           <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200 dark:border-gray-700/60">

//            <div className="font-medium text-gray-800 dark:text-gray-100">
//               Role: {userData?.role || "N/A"}
//             </div>
//           <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200 dark:border-gray-700/60">
//             <div className="font-medium text-gray-800 dark:text-gray-100">
//               {userData?.name || "Loading..."}
//             </div>
//           </div>
//           </div>

//           <ul>
//             <li>
//               <Link
//                 className="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3"
//                 to="/home/profile"
//               >
//                 Profile
//               </Link>
//             </li>
//             <li>
//               <Link
//                 className="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3"
//                 to="/login"
//                 onClick={() => handleLogout()}
//               >
//                 Sign Out
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </Transition>
//     </div>
//   );
// };

// export default DropdownProfile;


import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from "../Assets/logo.webp.png";
import axios from 'axios';
import { logoutSession } from '../store/sessionUserReducer';
import Transition from './utils/transition';
import { environment } from '../environments/environment';

interface DropdownProfileProps {
  align?: "left" | "right";
}

const DropdownProfile: React.FC<DropdownProfileProps> = ({ align = "left" }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);
  const [displayName, setDisplayName] = useState("loading..");
  const [displayDesignation, setDisplayDesignation] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.userAuth.currentUser.user);

  // Determine displayName and displayRole based on currentUser data.
  useEffect(() => {
    setDisplayName(currentUser.name);
    setDisplayDesignation(currentUser.designation);

  }, [currentUser, displayName, displayDesignation, userData]);

  // Optionally fetch additional employee profile data if needed
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${environment.apiPort}/employees/get-employee-profile`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current || !trigger.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setDropdownOpen(false);
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  // Close dropdown on esc key press
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };

    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen]);

  // Handle sign-out action
  const handleLogout = () => {
    dispatch(logoutSession() as any);
  };

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group no-hover"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <img
          className="w-8 h-8 rounded-full"
          src={logo}
          width="32"
          height="32"
          alt="User"
        />
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium text-gray-600 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-white">
            {displayName}
          </span>
          <svg
            className="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 ${align === "right" ? "right-0" : "left-0"
          }`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
            <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200 dark:border-gray-700/60">
              <div className="font-medium hover:text-hoverEffectBlue text-primaryBlue dark:text-gray-100">
              {displayName}
              </div>
            </div>
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200 dark:border-gray-700/60">
            <div className="font-medium hover:text-hoverEffectBlue text-primaryBlue dark:text-gray-100">
                 {displayDesignation || "N/A"}
            </div>
          </div>
          <ul>
            <li>
              <Link
                className="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3"
                to="/home/profile"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3"
                to="/login"
                onClick={handleLogout}
              >
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
};

export default DropdownProfile;
