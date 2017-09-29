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
            response.render('lists/index'. {
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



module.exports = router;