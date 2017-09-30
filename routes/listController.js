const express = require('express');
const router = express.Router({mergeParams: true});
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
    const userId = request.params.userId

    response.render('lists/new', {
        userId: userId
    })
})
//Create Route
router.post('/', (request, response) => {
    const userId = request.params.userId
    const newList = request.body

    UserModel.findById(userId)
        .then((user) =>{
            user.lists.push(newList)
            return user.save()
        })
        .then((user) =>{
            response.redirect(`/users/${userId}/lists`)
        })
})

router.get('/:listId/edit', (request, response) =>{
    const userId = request.params.userId
    const listId = request.params.listId

    UserModel.findById(userId)
        .then((user) =>{
            const list = user.lists.id(listId)
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
    const userId = request.params.userId
    const listId = request.params.listId
    const updatedlist = request.body

    UserModel.findById(userId)
        .then((user) =>{
            const list = user.lists.id(listId)
            list.name = updatedlist.name
            list.qty = updatedlist.qty

            return company.save()
        })
        .then(() =>{

            response.redirect(`/users/${userId}/lists/${listId}`)
        })
})
//Create Show Route
router.get('/:listId', (request, response) =>{

    const userId = request.params.userId
    const listId = request.params.listId

    UserModel.findById(userId)
        .then((user) => {
            const list = user.lists.id(listId)
            
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