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

