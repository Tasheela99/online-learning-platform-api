const express = require('express');
const UserController = require('../controller/UserController');
const router = express.Router();

router.post('/register', UserController.signUp);
router.post('/login', UserController.signIn);
router.put('/update/:id', UserController.updateUser);
router.get('/get-all', UserController.getAllUsers);
router.get('/find/:email', UserController.findUser);
router.delete('/delete/:id', UserController.deleteUser);

module.exports = router;