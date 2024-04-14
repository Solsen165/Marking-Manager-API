const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const fs = require('fs');
const PORT = 3000;
const dao = require('./dataAccess');
//const models = require('./classes')
const Student = require('../models/student.model');
const Course = require('../models/course.model');
const Teacher = require('../models/teacher.model');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("Api is working"));

app.listen(
    PORT,
    () => console.log(`its working on localhost:${PORT}`)
)

mongoose.connect('mongodb://islammohsen165:fju0p4VSRLPMMROr@ac-9vgkcqy-shard-00-00.zz3opfg.mongodb.net:27017,ac-9vgkcqy-shard-00-01.zz3opfg.mongodb.net:27017,ac-9vgkcqy-shard-00-02.zz3opfg.mongodb.net:27017/?ssl=true&replicaSet=atlas-tpyi7n-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0')
    .then(() => { console.log("Connected to database!") })
    .catch((err) => console.log('Connection failed', err));

app.get('/test', (req, res) => {
    res.status(200).send({
        msg: 'Hello'
    })
});

app.get('/read', (req, res) => {
    res.status(200).send(readText());
})

app.get('/students', async (req, res) => {
    //res.send(dao.loadStudents());
    const students = await Student.find({});
    res.status(200).json(students);
})

app.get('/teachers', async (req, res) => {
    //res.send(dao.loadTeachers());
    const teachers = await Teacher.find({});
    res.status(200).json(teachers);
})

app.get('/students/:id', async (req, res) => {
    //const student = dao.getStudentWithId(req.params.id);
    const student = await Student.find({ id: req.params.id });
    if (student == null) {
        res.status(404).send(null);
    }
    else {
        res.json(student[0]);
    }
})

app.get('/teachers/:id', async (req, res) => {
    //const teacher = dao.getTeacherWithId(req.params.id);
    const teacher = await Teacher.find({ id: req.params.id });
    if (teacher == null) {
        res.status(404).send(null);
    }
    else {
        res.json(teacher[0]);
    }
})

app.post('/teachers', async (req, res) => {

    //let teachers = dao.loadTeachers();
    //const courses = dao.loadCourses();
    let teachers = await Teacher.find({});
    const courses = await Course.find({});

    const courseIds = req.body.teacherCourses.split('|');
    let currCourses = [];

    for (let i in courses) {
        for (let j in courseIds) {
            if (courses[i].id == courseIds[j]) {
                currCourses.push(courses[i]);
            }
        }
    }

    /*
    let newTeacher = new models.Teacher(
        teachers.length + 1,
        req.body.teacherName,
        currCourses
    );
    teachers.push(newTeacher);
    dao.writeTeachers(teachers);
    */
    const newTeacher = await Teacher.create({
        id: teachers.length + 1,
        name: req.body.teacherName,
        courses: currCourses
    });
    res.status(200).json(newTeacher);
})

app.post('/students', async (req, res) => {
    console.log(req.body);
    //let students = dao.loadStudents();
    //const courses = dao.loadCourses();
    let students = await Student.find({});
    const courses = await Course.find({});
    const courseIds = req.body.studentCourses.split('|');
    let currCourses = [];

    for (let i in courses) {
        for (let j in courseIds) {
            if (courses[i].id == courseIds[j]) {
                currCourses.push(courses[i]);
            }
        }
    }

    let currMarks = Array(currCourses.length).fill(null);

    /*
    let newStudent = new models.Student(
        students.length + 1,
        req.body.studentName,
        currCourses,
        currMarks
    );
    students.push(newStudent);
    dao.writeStudents(students);
    */
    const newStudent = await Student.create({
        id: students.length + 1,
        name: req.body.studentName,
        courses: currCourses,
        marks: currMarks
    })

    res.status(200).json(newStudent);
})

app.post('/students/all', async (req, res) => {
    const data = req.body;
    //dao.writeStudents(data);
    for (let i in data) {
        const currStudent = data[i];
        await Student.findOneAndUpdate({id: currStudent.id}, {marks: currStudent.marks});
    }
    res.status(200).send();
})

app.get('/courses', async (req, res) => {
    //res.send(dao.loadCourses());
    const courses = await Course.find({});
    res.status(200).json(courses);
})

app.post('/courses', async (req, res) => {
    /*
    console.log(req.body);
    console.log(req.body.courseTitle);
    let courses = dao.loadCourses();
    let newCourse = new models.Course(courses.length + 1, req.body.courseTitle, req.body.courseCredits);
    courses.push(newCourse);
    dao.writeCourses(courses);
    res.status(200).send(newCourse)
    */
    let courses = await Course.find({});
    const newCourse = await Course.create({
        id: courses.length + 1,
        name: req.body.courseTitle,
        credits: req.body.courseCredits
    });

    res.status(200).send(newCourse);
})

function readText() {
    let content = '';
    content = fs.readFileSync(process.cwd() + '/api/text.txt', 'utf-8');
    return content;
}

module.exports = app;