import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import announcementImage from "../../Assets/announcement.png";
import attendance from "../../Assets/attendance.png";
import cake from "../../Assets/cake.png";
import profile from "../../Assets/unnamed.png";
import vision from "../../Assets/visionmission.png";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaRegEnvelope } from "react-icons/fa";
import logo from "../../Assets/logo.webp.png";
import report from "../../Assets/report.jpeg";
import { environment } from "../../environments/environment";


export const HRMDashboard: React.FC = () => {
  const announcements = [
    {
      title: "Company Town Hall",
      description: "Join the town hall meeting on Jan 30th at 3 PM to discuss company updates.",
    },
    {
      title: "Performance Reviews",
      description: "Submit your performance reviews to the HR portal by Feb 15th.",
    },
    {
      title: "Health Insurance Updates",
      description: "New health insurance policy details are available. Check the HR portal for more info.",
    },
  ];

  // const selectorData = useSelector((state)=> state.currentUser);

  const [currentTime, setCurrentTime] = useState(new Date());
  // const [selectedDate, setSelectedDate] = useState(new Date());  // As of now, this is disabled.
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const [checkInMessage, setCheckInMessage] = useState<string | null>(null);
  const [checkOutMessage, setCheckOutMessage] = useState<string | null>(null);

  const {  currentUser } = useSelector(
    (state: { userAuth: { isAuthenticated: boolean; currentUser: any } }) => state.userAuth
  );

  const employee_id = currentUser.user.employee_id;
  // Handle Check In
  const handleCheckIn = () => {

    // if (checkInTime) {
    //   setCheckInMessage("You have already checked in today.");
    //   console.log(checkInTime);
    // } else {
    //   const checkIn = new Date().toLocaleTimeString();
    //   setCheckInTime(checkIn); // Set the current time when the check-in button is clicked
    //   setCheckInMessage(null); // Reset the message
    //   const env = environment.apiPort

    //   axios({method: 'POST', url: `${environment.apiPort}/api/attendance/create`, data: {checkIn: checkIn}});
    // }
    if (checkInTime) {
      setCheckInMessage("You have already checked in today.");
    } else {
      const checkIn = new Date().toLocaleTimeString();
      setCheckInTime(checkIn)
      setCheckInMessage(null);
      // console.log(checkIn);
      // console.log(typeof checkIn);

      // setCheckInTime(checkIn);

      console.log(checkInTime);
      axios.post(`${environment.apiPort}/attendance/mark-check-in`, { data: checkInTime, employee_id })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error checking in:", error);
        });
    }
  };

  // Handle Check Out
  const handleCheckOut = () => {
    if (checkOutTime) {
      setCheckOutMessage("You have already checked out today.");
    } else {
      const checkOut = new Date().toLocaleTimeString();
      setCheckOutTime(checkOut); // Set the current time when the check-out button is clicked
      setCheckOutMessage(null); // Reset the message
      axios.patch(`${environment.apiPort}/attendance/mark-check-out`, { data: checkOutTime, employee_id })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {  
          console.error("Error checking in:", error);
        });
    }
  };

  // Update the current date and time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [checkInTime, checkOutTime]);

  return (
    <div className="w-full h-full bg-gray-100 p-5 font-sans">
      <h1 className="text-center text-2xl font-bold mb-5">LMS Dashboard</h1>

      {/* Layout for the dashboard */}
      <div className="flex flex-col gap-5">
        {/* Row 1: Announcements and Attendance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {/* Box 1: HR Announcements */}
          <div className="bg-white p-5 shadow-lg rounded-lg flex flex-col md:flex-row h-72 hover:border-b-4 border-violet-500 transition-all duration-300 ease-in-out">
            <div className="flex flex-col w-full md:w-1/2 p-5 overflow-hidden border border-gray-300 rounded-lg">
              <h2 className="font-bold text-xl mb-3   text-primaryBlue">Announcements</h2>
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                className="h-full"
              >
                {announcements.map((announcement, index) => (
                  <SwiperSlide key={index} className="flex flex-col justify-start items-start h-full">
                    <div className="border-b border-gray-300 mb-2 pb-2">
                      <h3 className="font-bold text-lg text-black">{announcement.title}</h3>
                    </div>
                    <p className="text-md text-gray-600 max-h-20 overflow-hidden whitespace-nowrap text-ellipsis">
                      {announcement.description}
                    </p>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <img
                src={announcementImage}
                alt="Announcement"
                className="h-full w-auto object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Box 2: Attendance */}
          <div className="bg-white p-5 shadow-lg rounded-xl text-center text-lg h-72 flex flex-col justify-center items-center hover:border-b-4 border-violet-500 transition-all duration-300 ease-in-out">
            <h2 className="font-bold text-xl mb-3  text-primaryBlue">Attendance</h2>
            <div className="flex items-center justify-center flex-col sm:flex-row gap-4">
              <div>
                <img
                  src={attendance}
                  alt="Attendance"
                  className="w-60 h-40 rounded-md"
                />
              </div>
              <div>
                <p className="text-gray-700 text-lg mb-5">
                  {currentTime.toLocaleDateString()} - {currentTime.toLocaleTimeString()}
                </p>
                <div className="flex gap-5">
                  <button
                    type="button"
                    // onClick={handleCheckIn}
                    onClick={() => handleCheckIn()}
                    className="bg-blue-500 text-white py-2 px-6 rounded-lg text-base h-10 w-40 hover:bg-blue-700 transition duration-300"
                  >
                    Check In
                  </button>
                  <button
                    type="button"
                    onClick={handleCheckOut}
                    className="bg-red-500 text-white py-2 px-6 rounded-lg text-base h-10 w-40 hover:bg-red-700 transition duration-300"
                  >
                    Check Out
                  </button>
                </div>

                {/* Display the clicked time */}
                {checkInTime && (
                  <p className="text-blue-500 mt-3">Checked In at: {checkInTime}</p>
                )}
                {checkOutTime && (
                  <p className="text-red-500 mt-3">Checked Out at: {checkOutTime}</p>
                )}

                {/* Display messages if already checked in or checked out */}
                {checkInMessage && (
                  <div className="flex items-center text-black mt-3">
                    <FaRegEnvelope className="mr-2 text-violet-600" />
                    <p>{checkInMessage}</p>
                  </div>
                )}
                {checkOutMessage && (
                  <div className="flex items-center text-black mt-3">
                    <FaRegEnvelope className="mr-2" />
                    <p>{checkOutMessage}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Row 2: Calendar, Reporting Managers, and Birthdays */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {/* Box 3: Monthly Calendar */}
          <div className="bg-white p-5 shadow-lg rounded-lg text-center text-lg h-[430px] hover:border-b-4 border-violet-500 transition-all duration-300 ease-in-out">
            <h2 className="font-bold text-xl mb-3  text-primaryBlue">Calendar</h2>
            <Calendar
              className="w-full"
              // value={selectedDate}
              tileClassName={({ date, view }) => {
                if (view === "month") {
                  const day = date.getDay();
                  if (day === 0) return "text-red-500 font-bold"; // Sunday
                  if (day === 6) return "text-orange-500 font-bold"; // Saturday
                }
                return "text-gray-800"; // Other days
              }}
            />
          </div>

          {/* Box 4: Today's Birthdays & Anniversaries */}
          {/* <div className="bg-white p-5 shadow-lg rounded-lg text-center text-lg h-[430px] hover:border-b-4 border-violet-500 transition-all duration-300 ease-in-out">
            <h2 className="font-bold text-xl mb-3  text-primaryBlue">Today's Birthdays & Anniversaries</h2>
            <ul className="text-left list-disc pl-5">
              <li className="flex items-center mb-3">
                <img src={profile} alt="John Doe" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <span className="text-sm text-black font-bold">Birthday:</span>
                  <br />
                  <span className="text-sm text-black">John Doe - Sales Department</span>
                </div>
              </li>
              <hr />
              <li className="flex items-center mb-3">
                <img src={profile} alt="Jane Smith" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <span className="text-sm text-black font-bold">Birthday:</span>
                  <br />
                  <span className="text-sm text-black">Jane Smith - Marketing Department</span>
                </div>
              </li>
              <hr />
              <li className="flex items-center mb-3">
                <img src={profile} alt="Mike Johnson" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <span className="text-sm text-black font-bold">Anniversary:</span>
                  <br />
                  <span className="text-sm text-black">Mike Johnson - HR Department</span>
                </div>
              </li>
              <hr />
            </ul>
            <div className="flex justify-center mt-4">
              <img src={cake} alt="Cake" className="w-28 h-28" />
            </div>
          </div> */}

          {/* Box 5: Reporting Manager */}
          <div className="bg-white p-5 shadow-lg rounded-lg text-center text-lg h-[430px] hover:border-b-4 border-violet-500 transition-all duration-300 ease-in-out relative">
            <h2 className="font-bold text-xl mb-5  text-primaryBlue">Reporting Faculty</h2>
            <div className="flex items-center justify-center mb-5">
              {/* Image Section */}
              <img
                src={profile}
                alt="Mike Johnson"
                className="w-20 h-20 rounded-full mr-5 shadow-md"
              />
              {/* Details Section */}
              <div className="text-left">
                <p className="text-lg font-bold text-black">Mike Johnson</p>
                <p className="text-sm text-gray-600">Science Department</p>
              </div>
            </div>
            {/* Centered Bottom Image */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <img src={report} alt="Report Icon" className="w-80 h-40" />
            </div>
          </div>

        </div>

        {/* Row 3: Company Address */}
     
          {/* Left Section: Vision & Mission */}
          <div className="bg-white p-5 shadow-lg rounded-lg text-center text-lg h-full hover:border-b-4 border-violet-500 transition-all duration-300 ease-in-out">
            <h2 className="font-bold text-xl mb-3 text-blue-600">Vision & Mission</h2>
            <div className="flex flex-col md:flex-row items-center justify-start gap-4">
              <p className="text-black text-sm mb-2 w-full md:w-1/2 font-bold justify-start">
                To be the leading provider of innovative solutions that transform businesses globally.
              </p>
              <img src={vision} alt="Vision" className="w-full md:w-1/2 h-auto" />
              <p className="text-black text-sm w-full md:w-1/2 font-bold justify-start">
                Deliver high-quality products and services that empower our customers to thrive in a competitive digital landscape.
              </p>
            </div>
          </div>


          
           

      </div>
    </div>
  );
};