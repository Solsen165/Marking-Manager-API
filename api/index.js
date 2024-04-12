const app = require('express')();
const cors = require('cors');
const fs = require('fs');
const PORT = 5000;
const dao = require('./dataAccess');

app.use(cors());

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(
    PORT,
    () => console.log('its working on localhost:8080')
)
app.get('/test', (req,res) => {
    res.status(200).send({
        msg: 'Hello'
    })
});

app.get('/read', (req,res) => {
    res.status(200).send(readText());
})

app.get('/students',(req,res) => {
    res.send(dao.loadStudents())
})

app.get('/students/:id',(req,res) => {
    const student = dao.getStudentWithId(req.params.id);
    if (student == null) {
        res.status(404).send(null);
    }
    else {
        res.send(student);
    }
})

function readText() {
    let content = '';
    content = fs.readFileSync(process.cwd() + '/api/text.txt','utf-8');
    return content;
}

module.exports = app;