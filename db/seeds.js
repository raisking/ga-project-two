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
var ListModel = Schema.ListModel;
var UserModel = Schema.UserModel;

//Delete all Lists from the database
ListModel.remove({}, function(err){
    console.log(err);
});

//Create some Lists 
const newListOne = new ListModel({name: '12 Pk Beer', qty: 10});
const newListTwo = new ListModel({name: 'Apple', qty: 10});
const newListThree = new ListModel({name: 'Pizza', qty: 12 });

//Create some Users 
const newUserOne = new UserModel({name: 'James Parker',phone: 4044544545});
const newUserTwo = new UserModel({name: 'Will Smith',phone: 4454544335});
const newUserThree = new UserModel({name: 'Floyd Mayweather',phone: 2204544545});
            
//Assign lists to the users
const lists = [newListOne, newListTwo, newListThree];
const users = [newUserOne, newUserTwo, newUserThree];

lists.forEach((list) =>{
    list.users = users
    list.save()
        .then((list) => {
            console.log(`${list.name} saved`)
        })
        .catch((error) =>{
            console.log(error)
        })
});

//Disconnect from database
db.close();
