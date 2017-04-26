var express = require('express'); //lets us use the Express module in our server.js file
var app = express();

var mongojs = require('mongojs');//lets us use the MongoJS module in our server.js file
var db = mongojs('users', ['users']);//tells us what database we will be using

var bodyParser = require('body-parser');
var mkdirp = require('mkdirp');
var async = require('async');

app.use(express.static(__dirname + "/public")); //static because we're telling the server to look for static files (html, css, js, image files)
// app.use(express.static(__dirname + "/images"));
// app.use(express.static(__dirname +"/img"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //now the server can parse the data it's being sent from the controller

var multer = require('multer');
// var morgan = require('morgan'); // Import Morgan Package
// var mongoose = require('mongoose'); // HTTP request logger middleware for Node.js
var path = require('path'); // Import path module

var username = "kyle";
var myCaption = '';

////////////////////////////get and post requests/////////////////////////////////////

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var location = './public/images/' + username
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
    var myfilepath = req.file.path.substring(6,req.file.path.length);
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
            
            var d = new Date();
            
            db.users.update(
                   {username: username},
                   {$push : {
                             pics : {
                                filepath: myfilepath,
                                timestamp : d.getTime(),
                                likes: 0,
                                caption : myCaption,
                                comments: [],

                               }
                          }
                    }
            );


        }
    }

    
  });
});

/////////////////////////////////////////////////////////////////////////////////


app.post('/uploadCaption', function (req, res) {
    myCaption = req.body.caption;
    username = req.body.username;
    res.json({message: "what the fuck is up", success: true});
});

/////////////////////////////////////////////////////////////////////////////////

app.post('/addComment', function(req, res){
    res.json({message: "add comment shit", success: true});
});


/////////////////////////////////////////////////////////////////////////////////

app.get('/getProfile/:username', function(req,res){
    db.users.find({username: req.params.username}, function(err,docs){
        if(err){
            console.log(err);
        }
        res.json(docs[0]);
    });
    
});


/////////////////////////////////////////////////////////////////////////////////

app.post('/checkuser', function (req,res) { //get requests asks mongoDB for data
    username = req.body.username;
    var pass = req.body.password;
    
    db.users.find({username: req.body.username}, function(err, docs){
        if(docs[0].password == pass){
            res.json({"username" : req.body.username, "_id" : req.body._id});
        }else{
            console.log('incorrect password/username');
        }
    });

   //  db.users.find(function (err, docs) { //docs is the actual data from the server
      
    

   //      for (var index in docs) {
   //          for (var key in docs[index]){
   //              if (key == user){
   //                  if (pass == docs[index][key].info.password){
   //                      console.log("password match");
   //                      res.json({"username": req.body.username, "_id": req.body._id});
   //                  }
   //              } else {
   //                  console.log("username/password incorrect"); //create error message
   //              }
   //          }
   //      }
   // });
});

/////////////////////////////////////////////////////////////////////////////////

app.post('/usersandfollowrequests', function (req, res) {
            var allusers = [];
            var requests = [];
            db.users.find(function(err,docs){
            if(err){
                console.log(err);
            }
            
            for(var i = 0; i<docs.length; i++){
                allusers.push(docs[i].username);
            }
            
            console.log("the user loggin in is *****", req.body.user);
            db.users.find({username: req.body.user}, function(err,docs){
            if(err){
                console.log(err);
            }
            requests = docs[0].followRequests;
             console.log("the requests array is: ", requests);
             res.json({"allusers": allusers, "requests": requests});
        });
            
            
            
        });
});


/////////////////////////////////////////////////////////////////////////////////

app.post('/adduser', function (req, res) { //listens for post request from controller

    var newEntry = req.body;
    if(req.body.private === "private"){
         newEntry.private = true;
    }else{
        newEntry.private = false;
    }
    newEntry.followers = [];
    newEntry.following = [];
    newEntry.pics = [];
    newEntry.newsfeed = [];
    newEntry.followRequests = [];
    newEntry.sentRequests = [];
    username = req.body.username;
    //var newEntry = {};
    //var username = req.body.username;
    //newEntry[username] = {"info": req.body, "pics":{}, "newsfeed":{}};
    //newEntry[username].info.followers = [];
    //newEntry[username].info.following = [];
    
    db.users.insert(newEntry, function(err, doc) { //inserts into database
        res.json({"username": doc.username, "_id": doc._id});
    });
    
    var wilsonPath = "/Users/wilsonzhong/cse330/spring2017-cp-441746-435490/FinalProject/public/images/";
    var mirhadPath = "/Users/mirhadosmanovic/spring2017-cp-441746-435490/FinalProject/public/images/";

    //create folder to store images
    var path = mirhadPath + req.body.username;
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

// app.post('/loadnewsfeed', uep, function (req, res) { //listens for post request from controller
//     var info = getInfo(req.body.user);
//     res.json(info);
// });

/////////////////////////////////////////////////////////////////////////////////



// app.get('/globalnewsfeed/', function(req, res){
//     console.log('received get request for global news feed');
//     console.log(req.params);

//         console.log('getall');
//         db.users.find({private: false}, function(err,docs){
//             if(err){
//                 console.log(err);
//             }
//             // console.log('docs length: ', docs.length);
//             var globalfeed = [];
//             for(var i = 0; i<docs.length; i++){
//                 // console.log(docs[i].username, ": and their pics: ", docs[i].pics);
//                 var temp = {};
//                 temp.username = docs[i].username;
//                 temp.pics = docs[i].pics;
//                 globalfeed.push(temp);
//             }
//             // console.log(globalfeed);
//             res.json(globalfeed);
//         })
    

// });

/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////

app.post('/follow', function(req, res){
  var userloggedin = req.body.loggedinuser;
  var seconduser = req.body.userbeingfollowedorunfollowed;
  var action = req.body.action;
  var priv = false;
  var requests = [];
  
  
  if (action == "follow"){
  
          db.users.find({username: seconduser}, function(err,docs){
            if(err){
                console.log(err);
            }
            priv = docs[0].private;
            console.log("private or nawh?", priv);
       
          
          if (priv === false) {
            
             console.log("the profile is public?????");
              db.users.update(
                   {username: userloggedin},
                   {$push : {
                             following : seconduser
                          }
                    }
            );
              
              db.users.update(
                   {username: seconduser},
                   {$push : {
                             followers : userloggedin
                          }
                    }
            );
            res.json({"username": seconduser});
          } else {
            db.users.update(
                   {username: seconduser},
                   {$push : {
                             followRequests : userloggedin
                          }
                    }
                    
            );
            db.users.update(
                   {username: userloggedin},
                   {$push : {
                             sentRequests : seconduser
                          }
                    }
                    
            );
            
            setTimeout(function(){ res.json(docs); }, 1000);
          }
        });
    } else if (action == "unfollow") { //unfollow
      
      db.users.update(
          { username: userloggedin },
          { $pull: { following: seconduser } }
      );
      
      db.users.update(
          { username: seconduser },
          { $pull: { followers: userloggedin } }
      );
      res.json({"username": seconduser});
    } else {
        db.users.update( //delete request
          { username: userloggedin },
          { $pull: { followRequests: seconduser } }
      );
        db.users.update( //delete request
          { username: seconduser },
          { $pull: { sentRequests: userloggedin } }
      );
        
            db.users.find({username: userloggedin}, function(err,docs){ //get updated list of requests
            if(err){
                console.log(err);
            }
            requests = docs[0].followRequests;
            });
        
              db.users.update( //update the users followers
                   {username: userloggedin},
                   {$push : {
                             followers : seconduser
                          }
                    }
            );
      
                   db.users.update( //update the requests following
                   {username: seconduser},
                   {$push : {
                             following : userloggedin
                          }
                    }
            );
                   
            res.json({"requests": requests});
    }
});

/////////////////////////////////////////////////////////////////////////////

app.get('/globalnewsfeed/', function(req, res){
    console.log('received get request for global news feed');
    console.log('my req.query: ', req.query);
    if(req.query.get == "all"){
        console.log('getall');
        db.users.find({private: false}, function(err,docs){
            if(err){
                console.log(err);
            }
            // console.log('docs length: ', docs.length);
            var globalfeed = [];
            for(var i = 0; i<docs.length; i++){
                // console.log(docs[i].username, ": and their pics: ", docs[i].pics);
                var temp = {};
                temp.username = docs[i].username;
                temp.pics = docs[i].pics;
                globalfeed.push(temp);
            }
            // console.log(globalfeed);
            res.json(globalfeed);
        });
    }else if(req.query.get == "following"){
        console.log('getfollowing');
        var following;
        var found = false;
        var feed = [];

        db.users.find({username: req.query.username}, function(err,docs){
            if(err){
                console.log(err);
            } else if(docs){
                
                following = docs[0].following;
                
                found = true;
                var feed = [];
                
                
                async.each(docs[0].following, function(item, callback){
                    
                    
                    db.users.find({username: item}, function (err, doc){
                        if(err){
                            console.log(err);
                            return callback(err);
                        }
                        var temp = {};
                        temp.username = doc[0].username;
                        temp.pics = doc[0].pics;
                        feed.push(temp);
                        callback(null);
                    });     
                    
                }, function(asyncErr){
                    if(asyncErr){
                        console.log("async error message: ", asyncErr);
                        res.json({success: "false", message:"Something went wrong try again"});
                    }else{
                        console.log('async finished: ', feed);
                        res.json(feed);
                    }
                })
            } else{
                res.json({success: "false", message:"Something went wrong user not found"});
            }

            
        });


        

    } else if(req.query.get ="individual"){
        console.log('get individual');
        db.users.find({username : req.query.who}, function(err,docs){
            if(err){
                console.log(err);
            }
            console.log('get individual docs: ', docs[0]);
            if(docs[0].private == true){
                //THEN LOOP THROUGH THE FOLLOWERS ARRAY: docs[0].followers
                var found = false;
                for(var i =0; i<docs[0].followers.length; i++){
                    if(docs[0].followers[i] == req.query.username){
                        found = true;
                        break;
                    }
                }
                if(req.query.username == req.query.who){
                    found = true;
                }

                if(found){
                    var feed = [];
                    var temp = {};
                    temp.username = docs[0].username;
                    temp.pics = docs[0].pics;
                    feed.push(temp);
                    res.json(feed);
                }else{
                    res.json({success: "false", message:"You cannot view this private user's posts, please request to follow the user"});
                }
            } else {
                var feed = [];
                var temp = {};
                temp.username = docs[0].username;
                temp.pics = docs[0].pics;
                feed.push(temp);
                res.json(feed);
            }
        })
    }
    

});


app.post('/submitComment', function(req, res){
    console.log(req.body);
    db.users.findOne({username: req.body.who}, function(err, doc){
        if(err){
            console.log(err);
        } else if(doc){
            var count = 0;
            var found = false;
            var commentArray;
            var picsArray = doc.pics;
            for(var i=0; i<doc.pics.length; i++){
              if(req.body.timestamp == doc.pics[i].timestamp){
                found = true;
                count = i;
                commentArray = doc.pics[i].comments;
                var temp = {};
                temp.author = req.body.username;
                temp.content = req.body.content;
                commentArray.push(temp);
                picsArray[i].comments = commentArray;
                break;
              }
            }


            console.log("commentArray: ", commentArray, typeof(commentArray));
            

            

            
            console.log("async has yet to start so found will be true: ", found);

            // db.user.findOne({_id:'123'},{friends:1}).lean().exec(function(err,user){
            //    var whichArrayToUpdate;
            //    for (var ii = 0; ii < user.friends.length; ii++) {
            //         for (var jj = 0; i < user.friends[ii].emails; jj++) {
            //             if(user.friends[ii].emails[jj].email == '1111' ){// update it below

            //                 user.friends[ii].emails[jj].email == 'what ever you want to set to.';

            //                 whichArrayToReplace = user.friends[ii].emails;
            //                 break;
            //             }
            //         };
            //    };

            //    db.user.update({'friends.name':'allen'},{$set{'friends.$.email': whichArrayToReplace} })
            // })



            async.parallel([
                function(callback) {
                    db.users.update({username : req.body.who}, 
                      {$set : {
                             pics : picsArray
                          }
                      }, function(err, doc){
                        if(err){
                          console.log(err);
                          return callback(err);
                        }
                        callback(null);
                      }
                    )
                    
                }
            ],
            // optional callback
            function(err, results) {
                if(err){
                        console.log("parallel error message: ", err);
                        res.json({success: "false", message:"Something went wrong try again"});
                }else{
                        console.log('parallel finished: ');
                        res.json({success:"true", message:"successfully added comment"});
                }
            });





        } else{
            res.json({success: "false", message:"Something went wrong user not found"});
        }
    })
});

function getInfo(user) {
      //this is where u should query the database for teh info you need
      //var info = db.users.find({"username": user}); this doesnt work
      return db.users.find({"username": user});
}
app.listen(3000); //listening on port 3000
console.log("Server running on port 3000");