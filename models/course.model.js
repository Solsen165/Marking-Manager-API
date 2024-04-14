const mongoose = require('mongoose');

const courseSchema = mongoose.Schema(
    {
        id: {type: Number, required: true},
        name: {type: String, required: true},
        credits: {type: Number, required: true}
    }
)

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;