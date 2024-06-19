const User = require('../model/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Course = require("../model/CourseSchema");

const initializeAdmin = async () => {
    try {
        const adminEmail = "tasheelajay1999@gmail.com";
        const adminPassword = "admin123";
        const existingAdmin = await User.findOne({email: adminEmail});
        if (existingAdmin) {
            return;
        }
        bcrypt.hash(adminPassword, 10, function (err, hash) {
            if (err) {
                console.log("SOMETHING WENT WRONG")
            }
            const adminUser = new User({
                userName: "Tasheela Jayawickrama",
                email: adminEmail,
                password: hash,
                mobile: 766308272,
                role: "ADMIN"
            });
            adminUser.save().then(() => {
            })
        });
    } catch (error) {
        console.error('Error initializing admin:', error);
    }
};


const signUp = async (req, res) => {
    User.findOne({email: req.body.email}).then(async result => {
        if (result == null) {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    return res.status(500).json({message: 'SOMETHING WENT WRONG'})
                }
                const user = new User({
                    userName: req.body.userName,
                    email: req.body.email,
                    password: hash,
                    mobile: req.body.mobile,
                    role: "USER"
                });
                user.save().then(() => {
                    res.status(201).json({status: true, message: 'USER SAVED SUCCESSFULLY'});
                }).catch((error) => {
                    res.status(500).json({message: 'FAILED TO SAVE USER', error: error});
                });
            });
        } else {
            res.status(409).json({status: false, message: 'EMAIL ALREADY EXISTS'})
        }
    }).catch((error) => {
        res.status(500).json(error);
    })
}
const signIn = async (req, res) => {
    try {
        const selectedUser = await User.findOne({email: req.body.email});

        if (!selectedUser) {
            return res.status(404).json({status: false, message: 'USERNAME NOT FOUND'});
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, selectedUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({status: false, message: "INCORRECT PASSWORD"});
        }

        const token = jwt.sign(
            {email: selectedUser.email, role: selectedUser.role},
            process.env.SECRET_KEY,
            {expiresIn: 7200}
        );
        res.setHeader('Authorization', `Bearer ${token}`);

        return res.status(200).json({status: true, message: "USER LOGIN SUCCESSFULLY", token});

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
}


const updateUser = (req, res) => {
    User.updateOne({id: req.params._id}, {
        $set: {
            userName: req.body.userName,
            mobile: req.body.mobile
        }
    }).then(result => {
        if (result.modifiedCount > 0) {
            res.status(201).json({status: true, message: "User Updated Successfully"});
        } else {
            res.status(200).json({status: false, message: 'Try Again'});
        }
    }).catch(error => {
        res.status(500).json(error);
    });
};

const deleteUser = (req, res) => {
    User.deleteOne({id: req.params._id}).then(result => {
        if (result.deletedCount > 0) {
            res.status(204).json({status: false, message: "User Deleted Successfully"});
        } else {
            res.status(400).json({status: true, message: 'Try Again'});
        }
    }).catch(error => {
        res.status(500).json(error);
    });
};

const getAllUsers = (req, res) => {
    User.find().then(result => {
        res.status(200).json({status: true, data: result});
    }).catch(error => {
        res.status(500).json(error);
    });
};

const findUser = (req, res) => {
    User.findOne({email: req.params.email}).then(result => {
        if (result == null) {
            res.status(404).json({status: false, message: "User Not Found"});
        } else {
            res.status(200).json({status: true, data: result});
        }
    }).catch(error => {
        res.status(500).json(error);
    });
};


module.exports = {
    initializeAdmin, signUp, signIn, updateUser, deleteUser, getAllUsers, findUser
}