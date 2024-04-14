const mongoose = require('mongoose');

const studentSchema = mongoose.Schema(
    {
        id: {type: Number, required: true},
        name: {type: String, required: true},
        courses: {type: Array},
        marks: {type: Array}
    }
)

const Student = mongoose.model('Student',studentSchema);

module.exports = Student;