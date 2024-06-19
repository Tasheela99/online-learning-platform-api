const User = require('../model/UserSchema');
const Course = require('../model/CourseSchema');
const CourseEnrolment = require('../model/CourseEnrolmentSchema');
const jwt = require('jsonwebtoken');


const enrolUserInCourse = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.slice(7);

    try {
        const decodedData = await jwt.verify(token, process.env.SECRET_KEY);
        const userEmail = decodedData.email;
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const courseId = req.params._id;
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const courseEnrolment = new CourseEnrolment({
            user: user._id, // Saving user ID
            course: course._id, // Saving course ID
            enrolledState: false
        });

        await courseEnrolment.save();
        res.status(200).json({ status: true, message: "User enrolled in the course successfully" });
    } catch (err) {
        res.status(500).json({ status: false, error: err.message });
    }
};


const getUserEnrolledCourses = async (req, res) => {
    const token = req.headers.authorization.slice(7);
    if (!token) {
        return res.status(401).json({message: "No token provided"});
    }
    try {
        const decodedData = await jwt.verify(token, process.env.SECRET_KEY);
        const userEmail = decodedData.email;
        const user = await User.findOne({email: userEmail});

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        const enrolledCourses = await CourseEnrolment.find({user: user._id, enrolledState: true})
            .populate({
                path: 'course',
                select: 'courseName courseCode courseDescription courseFee courseStartDate courseEndDate'
            })
            .exec();
        res.status(200).json({status: true, data: enrolledCourses});
    } catch (err) {
        res.status(500).json({status: false, error: err.message});
    }
};


const removeCourseEnrolment = (req, res) => {
    CourseEnrolment.deleteOne({id: req.params._id}).then(result => {
        if (result.deletedCount > 0) {
            res.status(204).json({status: false, message: "Course Enrolment Deleted Successfully"});
        } else {
            res.status(400).json({status: true, message: 'Try Again'});
        }
    }).catch(error => {
        res.status(500).json(error);
    });
};

const getAllCourseEnrollments = (req, res) => {
    CourseEnrolment.find()
        .populate({
            path: 'user',
            select: 'userName email mobile'
        })
        .populate({
            path: 'course',
            select: 'courseName courseDescription courseFee'
        })
        .exec()
        .then(result => {
            res.status(200).json({status: true, data: result});
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

const changeEnrollmentState = (req, res) => {
    const enrollmentId = req.params._id;
    const enrolledState = req.body.enrolledState;

    if (typeof enrolledState === 'undefined') {
        return res.status(400).json({status: false, message: "Enrolled state is required"});
    }
    CourseEnrolment.updateOne({_id: enrollmentId}, {
        $set: {
            enrolledState: enrolledState,
        }
    }).then(result => {
        if (result.modifiedCount > 0) {
            res.status(201).json({status: true, message: "Enrolled State Updated Successfully"});
        } else {
            res.status(200).json({status: false, message: 'Try Again'});
        }
    }).catch(error => {
        res.status(500).json({status: false, error: error.message});
    });
};



module.exports = {
    enrolUserInCourse,
    getUserEnrolledCourses,
    removeCourseEnrolment,
    getAllCourseEnrollments,
    changeEnrollmentState
}