/* DECLARE MODULES --------------------------- */
const express = require('express')
      b_parse = require('body-parser')
      path    = require('path');

const app     = express();

/* CONNECT TO MONGO -------------------------- */
const mongo_uri = "mongodb+srv://dbUser:dbUserPassword@comp-20.yu1ib.mongodb.net/aniGen?retryWrites=true&w=majority";

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(mongo_uri, {
    useUnifiedTopology : true  })
    .then(client => {
        const database = client.db('aniGen');
        console.log("Connected to Mongodb!");

        /* CRUD HANDLER ---------------------- */
        app.listen(3000, function() {
            console.log('Listening on 3000');
        })

        app.post('/register', function(req, res) {
            // Create document including randomly generated key

            // Write key to page along with note

            // Add document to MongoDB
        })
    })
    .catch(console.error)