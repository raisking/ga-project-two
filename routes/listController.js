const express = require('express');
const router = express.Router({ mergeParams: true});
const Schema = require('../db/schema.js');
const UserModel = Schema.UserModel;

//Create Index Route
router.get('/', (request, Response) =>{
    //Grab the user ID from the parameter
    const userId = request.params.userId
    //user the UserMode to find the company by ID
    UserModel.findById(userId)
        .then((user) =>{
            //Then once you have found the company in the database
            response.render('lists/index', {
                user: user
            })
        })
        .catch ((error) =>{
            console.log(error)
        })
})

//Create New Route
router.get('/new', (request, response) =>{
    //Grab the user ID from the parameters
    const userId = request.params.userId
    //Render a new form for a fresh list,
    // also passing the userId to user in the 
    //form's Action
    response.render('lists/new', {
        userId: userId
    })
})

//Create Route
router.post('/', (request, response) => {
    //Grab the company ID from the parameters
    const userId = request.params.userId
    //Grab the new list info from the request body
    const newList = request.body
    //Use the UserModel to find the company by ID
    UserModel.findById(userId)
        .then((user) =>{
            //Then once you have found the user from the database
            //Push the new list object input the user's 
            //list array
            user.lists.push(newList)
            //Save the user and return the Promise
            return user.save()
        })
        .then((user) =>{
            //Then once the user has been saved
            //Redirect to the lists indexfor the user
            response.redirect(`/users/${userId}/lists`)
        })
})
//Create Edit Route
router.get('/:listId/edit', (request, response) =>{
    //Grab the user ID from the parameter
    const userId = request.params.userId
    //Grab the list ID from the parameter
    const listId = request.params.listId
    //Use the UserModel to find the user by ID
    UserModel.findById(userId)
        .then((user) =>{
            //Then once the user has been returned, 
            //Find the list by ID that you want to edit
            const list = user.lists.id(listId)
            //Render a form pre-populated with the list info
            //Also passing the userId to user for the form's Action
            response.render('lists/edit', {
                list: list,
                userId: userId
            })
        })
        .catch((error) =>{
            console.log(error)
        })
})

//Create Update Route
router.put('/:listId', (request, response) => {
    //Grab the user ID from the parameter
    const userId = request.params.userId
    //Grab the user ID from the parameter
    const listId = request.params.listId
    //Grab the udated list object from the request body
    const updatedlist = request.body

    //Use the UserModel to find the user by ID
    UserModel.findById(userId)
        .then((user) =>{
            //Then once the user has been returned,
            //Find the list by ID from the user's list
            const list = user.lists.id(listId)
            //Map each attribute from the updated list object to 
            //the same attribute on the orignal list
            list.name = updatedlist.name
            list.qty = updatedlist.qty
            //Save the updated user and return the Promise
            return company.save()
        })
        .then(() =>{
            //Then once the user has saved, Redirect to the 
            //list's show page
            response.redirect(`/users/${userId}/lists/${listId}`)
        })
})
//Create Show Route
router.get('/:listId', (request, response) =>{
    //Grab the user ID from the parameter
    const userId = request.params.userId
    //Grab the list ID fromt he parameter
    const listId = request.params.listId
    //Use the UserModel to find the user by ID
    UserModel.findById(userId)
        .then((user) => {
            //Then once the user has been returned,
            //Find the list by ID from the user's lists
            const list = user.lists.id(listId)
            //Then render the list info using handlebars
            //and pass the userId to use in link URLs
            response.render('/lists/show', {
                list: list,
                userId: userId
            })
        })
        .catch((error) =>{
            console.log(error)
        })
})

//Create Delete Route 
router.get('/:listId/delete', (request, response) =>{
    const userId = request.params.userId
    const listId = request.params.listId

    UserModel.findById(userId)
        .then((user) =>{
            const list = user.lists.id(listId).remove()
            return user.save()
        })
        .then(() =>{
            response.redirect(`/users/${userId}/lists`)
        })
})

module.exports = router;