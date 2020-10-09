const express = require("express");
const path = require("path");
const fs = require("fs")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"))


function readJSON(){
    let dbData = fs.readFileSync(path.join(__dirname, "/db/db.json"), "utf8");
    return JSON.parse(dbData);
}

// Get route to the index.html
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

// Get route to the notes.html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

// ------------------------------------------------------------------------

// Get request to get db.json data
app.get("/api/notes", function (req, res) {
    res.json(readJSON());
});

app.post("/api/notes", function (req, res) {
    let dbData = readJSON();
    let addNote = {
        title: req.body.title,
        text: req.body.text,
    };
    dbData.push(addNote)
    fs.writeFileSync(path.join(__dirname, "/db/db.json"), JSON.stringify(dbData, null, 2));
    res.send("Success!")
});

app.listen(PORT, function () {
    console.log("Listening on port " + PORT)
});
