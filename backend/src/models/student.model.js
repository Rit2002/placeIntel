const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },

    branch: {
        type: String,
        required: true
    },

    year: {
        type: String,
        required: true
    }
}, { timestamps : true });

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;