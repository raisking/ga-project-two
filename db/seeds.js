require('dotenv').config();

// Database setup
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection;
// Will log an error if db can't connect to MongoDB
db.on('error', function (err) {
    console.log(err);
});
// Will log "database has been connected" if it successfully connects.
db.once('open', function () {
    console.log("Connected to MongoDB!");
});

// Pull in Models from the `schema.js`
var Schema = require("./schema.js");

var UserModel = Schema.UserModel;
var ListModel = Schema.ListModel;

// Delete all users from the database
UserModel.remove({}, function (err) {
    console.log(err);
});

// Create some users and lists
const newUserOne = new UserModel({ name: 'John Bush', phone: 7705554445, 
email: 'john@gmail.com', street: '112 Cobb Pky', city: 'Marietta', state: 'GA', zipcode: 33040, store: 'Walmart'})
const newUserTwo = new UserModel({ name: 'Mary Obama', phone: 4443338888, 
email: 'john@gmail.com', street: '112 Cobb Pky', city: 'Marietta', state: 'GA', zipcode: 33040, store: 'Walmart'})
const newUserThree = new UserModel({ name: 'James Parker', phone: 4048449494, 
email: 'john@gmail.com', street: '112 Cobb Pky', city: 'Marietta', state: 'GA', zipcode: 33040, store: 'Walmart'})

const newListOne = new ListModel({ name: 'Pizza', qty: 22, note: 'get fresh' })
const newListTwo = new ListModel({ name: 'Beer', qty: 1, note: 'get Budweiser'})
const newListThree = new ListModel({ name: 'Hot Dog', qty: 12, note: 'get the branded'})

// Here we assign some lists to each user.
const users = [newUserOne, newUserTwo, newUserThree]
const lists = [newListOne, newListTwo, newListThree]

users.forEach((user) => {

    user.lists = lists

    user.save()
        .then((user) => {
            console.log(`${user.name} saved!`)
        })
        .catch((error) => {
            console.log(error)
        })
});

// Disconnect from database
db.close();