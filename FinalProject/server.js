var express = require('express'); //lets us use the Express module in our server.js file
var app = express();
var multer = require('multer');
// var morgan = require('morgan'); // Import Morgan Package
// var mongoose = require('mongoose'); // HTTP request logger middleware for Node.js
var path = require('path'); // Import path module



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images/');
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

var mongojs = require('mongojs');//lets us use the MongoJS module in our server.js file
var db = mongojs('users', ['users']);//tells us what ddatabase we will be using

var bodyParser = require('body-parser');

// app.use(morgan('dev')); // Morgan Middleware
app.use(express.static(__dirname + "/public")); //static because we're telling the server to look for static files (html, css, js, image files)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //now the server can parse the data it's being sent from the controller

// mongoose.connect('mongodb://127.0.0.1:27017/multerTest', function(err) {
//     if (err) {
//         console.log('Not connected to the database: ' + err); // Log to console if unable to connect to database
//     } else {
//         console.log('Successfully connected to MongoDB'); // Log to console if able to connect to database
//     }
// });



app.post('/upload', function (req, res) {
    // console.log('my caption: ', req.body);
  upload(req, res, function (err) {
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
        }
    }

    // Everything went fine
  });
});

app.post('/uploadCaption', function (req, res) {
    console.log("received upload caption post");
    console.log("my body: ", req.body.caption);
    res.json({message: "what the fuck is up", sucess: true});
});





/////////////////////////////////////////////////////////////////////////////////

// app.get('/checkuser', function (req,res) { //get requests asks mongoDB for data
//     console.log("I received a GET request");
//     db.users.find().toArray(function (err, docs) { //docs is the actual data from the server
//         console.log(docs);
//         for (var key in docs) {
            
//         }
//         res.json(docs); //responds back to controller
//    });
// });



/////////////////////////////////////////////////////////////////////////////////

// app.post('/contactlist', function (req, res) { //listens for post request from controller
//     console.log("the following is the new entry");
//     console.log(req.body);
//     db.contactList.insert(req.body, function(err, doc) { //inserts into database
//         res.json(doc); //responds with NEW data back to controller
//     });
// });

/////////////////////////////////////////////////////////////////////////////////

// app.delete('/contactlist/:id', function (req, res) {
//     var id = req.params.id;
//     console.log(id);
//     db.contactList.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
//         res.json(doc);
//     });
// });

/////////////////////////////////////////////////////////////////////////////////

app.listen(3000); //listening on port 3000
console.log("Server running on port 3000");