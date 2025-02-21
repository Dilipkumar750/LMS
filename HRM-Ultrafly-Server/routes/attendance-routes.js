import express from "express";
// import {
//   markCheckIn,
//   markCheckOut,
//   getprofile,
//   getUserAttendance,
//   getTodayAttendance,
//   deleteAttendance,
//   getLastWeekAttendance,
//   getLastMonthAttendance,
//   getTotalDaysPresent,
//   getAttendanceByName,
//   getRangeSelectedAttendance,
// } from "../controllers/attendance.controller.js";
import {protect} from '../middlewares/auth.middleware.js';
import {markCheckIn, markCheckOut, getTodayAttendance, getMonthlyAttendance} from "../controllers/attendance.controller.js";
const router = express.Router();

// Attendance routes
router.post('/mark-check-in',markCheckIn);
router.patch('/mark-check-out',markCheckOut);
router.get('/get-today-attendance',getTodayAttendance);
router.get('/get-monthly-attendance',getMonthlyAttendance);
// router.post("/create",protect, markAttendance);
// router.put("/attendance-update", updateDepartureTime);
// router.get("/get-all-user", getprofile);
// router.get("/get-user-attendance/:emailId", getUserAttendance);
// router.get("/get-today-attendance", getTodayAttendance);
// router.get("/get-last-week-attendance", getLastWeekAttendance);
// router.get("/get-last-month-attendance", getLastMonthAttendance);
// router.post("/get-attendanceByName", getAttendanceByName);
// router.post("/get-rangeSelected-attendance", getRangeSelectedAttendance);
// router.get("/get-month-attendance",getTotalDaysPresent);

// General attendance routes
// router.delete("/:id", deleteAttendance);

export default router;
