// Subject class
class Course {
    constructor(id, name, credits) {
        this.id = id;
        this.name = name;
        this.credits = credits;
    }
}

// Teacher class
class Teacher {
    constructor(id,name, department, courses) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.courses = courses;
    }
}

// Student class
class Student {
    constructor(id, name, courses, marks) {
        this.id = id;
        this.name = name;
        this.courses = courses;
        this.marks = marks;
    }

    addMark(subject, mark) {
        this.subjects[subject.name] = mark;
    }
}

module.exports = {
    Student: Student,
    Teacher: Teacher,
    Course: Course
}