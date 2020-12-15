/* DECLARE MODULES and CONSTANTS ------------- */
const express = require('express')
      b_parse = require('body-parser')
      path    = require('path');

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
        console.log("Connected to Mongodb!");

        /* CRUD HANDLER ---------------------- */
        app.listen(port, function() {
            console.log('Listening on ' + port);
        })

        app.get('/', function(req, res) {
            //res.sendFile(path.resolve("server-main.html"));
            res.location("http://animegen.herokuapp.com/");
        })

        app.post('http://animegen.herokuapp.com/register', function(req, res) {
            // Create document including username:password
            console.log(req.body["username"])

            // Add document to MongoDB

            // Respond with home page and a registration success alert
        })
    })
    .catch(console.error)