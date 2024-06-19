const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
    courseCode:{type:String,required: true,unique:true},
    courseName:{type:String,required: true,unique:true},
    courseStartDate:{type:String,required: true},
    courseEndDate:{type:String,required: true},
    courseFee:{type:Number,required: true},
    courseDescription:{type:String,required: true},
    courseActiveState:{type:Boolean,required: true}
});

module.exports = mongoose.model('Course',CourseSchema);
