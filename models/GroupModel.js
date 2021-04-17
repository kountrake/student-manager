const mongoose = require('mongoose');
const dbConnection = require('../controllers/dbConnection');

const student = require('./StudentModel')

// definition of schema for students
const groupsSchema = new mongoose.Schema({
    number : {
        type: "Number",
        required: true
    },
    student : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }
});

const Group = dbConnection.model('Group', groupsSchema, 'group');
module.exports.model = Group;
