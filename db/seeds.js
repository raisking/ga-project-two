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
const newUserOne = new UserModel({ name: 'John', phone: 770-555-4445})
const newUserTwo = new UserModel({ name: 'Mary', phone: 444-333-8888 })
const newUserThree = new UserModel({ name: 'James', phone: 404-844-9494 })

const newListOne = new ListModel({ name: 'Pizza', qty: 22 })
const newListTwo = new ListModel({ name: 'Beer', qty: 1 })
const newListThree = new ListModel({ name: 'Hot Dog', qty: 12 })

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