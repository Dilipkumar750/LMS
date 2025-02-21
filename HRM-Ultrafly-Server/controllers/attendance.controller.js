import Attendance from "../models/Attendance.js";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import { DateTime } from "luxon";
import dns from "dns";

// // Create attendance with arrival time
// export const createAttendance = asyncHandler(async (req, res) => {


//   const { checkIn, employee_id } = req.body;
//   console.log(checkIn)
//   try {
//     const existingRecord = await Attendance.findOne({ employee_id, date: new Date().setHours(0,0,0,0) });
//     if (existingRecord) {
//       return res.status(400).json({ message: "Already checked in today" });
//     }

//     const attendance = new Attendance({ employee_id, date: new Date(), checkIn: new Date() });
//     await attendance.save();
//     res.status(201).json({ message: "Checked in successfully", attendance });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Update departure time
// export const updateDepartureTime = asyncHandler(async (req, res) => {
//   const now = new Date();
//   const currentHour = now.getHours();
//   const currentMinute = now.getMinutes();

//   const startOfDay = new Date(now.setHours(0, 0, 0, 0));
//   const endOfDay = new Date(now.setHours(23, 59, 59, 999));

//   const targetHour = 19;
//   const targetMinute = 30;
//   const isAfterTargetTime =
//     currentHour > targetHour ||
//     (currentHour === targetHour && currentMinute >= targetMinute);

//   const { emailId, remarks } = req.body;

//   try {
//     const existingRecord = await Attendance.findOne({
//       emailId,
//       createdAt: { $gte: startOfDay, $lt: endOfDay },
//     });

//     if (!existingRecord) {
//       return res.status(404).json({
//         success: false,
//         message: "Attendance record not found for today",
//       });
//     }

//     if (existingRecord.departureDate) {
//       return res.status(400).json({
//         success: false,
//         message: "Departure time already updated",
//       });
//     }

//     if (isAfterTargetTime || (remarks && existingRecord.status)) {
//       existingRecord.departureDate = new Date();
//       if (remarks) existingRecord.remarks = remarks;
//       await existingRecord.save();
//       return res.json({
//         success: true,
//         message: "Departure updated successfully",
//         data: existingRecord,
//       });
//     }

//     if (!remarks) {
//       return res.status(400).json({ success: false, message: "Please provide remarks" });
//     }

//     existingRecord.remarks = remarks;
//     await existingRecord.save();
//     return res.json({
//       success: true,
//       message: "Remarks updated, waiting for admin approval",
//       data: existingRecord,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });

// // Admin approval for departure
// export const approveDeparture = asyncHandler(async (req, res) => {
//   const { _id, approve } = req.body;

//   try {
//     const existingRecord = await Attendance.findById(_id);

//     if (!existingRecord) {
//       return res.status(404).json({
//         success: false,
//         message: "Attendance record not found",
//       });
//     }

//     existingRecord.status = approve;
//     await existingRecord.save();

//     return res.json({
//       success: true,
//       message: approve ? "Departure approved" : "Departure rejected",
//       data: existingRecord,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });

// // Get attendance for a specific user today
// export const getUserAttendance = asyncHandler(async (req, res) => {
//   const { emailId } = req.params;

//   const today = new Date();
//   const startOfDay = new Date(today.setHours(0, 0, 0, 0));
//   const endOfDay = new Date(today.setHours(23, 59, 59, 999));

//   try {
//     const record = await Attendance.findOne({
//       emailId,
//       createdAt: { $gte: startOfDay, $lt: endOfDay },
//     });

//     if (record) {
//       return res.json({ success: true, data: record });
//     } else {
//       return res.status(404).json({
//         success: false,
//         message: "No attendance record found for today",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });

// // Get attendance by name for today
// export const getAttendanceByName = asyncHandler(async (req, res) => {
//   const { name } = req.body;

//   const today = new Date();
//   const startOfDay = new Date(today.setHours(0, 0, 0, 0));
//   const endOfDay = new Date(today.setHours(23, 59, 59, 999));

//   try {
//     const record = await Attendance.findOne({
//       name,
//       createdAt: { $gte: startOfDay, $lt: endOfDay },
//     });

//     if (record) {
//       return res.json({ success: true, data: record });
//     } else {
//       return res.status(404).json({
//         success: false,
//         message: "No attendance record found for today",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });

// // Delete attendance record
// export const deleteAttendance = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   try {
//     const attendance = await Attendance.findByIdAndDelete(id);

//     if (!attendance) {
//       return res.status(404).json({
//         success: false,
//         message: "Attendance record not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Attendance record deleted successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });

// // Get all attendance records
// export const getprofile = asyncHandler(async (req, res) => {
//   try {
//     const records = await Attendance.find().sort({ arrivalDate: -1 });
//     return res.json({ success: true, data: records });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });

// // Get attendance records in a date range
// export const getRangeSelectedAttendance = asyncHandler(async (req, res) => {
//   const { fromDate, toDate } = req.body;

//   const start = new Date(fromDate).setHours(0, 0, 0, 0);
//   const end = new Date(toDate).setHours(23, 59, 59, 999);

//   try {
//     const records = await Attendance.find({
//       createdAt: { $gte: start, $lte: end },
//     });

//     return res.json({ success: true, data: records });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });

// export const getTotalDaysPresent = asyncHandler ( async (req,res) => {
//   const {employee_id, month, year} = req.body;
//   try {
//     const totalDays = await Attendance.countDocuments({
//       employee_id,
//       isPresent: true,
//       date: {
//         $gte: new Date(year, month - 1, 1), // Start of the month
//         $lte: new Date(year, month, 0), // End of the month
//       },
//     });

//     return totalDays;
//   } catch (error) {
//     console.error("Error calculating total days present:", error);
//     return 0;
//   }
// });

// // Get attendance records for the last month
// export const getLastMonthAttendance = asyncHandler(async (req, res) => {
//   const today = new Date();

//   // Get the first day of the last month
//   const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

//   // Get the last day of the last month
//   const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

//   try {
//     // Query attendance records for the last month
//     const records = await Attendance.find({
//       createdAt: { $gte: firstDayOfLastMonth, $lt: lastDayOfLastMonth },
//     }).sort({ createdAt: -1 }); // Sort records by createdAt in descending order

//     if (records.length > 0) {
//       return res.json({ success: true, data: records });
//     } else {
//       return res.status(404).json({
//         success: false,
//         message: "No attendance records found for the last month",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });
// // Get attendance records for the last week
// export const getLastWeekAttendance = asyncHandler(async (req, res) => {
//   const today = new Date();

//   // Get the date 7 days ago from today
//   const lastWeekStartDate = new Date(today);
//   lastWeekStartDate.setDate(today.getDate() - 7);

//   try {
//     // Query attendance records for the last week
//     const records = await Attendance.find({
//       createdAt: { $gte: lastWeekStartDate, $lt: today },
//     }).sort({ createdAt: -1 }); // Sort records by createdAt in descending order

//     if (records.length > 0) {
//       return res.json({ success: true, data: records });
//     } else {
//       return res.status(404).json({
//         success: false,
//         message: "No attendance records found for the last week",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });
// // Get today's attendance records
// export const getTodayAttendance = asyncHandler(async (req, res) => {
//   const today = new Date();
//   const startOfDay = new Date(today.setHours(0, 0, 0, 0));  // Start of today (00:00:00)
//   const endOfDay = new Date(today.setHours(23, 59, 59, 999));  // End of today (23:59:59)

//   try {
//     // Query attendance records for today
//     const records = await Attendance.find({
//       createdAt: { $gte: startOfDay, $lt: endOfDay },
//     }).sort({ createdAt: -1 }); // Sort records by createdAt in descending order

//     if (records.length > 0) {
//       return res.json({ success: true, data: records });
//     } else {
//       return res.status(404).json({
//         success: false,
//         message: "No attendance records found for today",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });


export async function markCheckIn(req, res) {
  try {
    const { employee_id } = req.body;

    // Get today's date in ISO format (YYYY-MM-DD)
    const today = DateTime.now().toISODate();

    // Check if employee has already checked in today
    const existingAttendance = await Attendance.findOne({
      employee_id,
      date: today,
    });

    if (existingAttendance) {
      return res.status(400).json({ message: "Already checked in today!" });
    }

    // Record check-in
    const attendance = new Attendance({
      employee_id,
      date: today,
      checkIn: DateTime.now().toJSDate(),
    });

    await attendance.save();
    // const userDetails =await User.findOne({employee_id})
    const attendanceData = await Attendance.aggregate([
      {
        $lookup:{
          from:"User",
          localField:"employee_id",
          foreignField:"employee_id",
          as:"employeeDetails",
        }
      },
      {
        $unwind:"$employeeDetails",
      },
      {
        $project:{
          _id:1,
          employee_id:1,
          date:1,
          checkIn:1,
          checkOut:1,
          totalHours:1,
          isPresent:1,
          "employeeDetails.name":1,
          "employeeDetails.email":1,
          "employeeDetails.department":1,
          "employeeDetails.designation":1
        }
      }
    ])

    res.status(201).json({ message: "Check-in successful", attendanceData });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

export async function markCheckOut(req, res) {
  // console.log("reached-markcheckout")
  try {
    const { employee_id } = req.body;
    const today = DateTime.now().toISODate();

    const attendance = await Attendance.findOne({
      employee_id,
      date: today,
    });

    if (!attendance) {
      return res.status(404).json({ message: "No check-in found for today" });
    }

    if (attendance.checkOut) {
      return res.status(400).json({ message: "Already checked out!" });
    }

    // Calculate total hours worked
    const checkOutTime = DateTime.now();
    const checkInTime = DateTime.fromJSDate(attendance.checkIn);
    const totalHours = checkOutTime.diff(checkInTime, "hours").hours;

    attendance.checkOut = checkOutTime.toJSDate();
    attendance.totalHours = totalHours;

    await attendance.save();
  
    res.status(200).json({ message: "Check-out successful", attendance });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};


export async function getTodayAttendance(req, res) {
  try {
    const todayStart = DateTime.now().startOf("day").toJSDate(); // Start of today
    const todayEnd = DateTime.now().endOf("day").toJSDate(); // End of today

    const attendanceData = await Attendance.aggregate([
      {
        $match: {
          date: { $gte: todayStart, $lte: todayEnd }, // Matches today's attendance
        },
      },
      {
        $lookup: {
          from: "users", // Change collection name to lowercase and plural
          localField: "employee_id",
          foreignField: "employee_id",
          as: "employeeDetails",
        },
      },
      { $unwind: "$employeeDetails" },
      {
        $project: {
          _id: 1,
          employee_id: 1,
          date: 1,
          checkIn: 1,
          checkOut: 1,
          totalHours: 1,
          isPresent: 1,
          "employeeDetails.name": 1,
          "employeeDetails.email": 1,
          "employeeDetails.department": 1,
          "employeeDetails.designation": 1,
        },
      },
    ]);

    res.status(200).json(attendanceData);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
}


export async function getMonthlyAttendance(req, res){
  try {
    const { employee_id, month, year } = req.query;

    if (!employee_id || !month || !year) {
      return res.status(400).json({ message: "Employee ID, month, and year are required!" });
    }
    const startOfMonth = DateTime.fromObject({ year, month }).startOf("month").toISODate();
    const endOfMonth = DateTime.fromObject({ year, month }).endOf("month").toISODate();

    const attendanceRecords = await Attendance.find({
      employee_id,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};