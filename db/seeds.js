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
// list is Company

//Create some Lists 
const newListOne = new ListModel({name: '12 Pk Beer', qty: 10});
const newListTwo = new ListModel({name: 'Apple', qty: 10});
const newListThree = new ListModel({name: 'Pizza', qty: 12 });

//Create some Users 
const newUser = new UserModel({
    name: 'James Parker',phoneNumber: 404-454-4545, email: 'jamesparker@gmail.com', location:'Atlanta,GA', store: 'Walmart' });
const newUserTwo = new UserModel({
    name: 'Will Smith',phoneNumber: 445-454-4335, email: 'willsmith@gmail.com', location:'LA', store: 'Walmart' });
const newUserThree = new UserModel({
    name: 'Floyd Mayweather',phoneNumber: 220-454-4545, email: 'floyd@gmail.com', location:'Los Vegas', store: 'Walmart' });
            
//Assign lists to the users
const lists = [newListOne, newListTwo, newListThree];
const users = [newUser, newUserTwo, newUserThree];

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
