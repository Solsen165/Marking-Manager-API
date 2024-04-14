const fs = require("fs");
const models = require('./classes')

function loadCourses() {
    let courses = [];
    const lines = fs.readFileSync(process.cwd() + '/api/data/courses.txt','utf-8').split('\n');
    for (let i in lines) {
        if (lines[i].length > 1) {
            const words = lines[i].split(',');
            courses.push(new models.Course(words[0],words[1],words[2]));
        }
    }
    return courses;
}
function getCourseWithId(id) {
    let courses = loadCourses();
    return courses.find(c => c.id == id);
}
function writeCourses(courses) {
    let string = '';
    for (let i in courses) {
        string += `${courses[i].id},${courses[i].name},${courses[i].credits}\n`
    }
    fs.writeFileSync(process.cwd() + '/api/data/courses.txt',string);
}

function loadStudents() {
    let students = [];
    const lines = fs.readFileSync(process.cwd() + '/api/data/students.txt','utf-8').split('\n');
    for (let i in lines) {
        if (lines[i].length > 1) {
            // Student: id,name,subject1|subject2,mark1|mark2
            const words = lines[i].split(',');
            const courseIds = words[2].split('|');
            let courses = [];
            for (let j in courseIds) {
                courses.push(getCourseWithId(courseIds[j]));
            }
            let marks = words[3].split('|');

            students.push(new models.Student(words[0],words[1],courses,marks));
        }
    }
    return students;
}

function writeStudents(students) {
    let string = '';
    for (let i in students) {
        const curr = students[i];
        let coursesString = '';
        for (let j in curr.courses) {
            coursesString += `${curr.courses[j].id}|`;
        }
        coursesString = coursesString.substring(0,coursesString.length-1);

        let marksString = '';
        for (let j in curr.marks) {
            marksString += `${curr.marks[j]}|`;
        }
        marksString = marksString.substring(0,marksString.length-1);

        string += `${curr.id},${curr.name},${coursesString},${marksString}\n`;
    }
    fs.writeFileSync(process.cwd() + '/api/data/students.txt',string);
}

function writeTeachers(teachers) {
    let string = '';
    for (let i in teachers) {
        const curr = teachers[i];
        let coursesString = '';
        for (let j in curr.courses) {
            coursesString += `${curr.courses[j].id}|`;
        }
        coursesString = coursesString.substring(0,coursesString.length-1);

        string += `${curr.id},${curr.name},${coursesString}\n`;
    }
    fs.writeFileSync(process.cwd() + '/api/data/teachers.txt',string);
}

function getStudentWithId(id) {
    return loadStudents().find(s => s.id == id);
}

function loadTeachers() {
    let teachers = [];
    const lines = fs.readFileSync(process.cwd() + '/api/data/teachers.txt','utf-8').split('\n');
    for (let i in lines) {
        if (lines[i].length > 1) {
            const words = lines[i].split(',');
            const courseIds = words[2].split('|');
            let courses = [];
            for (let j in courseIds) {
                courses.push(getCourseWithId(courseIds[j]));
            }
            teachers.push(new models.Teacher(words[0],words[1],courses));
        }
    }
    return teachers;
}

function getTeacherWithId(id) {
    return loadTeachers().find(t => t.id == id);
}

module.exports = {
    loadCourses,
    loadStudents,
    loadTeachers,
    getStudentWithId,
    getTeacherWithId,
    writeCourses,
    writeStudents,
    writeTeachers
}