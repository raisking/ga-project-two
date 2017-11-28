const express = require('express');
const router = express.Router({ mergeParams: true });
const Schema = require('../db/schema.js');
const UserModel = Schema.UserModel;

//Create Index Route
router.get('/', (request, response) => {
    //Grab the user ID from the parameter
    const userId = request.params.userId
    //user the UserMode to find the user by ID
    UserModel.findById(userId)
        .then((user) => {
            //Then once you have found the user in the database
            response.render('lists/index', {
                user: user
            })
        })
        .catch((error) => {
            console.log(error)
        })
})
//Create New Route
router.get('/new', (request, response) => {
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
    //Grab the user ID from the parameters
    const userId = request.params.userId
    //Grab the new list info from the request body
    const newList = request.body
    //Use the UserModel to find the user by ID
    UserModel.findById(userId)
        .then((user) => {
            //Then once you have found the user from the database
            //Push the new list object input the user's 
            //list array
            user.lists.push(newList)
            //Save the user and return the Promise
            return user.save()
        })
        .then((user) => {
            //Then once the user has been saved
            //Redirect to the lists indexfor the user
            response.redirect(`/users/${userId}/lists`)
        })
})
//Create Edit Route - takes to edit mode
router.get('/:listId/edit', (request, response) => {
    //Grab the user ID from the parameter
    const userId = request.params.userId
    //Grab the list ID from the parameter
    const listId = request.params.listId
    //Use the UserModel to find the user by ID
    UserModel.findById(userId)
        .then((user) => {
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
        .catch((error) => {
            console.log(error)
        })
})

// UPDATE route // it takes to edit mode and updates any changes
router.put('/:listId', (request, response) => {
    // GRAB the user ID from the parameters
    const userId = request.params.userId
    // GRAB the list ID from the parameters
    const listId = request.params.listId
    // GRAB the updated list object from the request body
    const updatedList = request.body
    // USE the userModel to find the user by ID
    UserModel.findById(userId)
        .then((user) => {

            // THEN once the user has been returned,
            // FIND the list by ID from the user's lists
            const list = user.lists.id(listId)
            // MAP each attribute from the updated list object to
            // the same attribute on the original list
            list.name = updatedList.name
            list.qty = updatedList.qty
            list.size = updatedList.size

            // SAVE the updated user and return the PROMISE
            return user.save()

        })
        .then(() => {
            // THEN once the user has saved, REDIRECT to the 
            // list's SHOW page
            response.redirect(`/users/${userId}/lists/${listId}`)
        })

})


// SHOW route
router.get('/:listId', (request, response) => {

    // GRAB the user ID from the parameters
    const userId = request.params.userId

    // GRAB the list ID from the parameters
    const listId = request.params.listId

    // USE the userModel to find the user by ID
    UserModel.findById(userId)
        .then((user) => {
            // THEN once the user has been returned,
            // FIND the list by ID from the user's lists
            const list = user.lists.id(listId)

            // THEN render the list info using Handlebars
            // and pass the userId to use in link URLs
            response.render('lists/show', {
                list: list,
                userId: userId
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

//Create Delete Route 
router.get('/:listId/delete', (request, response) => {
    const userId = request.params.userId
    const listId = request.params.listId

    UserModel.findById(userId)
        .then((user) => {
            const list = user.lists.id(listId).remove()
            return user.save()
        })
        .then(() => {
            response.redirect(`/users/${userId}/lists`)
        })
})

module.exports = router;