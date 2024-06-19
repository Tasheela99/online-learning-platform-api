const express = require('express');
const CourseController = require('../controller/CourseController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: API endpoints for managing courses.
 */

/**
 * @swagger
 * /api/v1/courses/save:
 *   post:
 *     summary: Save a new course
 *     description: Save a new course to the platform.
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseCode:
 *                 type: string
 *               courseName:
 *                 type: string
 *               courseStartDate:
 *                 type: string
 *                 format: date
 *               courseEndDate:
 *                 type: string
 *                 format: date
 *               courseFee:
 *                 type: number
 *               courseDescription:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course saved successfully.
 *       500:
 *         description: Internal server error.
 */
router.post('/save', CourseController.saveCourse);

/**
 * @swagger
 * /api/v1/courses/find/{courseCode}:
 *   get:
 *     summary: Find a course by course code
 *     description: Retrieve a specific course by its course code.
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: courseCode
 *         required: true
 *         schema:
 *           type: string
 *         description: The course code
 *     responses:
 *       200:
 *         description: Course details.
 *       404:
 *         description: Course not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/find/:courseCode', CourseController.findCourse);

/**
 * @swagger
 * /api/v1/courses/update/{courseCode}:
 *   put:
 *     summary: Update a course
 *     description: Update an existing course's details.
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: courseCode
 *         required: true
 *         schema:
 *           type: string
 *         description: The course code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseName:
 *                 type: string
 *               courseStartDate:
 *                 type: string
 *                 format: date
 *               courseEndDate:
 *                 type: string
 *                 format: date
 *               courseFee:
 *                 type: number
 *               courseDescription:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course updated successfully.
 *       200:
 *         description: Course update failed. (Not necessarily an error, depends on your logic)
 *       500:
 *         description: Internal server error.
 */
router.put('/update/:courseCode', CourseController.updateCourse);

/**
 * @swagger
 * /api/v1/courses/delete/{courseCode}:
 *   delete:
 *     summary: Delete a course
 *     description: Delete a specific course by its course code.
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: courseCode
 *         required: true
 *         schema:
 *           type: string
 *         description: The course code
 *     responses:
 *       204:
 *         description: Course deleted successfully.
 *       400:
 *         description: Course deletion failed. (Not necessarily an error, depends on your logic)
 *       500:
 *         description: Internal server error.
 */
router.delete('/delete/:courseCode', CourseController.deleteCourse);

/**
 * @swagger
 * /api/v1/courses/get-all:
 *   get:
 *     summary: Retrieve all courses
 *     description: Retrieve a list of all courses available on the platform.
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: A list of all courses.
 *       500:
 *         description: Internal server error.
 */
router.get('/get-all', CourseController.getAllCourses);

module.exports = router;
