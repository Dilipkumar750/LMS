import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../auth/login";
import { Spin } from "../common-components/spin";
import { initSession } from "../store/sessionUserReducer";
import { PrivateRoute } from "./private-route";
import { HRMDashboard } from "../admin/home/Dasboard";
import Signup from "../auth/signup";
import LeaveForm from "../admin/home/Leave folder/leaveform";
import RequestLeave from "../admin/home/RequestLeave";

import { CompanyPolicy } from "../admin/home/companyPolicy";
import { Announcement } from "../admin/sub-category/all-sub-category";
import PayrollPage from "../admin/home/payReport";
import AllEmployees from "../admin/home/allemployee";
import AttendancePage from "../admin/home/attendance";
import PersonalDetails from "../admin/home/EmployeeDetails/personaldetails";
import {PayslipGenerator} from "../admin/home/payslipGenerator";
import Profile from "../admin/home/profile";
import LeaveCalendar from "../admin/home/Leave-calendar";
import { PayslipTemplate } from "../admin/home/PayslipTemplate";

export const AppRouter: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isPageLoaded } = useSelector(
    (state: {
      userAuth: { isAuthenticated: boolean; isPageLoaded: boolean };
    }) => state.userAuth
  );
// console.log(currentUser)
  // console.log(`authenticated:${isAuthenticated}`)
  useEffect(() => {
    dispatch(initSession() as any);
  }, [dispatch]);

  if (!isPageLoaded) {
    return (
      <div className="loader">
        <Spin />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home/dashboard" /> : <Login />
          }
        />

        {/* <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/home/dashboard" /> : <Login />
          }
        /> */}
        <Route
          path="/home"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="dashboard" element={<HRMDashboard />} />
          <Route path="all-employee" element={<AllEmployees />} />
          <Route path="attendance-page" element={<AttendancePage />} />  
          <Route path="leave-calendar" element={<LeaveCalendar />} />
          <Route path="pay-report" element={<PayrollPage />} />
          <Route path="announcement" element={<Announcement />} />
          <Route path="company-policy" element={<CompanyPolicy />} />
          <Route path="profile" element={<Profile />} />
          <Route path="personal-details" element={<PersonalDetails />} />
          <Route path="request-leave" element={<RequestLeave />} />
          <Route path="payslip-generator" element={<PayslipGenerator />} />
          <Route path="payslip-template" element={<PayslipTemplate />} />
          <Route path="leave-form" element={<LeaveForm />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};