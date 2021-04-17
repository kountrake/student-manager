const mongoose = require('mongoose');
const dbConnection = require('../controllers/dbConnection');

// definition of schema for students
const studentSchema = new mongoose.Schema({
    lastname : {
        type : String,
        trim: true,
        uppercase: true,
        required: true
    },
    firstnames : {
        type: String,
        trim: true
    },
    number : {
        type: String,
        trim: true,
        unique: true,
        required: true
    }
});

var handleE11000 = function(error, res, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'));
    } else {
        next();
    }
};

studentSchema.post('save', handleE11000);
studentSchema.post('update', handleE11000);
studentSchema.post('findOneAndUpdate', handleE11000);
studentSchema.post('insertMany', handleE11000);

const Student = dbConnection.model('Student', studentSchema, 'student');
module.exports.model = Student;
