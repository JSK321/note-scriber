const express = require("express");
const path = require("path");
const fs = require("fs")

const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"))

// Returns the index.html
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

// Returns the notes.html
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get("/api/notes", function(req, res){
    let dbData = fs.readFileSync(path.join(__dirname, "/db/db.json"), "utf8");
    dbData = JSON.parse(dbData);

    res.json(dbData)
})

app.listen(PORT,function(){
    console.log("Listening on port " + PORT)
});