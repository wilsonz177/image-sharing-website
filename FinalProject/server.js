var express = require('express'); //lets us use the Express module in our server.js file
var app = express();

var mongojs = require('mongojs');//lets us use the MongoJS module in our server.js file
var db = mongojs('users', ['users']);//tells us what database we will be using

var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public")); //static because we're telling the server to look for static files (html, css, js, image files)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //now the server can parse the data it's being sent from the controller

/////////////////////////////////////////////////////////////////////////////////

app.get('/checkuser', function (req,res) { //get requests asks mongoDB for data
    console.log("I received a GET request");
    db.users.find().toArray(function (err, docs) { //docs is the actual data from the server
        console.log(docs);
        for (var key in docs) {
            
        }
        res.json(docs); //responds back to controller
   });
});

/////////////////////////////////////////////////////////////////////////////////

app.post('/contactlist', function (req, res) { //listens for post request from controller
    console.log("the following is the new entry");
    console.log(req.body);
    db.contactList.insert(req.body, function(err, doc) { //inserts into database
        res.json(doc); //responds with NEW data back to controller
    });
});

/////////////////////////////////////////////////////////////////////////////////

app.delete('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactList.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

/////////////////////////////////////////////////////////////////////////////////

app.listen(3000); //listening on port 3000
console.log("Server running on port 3000");