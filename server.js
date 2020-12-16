/* DECLARE MODULES and CONSTANTS ------------- */
const express = require('express')
      b_parse = require('body-parser')
      path    = require('path')
      rand    = require('random-key');

const app     = express();

app.use('/css', express.static('css'));
app.use('/images', express.static('images'));
app.use(b_parse.urlencoded({ extended: true })); 

var port = process.env.PORT || 3000;

const head = `
<html>
    <head>
        <meta charset="utf-8">
        <title>AniGen</title>
        <link rel="stylesheet" href= "css/index.css" >
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bungee&display=swap">
        <link rel="shortcut icon" type="image/png" href="./images/logo.png">
        <style>
            body{
                margin: 0px;
            }
        </style>
    </head>
    <body>
        <div class="other">
            <div class="top">
`

const button_home = `<a href="https://12grace12.github.io/AniGen/index.html" class="findbutton">Home</a> `

/* CONNECT TO MONGO -------------------------- */
const mongo_uri = "mongodb+srv://dbUser:dbUserPassword@comp-20.yu1ib.mongodb.net/aniGen?retryWrites=true&w=majority";

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(mongo_uri, {
    useUnifiedTopology : true  })
    .then(client => {
        const database = client.db('aniGen');
        const users    = database.collection("users");
        console.log("Connected to Mongodb!");

        /* CRUD HANDLER ---------------------- */
        app.listen(port, function() {
            console.log('Listening on ' + port);
        })

        app.get('/', function(req, res) {
            res.sendFile(path.resolve("server-main.html"));
        })

        app.post('/register', function(req, res) {
            // Add user and key to Mongo
            var mail    = req.body["email"];
            var rkey    = rand.generate(7);
            
            const doc   = { email : mail, key : rkey };

            users.insertOne(doc);

            // Print key to user with note and link back to home 
            var file = head;
            file    += "<p>Your key is: <b>" + rkey + "</b></p><br>"
            file    += "<p>Don't lose this key!</p>"
            file    += button_home;
            file    += "</div></div></body></html>"

            res.send(file);
            
        })

        app.post('/user-lists', function(req, res) {
            // Build query with request 
            var rkey     = req.body["user-key"];

            const query  = { "key": rkey };

            const list = users.findOne(query);

            res.json(list);
        })

        app.post('/add', function(req, res) {
            //blah
        })
    })
    .catch(console.error)
