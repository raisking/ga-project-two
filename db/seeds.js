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
var FoodModel = Schema.FoodModel;
// Delete all users from the database
UserModel.remove({}, function (err) {
    console.log(err);
});
// Create some users and lists
const newUserOne = new UserModel({
    name: 'John Smith', 
    phone: 7705554445,
    email: 'john@gmail.com', 
    street: '112 Cobb Pky', 
    city: 'Marietta', 
    state: 'GA', 
    zipcode: 33040, 
    store: 'Walmart'
})
const newUserTwo = new UserModel({
    name: 'Peter Parker', 
    phone: 4443338888,
    email: 'john@gmail.com', 
    street: '112 Cobb Pky', 
    city: 'Marietta', 
    state: 'GA', 
    zipcode: 33040, 
    store: 'Walmart'
})
const newUserThree = new UserModel({
    name: 'Floyd Mayweather', 
    phone: 4048449494,
    email: 'john@gmail.com', 
    street: '112 Cobb Pky', 
    city: 'Marietta', 
    state: 'GA', 
    zipcode: 33040, 
    store: 'Walmart'
})

const newListOne = new ListModel({ 
    name: 'Pizza', 
    qty: 22, 
    size: 'Large' 
})
const newListTwo = new ListModel({ 
    name: 'Beer', 
    qty: 1, 
    size: '12 Pkg'
 })
const newListThree = new ListModel({ 
    name: 'Olive Oil', 
    qty: 12, 
    size: 'Large' 
})

const newFoodOne = new FoodModel({ 
    day: 'Sunday', 
    breakfast: 'Bacon & Egg', 
    lunch: 'Burrito',
     dinner: 'Chicken Fried Rice' 
    })
const newFoodTwo = new FoodModel({ 
    day: 'Monday', 
    breakfast: 'Bacon & Egg', 
    lunch: 'Pizza', 
    dinner: 'Chicken Wings'
 })
const newFoodThree = new FoodModel({ 
    day: 'Tuesday', 
    breakfast: 'Bacon & Egg', 
    lunch: 'Taco', 
    dinner: 'Pasta' 
})

// Here we assign some lists to each user.
const users = [newUserOne, newUserTwo, newUserThree]
const lists = [newListOne, newListTwo, newListThree]
const foods = [newFoodOne, newFoodTwo, newFoodThree]

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
users.forEach((user) => {
    user.foods = foods
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