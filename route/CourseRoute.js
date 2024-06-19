const express = require('express');
const CourseController = require('../controller/CourseController');
const verifyToken = require('../util/middleware/AuthMiddleware');
const router = express.Router();

router.post('/save',  CourseController.saveCourse);
router.get('/find/:courseCode', CourseController.findCourse);
router.put('/update/:courseCode', CourseController.updateCourse);
router.delete('/delete/:courseCode', CourseController.deleteCourse);
router.get('/get-all', CourseController.getAllCourses);

module.exports = router;