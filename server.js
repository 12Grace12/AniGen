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

/* CONNECT TO MONGO -------------------------- */
const mongo_uri = "mongodb+srv://dbUser:dbUserPassword@comp-20.yu1ib.mongodb.net/aniGen?retryWrites=true&w=majority";

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(mongo_uri, {
    useUnifiedTopology : true  })
    .then(client => {
        const database = client.db('aniGen');
        const users    = database.collection("users");
        const lists    = database.collection("aniLists");
        console.log("Connected to Mongodb!");

        /* CRUD HANDLER ---------------------- */
        app.listen(port, function() {
            console.log('Listening on ' + port);
        })

        app.get('/', function(req, res) {
            res.sendFile(path.resolve("server-main.html"));
        })

        app.post('/register', function(req, res) {
            var mail  = req.body["email"];
            var rkey  = rand.generate(7);
            const doc = { email : mail, key : rkey };
            users.insertOne(doc);
            
        })

        app.post('/user-lists', function(req, res) {
            res.send(req.body);
        })
    })
    .catch(console.error)
