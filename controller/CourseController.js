const Course = require('../model/CourseSchema');

const saveCourse = (req, res) => {
    const tempCourse = new Course({
        courseCode: req.body.courseCode,
        courseName: req.body.courseName,
        courseStartDate: req.body.courseStartDate,
        courseEndDate: req.body.courseEndDate,
        courseFee: req.body.courseFee,
        courseDescription: req.body.courseDescription,
        courseActiveState: true
    });
    tempCourse.save().then(result => {
        res.status(201).json({status: true, message: "Course Saved Successfully"});
    }).catch(error => {
        res.status(500).json(error);
    });
};

const findCourse = (req, res) => {
    Course.findOne({ courseCode: req.params.courseCode }).then(result => {
        if (result == null) {
            res.status(404).json({ status: false, message: "Course Not Found" });
        } else {
            res.status(200).json({ status: true, data: result });
        }
    }).catch(error => {
        res.status(500).json(error);
    });
};


const updateCourse = (req, res) => {
    Course.updateOne({courseCode: req.params.courseCode}, {
        $set: {
            courseName: req.body.courseName,
            courseStartDate: req.body.courseStartDate,
            courseEndDate: req.body.courseEndDate,
            courseFee: req.body.courseFee,
            courseDescription: req.body.courseDescription,
        }
    }).then(result => {
        if (result.modifiedCount > 0) {
            res.status(201).json({status: true, message: "Course Updated Successfully"});
        } else {
            res.status(200).json({status: false, message: 'Try Again'});
        }
    }).catch(error => {
        res.status(500).json(error);
    });
};

const deleteCourse = (req, res) => {
    Course.deleteOne({courseCode: req.params.courseCode }).then(result => {
        if (result.deletedCount > 0) {
            res.status(204).json({status: false, message: "Course Deleted Successfully"});
        } else {
            res.status(400).json({status: true, message: 'Try Again'});
        }
    }).catch(error => {
        res.status(500).json(error);
    });
};

const getAllCourses = (req, res) => {
    Course.find().then(result => {
        res.status(200).json({status: true, data: result});
    }).catch(error => {
        res.status(500).json(error);
    });
};


module.exports={
    saveCourse,
    findCourse,
    updateCourse,
    deleteCourse,
    getAllCourses
}