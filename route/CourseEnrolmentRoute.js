const express = require('express');
const CourseEnrolmentController = require('../controller/CourseEnrolmentController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Course Enrollments
 *   description: API endpoints for managing course enrollments.
 */

/**
 * @swagger
 * /api/v1/course-enrollments/enrol-course/{_id}:
 *   post:
 *     summary: Enrol user in a course
 *     description: Enrol a user in a specific course.
 *     tags: [Course Enrollments]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to enrol in
 *     responses:
 *       200:
 *         description: User enrolled in the course successfully.
 *       401:
 *         description: Unauthorized - No token provided or invalid token.
 *       404:
 *         description: User or course not found.
 *       500:
 *         description: Internal server error.
 */
router.post('/enrol-course/:_id', CourseEnrolmentController.enrolUserInCourse);

/**
 * @swagger
 * /api/v1/course-enrollments/get-enrol-courses:
 *   get:
 *     summary: Get courses enrolled by user
 *     description: Retrieve courses that a user is currently enrolled in.
 *     tags: [Course Enrollments]
 *     responses:
 *       200:
 *         description: A list of enrolled courses.
 *       401:
 *         description: Unauthorized - No token provided or invalid token.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/get-enrol-courses', CourseEnrolmentController.getUserEnrolledCourses);

/**
 * @swagger
 * /api/v1/course-enrollments/get-all-enrol-courses:
 *   get:
 *     summary: Get all course enrollments
 *     description: Retrieve all course enrollments with user and course details.
 *     tags: [Course Enrollments]
 *     responses:
 *       200:
 *         description: A list of all course enrollments.
 *       500:
 *         description: Internal server error.
 */
router.get('/get-all-enrol-courses', CourseEnrolmentController.getAllCourseEnrollments);

/**
 * @swagger
 * /api/v1/course-enrollments/delete/{id}:
 *   delete:
 *     summary: Delete a course enrolment
 *     description: Delete a course enrolment by its ID.
 *     tags: [Course Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course enrolment to delete
 *     responses:
 *       204:
 *         description: Course enrolment deleted successfully.
 *       400:
 *         description: Course enrolment deletion failed.
 *       500:
 *         description: Internal server error.
 */
router.delete('/delete/:id', CourseEnrolmentController.removeCourseEnrolment);

/**
 * @swagger
 * /api/v1/course-enrollments/change-state/{_id}:
 *   put:
 *     summary: Change course enrolment state
 *     description: Update the enrolled state of a course enrolment.
 *     tags: [Course Enrollments]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course enrolment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               enrolledState:
 *                 type: boolean
 *                 description: The new enrolled state (true/false)
 *             required:
 *               - enrolledState
 *     responses:
 *       201:
 *         description: Course enrolment state updated successfully.
 *       200:
 *         description: Course enrolment state update failed.
 *       400:
 *         description: Bad request - Enrolled state is required.
 *       500:
 *         description: Internal server error.
 */
router.put('/change-state/:_id', CourseEnrolmentController.changeEnrollmentState);

module.exports = router;
