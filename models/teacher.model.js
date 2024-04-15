const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema(
    {
        id: {type: Number},
        name: {type: String},
        courses: {type: Array},
        percents: {type: Array}
    }
)

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;