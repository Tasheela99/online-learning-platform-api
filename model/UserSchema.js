const mongoose = require('mongoose');
const roles = ['ADMIN', 'USER']
const UserSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    mobile: {type: Number, required: true},
    role: {type: String, enum: roles, default: 'USER'},
});

module.exports = mongoose.model('User', UserSchema);
