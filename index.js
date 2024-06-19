const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const swaggerSpecs = require('./util/config/SwaggerConfig');
const swaggerUi = require('swagger-ui-express');

const port = process.env.SERVER_PORT || 3001;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const courseRoute = require('./route/CourseRoute');
const userRoute = require('./route/UserRoute');
const courseEnrolRoute = require('./route/CourseEnrolmentRoute');
const UserController = require('./controller/UserController');

app.use((req, res, next) => {
    res.header('Access-Control-Expose-Headers', 'Authorization');
    next();
});

mongoose.connect('mongodb://127.0.0.1:27017/learning_platform').then(async () => {
    await UserController.initializeAdmin();
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
});

app.use('/api/v1/courses', courseRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/enrolments', courseEnrolRoute);
