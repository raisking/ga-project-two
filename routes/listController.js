const express = require('express');
const router = express.Router();
const Schema = require('../db/schema.js');
const ListModel = Schema.ListModel;

//Create Index Route
route.get('/', (request, response) =>{
    //Find all of the Lists in the database
    ListModel.find({})
        .then((lists) =>{
            //Then once they come back from the database
            //Render them in Handlebars
            response.render('lists/index',{
                lists: lists
            })
        })
        .catch((error) =>{
            console.log(error)
        })
})
//Create New Route
router.get('/new', (request, response) =>{
    //Render an empty form for the new List
    response.render('lists/new')
})
//Create Route
router.post('/', (request, response) =>{
    //Grab the new list informations as a 
    //JS object from the request body
    const newList =request.body
    //Create and Save a new list using the ListModel
    ListModel.create(newList)
        .then(() =>{
            //Then once the model has saved, redirect to the lists Index
            response.redirect('/lists')
        })
        .catch((error) => {
            console.log(error)
        })
})
//Create Edit Route
route.get('/:listId/edit', (request, response) => {
    //Grab the list ID from parameters
    const listId = request.params.listId

    //Find the list Id using ListModel
    ListModel.findById(listId)
        .then((list) => {
            //Then once list has been returned from 
            //the database, Render a form containing the current
            //list information
            response.render('lists/edit' , {
                list: list
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

//Create Update Route
router.put('/:listId', (request, response) =>{
    //Grab the list ID from the parameter
    const listId = request.params.listId
    //Grab the updated List information from the request body
    const updatedList = request.body
    //Use Mongoose to find the list by ID and update it with the 
    // new list information. Be sure to include the {new: true} option as 
    //third parameter
    ListModel.findByIdAndUpdate(listId, updatedList, {new: true})
        .then(() => {
            //Then once the new list information has been saved, 
            //redirect to that list's SHOW page
            response.redirect(`/companies/${listId}`)
        })
        .catch((error) => {
            console.log(error)
        })
})

//Create Show Route
router.get('/:listId', (request, response) => {
    //Grab the list ID from the parameters
    const listId = request.params.listId
    //Use the ListModel to find the list by ID in the database 
    ListModel.findById(listId)
        .then((list) =>{
        //Then once the list comes back from the database,
        //render the single  list's information using Handlebars
        response.render('lists/show', {
            list: list
             })
        })
        .catch((error) =>{
            console.log(error)
        })
})

//Create Delete Route 
router.get('/:listId/delete', (request, response) => {
    //Grab the list ID that you want to delete from the parameters
    const listId = request.params.listId
    //Use the ListModel to find and delete the company the list in the database
    ListModel.findByIdAndRemove(listId)
        .then(() => {
            //Then once the list has been deleted from the database
            //redirect back to the lists Index
        })
        .catch ((error) => {
            console.log(error)
        })
})


module.exports = router;