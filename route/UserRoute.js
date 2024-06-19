const express = require('express');
const UserController = require('../controller/UserController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users.
 */

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the platform.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               mobile:
 *                 type: number
 *             required:
 *               - userName
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       409:
 *         description: Email already exists.
 *       500:
 *         description: Internal server error.
 */
router.post('/register', UserController.signUp);

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: User login
 *     description: Login to the platform with registered credentials.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       401:
 *         description: Incorrect password.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', UserController.signIn);

/**
 * @swagger
 * /api/v1/users/update/{id}:
 *   put:
 *     summary: Update user details
 *     description: Update an existing user's details.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               mobile:
 *                 type: number
 *     responses:
 *       201:
 *         description: User updated successfully.
 *       200:
 *         description: User update failed. (Not necessarily an error, depends on your logic)
 *       500:
 *         description: Internal server error.
 */
router.put('/update/:id', UserController.updateUser);

/**
 * @swagger
 * /api/v1/users/delete/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by their ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       204:
 *         description: User deleted successfully.
 *       400:
 *         description: User deletion failed. (Not necessarily an error, depends on your logic)
 *       500:
 *         description: Internal server error.
 */
router.delete('/delete/:id', UserController.deleteUser);

/**
 * @swagger
 * /api/v1/users/get-all:
 *   get:
 *     summary: Retrieve all users
 *     description: Retrieve a list of all users registered on the platform.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of all users.
 *       500:
 *         description: Internal server error.
 */
router.get('/get-all', UserController.getAllUsers);

/**
 * @swagger
 * /api/v1/users/find/{email}:
 *   get:
 *     summary: Find a user by email
 *     description: Retrieve a specific user by their email address.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's email address
 *     responses:
 *       200:
 *         description: User details.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/find/:email', UserController.findUser);

module.exports = router;
