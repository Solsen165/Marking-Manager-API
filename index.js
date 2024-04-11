const app = require('express')();
const fs = require('fs');
const PORT = 8080;


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


function readText() {
    let content = '';
    content = fs.readFileSync('text.txt','utf-8');
    return content;
}