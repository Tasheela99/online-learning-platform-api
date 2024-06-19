const express = require('express');
const CourseEnrolmentController = require('../controller/CourseEnrolmentController');
const router = express.Router();

router.post('/enrol-course/:_id', CourseEnrolmentController.enrolUserInCourse);
router.get('/get-enrol-courses', CourseEnrolmentController.getUserEnrolledCourses);
router.get('/get-all-enrol-courses', CourseEnrolmentController.getAllCourseEnrollments);
router.delete('/delete/:id', CourseEnrolmentController.removeCourseEnrolment);
router.put('/change-state/:_id', CourseEnrolmentController.changeEnrollmentState);

module.exports = router;