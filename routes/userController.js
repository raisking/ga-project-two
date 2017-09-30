const express = require('express');
const router = express.Router()
const Schema = require('../db/schema.js');
const UserModel = Schema.UserModel;

//Create Index Route
router.get('/', (request, response) =>{
    //find all of the user in the database
    UserModel.find({})
        .then((users) =>{
           //Then once they come back from the database
           //render them in Handlebar
            response.render('users/index',{
                users: users
            })
        })
        .catch((error) =>{
            console.log(error)
        })
})
//Create New Route
router.get('/new', (request, response) =>{
    //REnder an empty form for the new user
    response.render('users/new')
})

//Create Route
router.post('/', (request, response) =>{
    //Grab the new user info an as JS object from the request obdy
    const newUser = request.body
    //Create and save a new User using the UserModel
    UserModel.create(newUser)
        .then(() =>{
       //Then once the model has saved, redirect to the Users Index
            response.redirect('/users')
        })
        .catch((error) => {
            console.log(error)
        })
})
//Create Edit Route
router.get('/:userId/edit', (request, response) => {
  //Grab the user ID from the parameters
    const userId = request.params.userId
    //Find the user by ID using the UserModel
    UserModel.findById(userId)
        .then((user) => {
            //Then once the company has been returned from
            //the database, Render a form containing the current
            //company information
            response.render('users/edit', {
                user: user
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

//Create Update Route
router.put('/:userId', (request, response) =>{
  //Grab the user Id from the parameter
   const userId = request.params.userId
    //Grab the updated User Info from the request body
    const updatedUser = request.body
    //use mongoose to find the user by ID and update it with the 
    //new user info. Be sure to include the {new: true} option as 
   //your third parameter 
    UserModel.findByIdAndUpdate(userId, updatedUser, { new: true })
        .then(() => {
         //Then once the new user info has been saved,
         //redirect to that user's show page
            response.redirect(`/users/${userId}`)
        })
        .catch((error) => {
            console.log(error)
        })
})

//Create Show Route
router.get('/:userId', (request, response) => {
    //Grab the user ID from the parameter
     const userId = request.params.userId
    //Use the UserModel to find the user by ID in the database
     UserModel.findById(userId)
        .then((user) =>{
       //Then once the user comes back from the database,
       //render the single user's info using handlebars
        response.render('users/show', {
            user: user
             })
        })
        .catch((error) =>{
            console.log(error)
        })
})

//Create Delete Route 
router.get('/:userId/delete', (request, response) => {
//Grab the userId that you want to delete from the parameter
    const userId = request.params.userId
    //Use the UserModel to find and delete the User in the database
    UserModel.findByIdAndRemove(userId)
        .then(() => {
            //Then once the user has been deleted from the database
            //redirect back to the user index
            response.redirect('/users')
        })
        .catch ((error) => {
            console.log(error)
        })
})



module.exports = router;