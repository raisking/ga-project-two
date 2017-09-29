const express = require('express');
const router = express.Router({mergeParams: true});
const Schema = require('../db/schema.js');
const ListModel = Schema.ListModel;

//Create Index Route
router.get('/', (request, response) =>{
    //Grab the list ID from the parameters
    const listId = request.params.listId
    //use the ListModel to find the list by ID
    ListModel.findById(listId)
        .then((list) =>{
            //Then once you have found the list in the database
            //Render the list and its embeded user informtion 
            //using Handlerbars
            response.render('users/index', {
                list: list
            })
        })
        .catch ((error) => {
            console.log(error)
        })
})

//Create New Route 
router.get('/new', (request, response) => {
    //Grab the list ID from the parameters
    const listId = request.params.listId
    //Render a new form for a fresh user,
    //also passing the listId to use in the 
    //form's action
    response.render('users/new', {
        listId: listId
    })
})

//Create Route
router.post('/', (request, response) =>{
    //Grab the list ID from the parameters
    const listId = request.params.listId
    //Grab the new user information from the request body
    const newUser = request.body
    //Use the ListModel to find the list by ID
    ListModel.findById(listId)
        .then((list) =>{
            //Then once you have found the list from the db
            //Push the new user object into the list's
            //user array
            list.users.push(newUser)
            //Save the list and return the promise
            return list.save()
        })
        .then((list) =>{
            //Then once the list has been saved,
            //Redirect to the users index for that list
            response.redirect(`/lists/${listId}/users`)
        })
})
//Create Edit Route
router.get('/:userId/edit', (request, response) =>{
    //Grab the list ID from the parameter
    const listId = request.params.listId
    //Grab the user ID from the parameter
    const userId = request.params.userId

    //USE the ListModel to fine the list by ID
    ListModel.findById(listId)
        .then((list) =>{
            //Then once the list has been returned
            //Find the user by ID that you want to edit
            const user = list.users.id(userId)
            //Render a form pre-populated with that user informtion,
            //Also passing the listId to use for the form's Action
            repsponse.render('users/edit', {
                user: user,
                listId: listId
            })
        })
        .catch((error) => {
            console.log(error)
        })
})