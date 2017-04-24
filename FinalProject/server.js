var express = require('express'); //lets us use the Express module in our server.js file
var app = express();

var mongojs = require('mongojs');//lets us use the MongoJS module in our server.js file
var db = mongojs('users', ['users']);//tells us what database we will be using

var bodyParser = require('body-parser');
var mkdirp = require('mkdirp');

app.use(express.static(__dirname + "/public")); //static because we're telling the server to look for static files (html, css, js, image files)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //now the server can parse the data it's being sent from the controller

var multer = require('multer');
// var morgan = require('morgan'); // Import Morgan Package
// var mongoose = require('mongoose'); // HTTP request logger middleware for Node.js
var path = require('path'); // Import path module

var username = "kyle";
var userId;

////////////////////////////get and post requests/////////////////////////////////////

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var location = './images/' + username
    cb(null, location);
  },
  filename: function (req, file, cb) {
    if(! file.originalname.match(/\.(png|jpeg|jpg|JPG|PNG|JPEG)$/) ) {
        var err = new Error();
        err.code = 'filetype';
        return cb(err);
    }else{
        cb(null, Date.now() + '_' + file.originalname);
    }
  }
});

var upload = multer({ 
    storage: storage,
    limits : {fileSize : 100000000}
}).single('myfile');

// mongoose.connect('mongodb://127.0.0.1:27017/multerTest', function(err) {
//     if (err) {
//         console.log('Not connected to the database: ' + err); // Log to console if unable to connect to database
//     } else {
//         console.log('Successfully connected to MongoDB'); // Log to console if able to connect to database
//     }
// });



app.post('/upload', function (req, res) {
    
  upload(req, res, function (err) {
    var myfilepath = req.file.path;
    if (err) {
      if(err.code === 'LIMIT_FILE_SIZE'){
        res.json({success: false, message: "File size is too large, max size is 10 MB"});
      } else if (err.code === 'filetype') {
        res.json({success: false, message: "File type is invalid, must be .png"});
      } else{
        console.log(err);
        res.json({success: false, message: "file was not able to be uploaded"});
      }
      return
    }else{
        if(!req.file){
            res.json({success: false, message: "No file was selected"});
        }else{
            res.json({success: true, message: "file was uploaded"});
            var query = {};
            query['username'] = username;
            var pushPic = {};
            pushPic[filepath] = myfilepath;
            var d = new Date();
            console.log('my timestamp: ', d.getTime());
            pushPic[timestamp] = d.getTime();
            pushPic[likes] = 0;
            pushPic[caption] = '';
            pushPic[comments] = {};
            db.users.update(
                   query,
                   {$push : {
                             pics : {
                                pushPic
                               }
                          }
                    }
            );
        }
    }

    
  });
});



app.post('/uploadCaption', function (req, res) {
    console.log("received upload caption post");
    console.log("my body: ", req.body.caption);
    res.json({message: "what the fuck is up", success: true});
});


/////////////////////////////////////////////////////////////////////////////////

app.post('/checkuser', function (req,res) { //get requests asks mongoDB for data

    username = req.body.username;
    var pass = req.body.password;
    db.users.find(function (err, docs) { //docs is the actual data from the server
      
    

        for (var index in docs) {
            for (var key in docs[index]){
                if (key == user){
                    if (pass == docs[index][key].info.password){
                        console.log("password match");
                        res.json({"username": req.body.username, "_id": req.body._id});
                    }
                } else {
                    console.log("username/password incorrect"); //create error message
                }
            }
        }
   });
});

/////////////////////////////////////////////////////////////////////////////////

app.post('/adduser', function (req, res) { //listens for post request from controller

    var newEntry = req.body;
    newEntry.pics = {};
    newEntry.newfeed = {};

    //var newEntry = {};
    //var username = req.body.username;
    //newEntry[username] = {"info": req.body, "pics":{}, "newsfeed":{}};
    //newEntry[username].info.followers = [];
    //newEntry[username].info.following = [];
    
    db.users.insert(newEntry, function(err, doc) { //inserts into database
        res.json({"username": doc.username, "_id": doc._id});
    });
    
    var wilsonPath = "/Users/wilsonzhong/cse330/spring2017-cp-441746-435490/FinalProject/images/";
    var mirhadPath = "/Users/mirhadosmanovic/spring2017-cp-441746-435490/FinalProject/images/";

    //create folder to store images
    var path = "/Users/mirhadosmanovic/spring2017-cp-441746-435490/FinalProject/images/" + req.body.username;
    mkdirp(path, function (err) {
        if (err){
            console.error(err);
        } else {
            console.log('Made a folder with username: ', req.body.username);
        }
    });
});

/////////////////////////////////////////////////////////////////////////////////

// app.delete('/contactlist/:id', function (req, res) {
//     var id = req.params.id;
//     console.log(id);
//     db.contactList.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
//         res.json(doc);
//     });
// });

/////////////////////////////////////////////////////////////////////////////////

app.post('/loadnewsfeed', uep, function (req, res) { //listens for post request from controller
    var info = getInfo(req.body.user);
    res.json(info);
});

/////////////////////////////////////////////////////////////////////////////////

function getInfo(user) {
      //this is where u should query the database for teh info you need
      //var info = db.users.find({"username": user}); this doesnt work
      console.log(info);
      return db.users.find({"username": user});
}
app.listen(3000); //listening on port 3000
console.log("Server running on port 3000");