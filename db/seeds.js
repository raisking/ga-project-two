require('dotenv').config();
//Database setup
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
//Will log an error if db cannot connect to MongoDB
db.on('error', function(err){
    console.log(err);
});
db.once('open', function(){
    console.log("Connected to MongoDB");
});
// Pull in Models from the 'schema.js'
var Schema = require("./schema.js");
var UserModel = Schema.UserModel;
var ListModel = Schema.ListModel;


//Delete all Lists from the database
UserModel.remove({}, function(err){
    console.log(err);
});

//Create some Users 
const newUserOne = new UserModel({name: 'James Parker',phone: 4044544545});
const newUserTwo = new UserModel({name: 'Will Smith',phone: 4454544335});
const newUserThree = new UserModel({name: 'Floyd Mayweather',phone: 2204544545});
            
//Create some Lists 
const newListOne = new ListModel({name: '12 Pk Beer', qty: 10});
const newListTwo = new ListModel({name: 'Apple', qty: 10});
const newListThree = new ListModel({name: 'Pizza', qty: 12 });


//Assign lists to the users
const users = [newUserOne, newUserTwo, newUserThree];
const lists = [newListOne, newListTwo, newListThree];

Users.forEach((user) =>{
    user.lists = lists

    user.save()
        .then((user) => {
            console.log(`${user.name} saved`)
        })
        .catch((error) =>{
            console.log(error)
        })
});


//Disconnect from database
db.close();
