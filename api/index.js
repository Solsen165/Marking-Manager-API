const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const PORT = 5000;
const dao = require('./dataAccess');
const models = require('./classes')

app.use(cors());
//app.use(express.json());
//app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(
    PORT,
    () => console.log('its working on localhost:8080')
)
app.get('/test', (req, res) => {
    res.status(200).send({
        msg: 'Hello'
    })
});

app.get('/read', (req, res) => {
    res.status(200).send(readText());
})

app.get('/students', (req, res) => {
    res.send(dao.loadStudents())
})

app.get('/students/:id', (req, res) => {
    const student = dao.getStudentWithId(req.params.id);
    if (student == null) {
        res.status(404).send(null);
    }
    else {
        res.send(student);
    }
})
app.post('/students', (req, res) => {
    console.log(req.body);
    let students = dao.loadStudents();
    const courses = dao.loadCourses();
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


    let newStudent = new models.Student(
        students.length + 1,
        req.body.studentName,
        currCourses,
        currMarks
    );
    students.push(newStudent);
    dao.writeStudents(students);
    res.status(200).send(newStudent);
})

app.get('/courses', (req, res) => {
    res.send(dao.loadCourses());
})

app.post('/courses', (req, res) => {
    console.log(req.body);
    console.log(req.body.courseTitle);
    let courses = dao.loadCourses();
    let newCourse = new models.Course(courses.length + 1, req.body.courseTitle, req.body.courseCredits);
    courses.push(newCourse);
    dao.writeCourses(courses);
    res.status(200).send(newCourse)
})
function readText() {
    let content = '';
    content = fs.readFileSync(process.cwd() + '/api/text.txt', 'utf-8');
    return content;
}

module.exports = app;