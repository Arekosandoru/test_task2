const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();

var fs = require("fs");
var file = "example.json";
var filepath = __dirname + "/" + file;

app.use(cors());
app.use(express.static(path.join(__dirname, "build")));

// support json encoded bodies
app.use(bodyParser.json());
// support encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/ping", function(req, res) {
    return res.send("pong");
});

app.get("/getMessages", function(req, res) {
    // Read Synchrously
    var content = fs.readFileSync(filepath),
        newContent;

    content = content != "" ? JSON.parse(content) : {};

    if (isEmpty(content)) {
        newContent = fillDefaultData();
        res.send(newContent);
    } else {
        res.header("Content-Type", "application/json");
        res.send(content);
    }
});

app.post("/updateMessages", function(req, res) {
    const json = JSON.stringify(req.body);

    fs.writeFile(filepath, json, "utf8", function(err) {
        if (err) {
            return console.log(err);
        } else {
            res.send(json);
        }
    });
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 3001);

function fillDefaultData() {
    let id,
        text,
        email,
        date,
        json,
        unsorted = [];

    for (let i = 0; i < 30; i++) {
        unsorted.push(createData());
    }

    json = {
        unsorted,
        technicalSupport: [],
        marketing: [],
        seo: []
    };

    json = JSON.stringify(json);

    fs.writeFile(filepath, json, "utf8", function(err) {
        if (err) {
            return console.log(err);
        }
    });

    return json;
}

function createData() {
    id = "_" + getRandomString(9);
    text = getRandomString(15);
    email = getRandomString(7) + "@gmail.com";
    date = new Date();

    return { id, text, email, date };
}

function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

function getRandomString(length) {
    return Math.random()
        .toString(36)
        .substr(2, length);
}
