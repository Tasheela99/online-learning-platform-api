const mongoose = require('mongoose');
const CourseEnrolmentSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true},
    enrolledDate:{type: Date, default: Date.now},
    enrolledState:{type: Boolean},
});

module.exports = mongoose.model('CourseEnrolment', CourseEnrolmentSchema);