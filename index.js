const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const port = process.env.SERVER_PORT || 3001;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const courseRoute = require('./route/CourseRoute');
const userRoute = require('./route/UserRoute');
const courseEnrolRoute = require('./route/CourseEnrolmentRoute');


const UserController = require('./controller/UserController');
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Expose-Headers', 'Authorization');
    next();
})
mongoose.connect('mongodb://127.0.0.1:27017/learning_platform').then(async () => {
    await UserController.initializeAdmin(null, null);
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
});

app.use('/api/v1/courses', courseRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/enrolments', courseEnrolRoute)