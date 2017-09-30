const express = require('express');
const router = express.Router()
const Schema = require('../db/schema.js');
const UserModel = Schema.UserModel;

//Create Index Route
router.get('/', (request, response) =>{
    
    UserModel.find({})
        .then((users) =>{
           
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
  
    response.render('users/new')
})
//Create Route
router.post('/', (request, response) =>{
    
    const newUser =request.body

    UserModel.create(newUser)
        .then(() =>{
       
            response.redirect('/users')
        })
        .catch((error) => {
            console.log(error)
        })
})
//Create Edit Route
router.get('/:userId/edit', (request, response) => {
  
    const userId = request.params.userId

 
    UserModel.findById(userId)
        .then((user) => {

            response.render('users/edit' , {
                user: user
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

//Create Update Route
router.put('/:userId', (request, response) =>{
  
    const userId = request.params.userId
  
    const updatedUser = request.body
    
    UserModel.findByIdAndUpdate(userId, updatedUser, {new: true})
        .then(() => {
         
            response.redirect(`/users/${userId}`)
        })
        .catch((error) => {
            console.log(error)
        })
})

//Create Show Route
router.get('/:userId', (request, response) => {
     const userId = request.params.userId
  
     UserModel.findById(userId)
        .then((user) =>{
       
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