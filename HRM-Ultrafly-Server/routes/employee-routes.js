import { Router } from 'express';
import { getEmployees, createEmployee, activateEmail , getEmployeeProfile ,uploadMultipleFiles, updateEmployeeProfileDetails,deleteEmployee} from '../controllers/employee.controller.js';
// import upload from '../middlewares/upload.middleware.js';
import { protect } from '../middlewares/auth.middleware.js';
const router = Router();

router.post('/create', protect,createEmployee);
router.get('/get', protect, getEmployees);
router.get('/get-employee-profile',protect, getEmployeeProfile);
// router.post('/update-employee-profile-details',protect,upload.array('files',8),uploadMultipleFiles);
router.patch('/delete-employee',protect,deleteEmployee);
router.put('/activate-email',protect, activateEmail);

export default router;
