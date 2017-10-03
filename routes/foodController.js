const express = require('express');
const router = express.Router({ mergeParams: true});
const Schema = require('../db/schema.js');
const UserModel = Schema.UserModel;

//Create Index Route
router.get('/', (request, response) =>{
    //Grab the user ID from the parameter
    const userId = request.params.userId
    //user the UserMode to find the user by ID
    UserModel.findById(userId)
        .then((user) =>{
            //Then once you have found the user in the database
            response.render('foods/index', {
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
    //Render a new form for a fresh food,
    // also passing the userId to user in the 
    //form's Action
    response.render('foods/new', {
        userId: userId
    })
})

//Create Route
router.post('/', (request, response) => {
    //Grab the user ID from the parameters
    const userId = request.params.userId
    //Grab the new food info from the request body
    const newFood = request.body
    //Use the UserModel to find the user by ID
    UserModel.findById(userId)
        .then((user) =>{
            //Then once you have found the user from the database
            //Push the new food object input the user's 
            //food array
            console.log(user)
            user.foods.push(newFood)

            //Save the user and return the Promise
            return user.save()
        })
        .then((user) =>{
            //Then once the user has been saved
            //Redirect to the foods indexfor the user
            response.redirect(`/users/${userId}/foods`)
        })
})
//Create Edit Route - takes to edit mode
router.get('/:foodId/edit', (request, response) =>{
    //Grab the user ID from the parameter
    const userId = request.params.userId
    //Grab the food ID from the parameter
    const foodId = request.params.foodId
    //Use the UserModel to find the user by ID
    UserModel.findById(userId)
        .then((user) =>{
            //Then once the user has been returned, 
            //Find the food by ID that you want to edit
            const food = user.foods.id(foodId)
            //Render a form pre-populated with the food info
            //Also passing the userId to user for the form's Action
            response.render('foods/edit', {
                food: food,
                userId: userId
            })
        })
        .catch((error) =>{
            console.log(error)
        })
})

//Create Update Route
// router.put('/:foodId', (request, response) => {
//     //Grab the user ID from the parameter
//     const userId = request.params.userId
//     //Grab the user ID from the parameter
//     const foodId = request.params.foodId
//     //Grab the udated food object from the request body
//     const updatedfood = request.body

//     //Use the UserModel to find the user by ID
//     UserModel.findById(userId)
//         .then((user) =>{
//             //Then once the user has been returned,
//             //Find the food by ID from the user's food
//             const food = user.foods.id(foodId)
//             //Map each attribute from the updated food object to 
//             //the same attribute on the orignal food
//             food.name = updatedfood.name
//             food.qty = updatedfood.qty
//             //Save the updated user and return the Promise
//             return user.save()
//         })
//         .then(() =>{
//             //Then once the user has saved, Redirect to the 
//             //food's show page
//             response.redirect(`/users/${userId}/foods/${foodId}`)
//         })
// })

// UPDATE route // it takes to edit mode and updates any changes
router.put('/:foodId', (request, response) => {  
        // GRAB the user ID from the parameters
        const userId = request.params.userId 
        // GRAB the food ID from the parameters
        const foodId = request.params.foodId 
        // GRAB the updated food object from the request body
        const updatedFood = request.body
        // USE the userModel to find the user by ID
        UserModel.findById(userId)
            .then((user) => {
        
                // THEN once the user has been returned,
                // FIND the food by ID from the user's foods
                const food = user.foods.id(foodId)
                // MAP each attribute from the updated food object to
                // the same attribute on the original food
                food.breakfast = updatedFood.breakfast
                food.lunch = updatedFood.lunch
                food.dinner = updatedFood.dinner
             
                // SAVE the updated user and return the PROMISE
                return user.save()

            })
            .then(() => {
                // THEN once the user has saved, REDIRECT to the 
                // food's SHOW page
                response.redirect(`/users/${userId}/foods/${foodId}`)
            })
    
    })


// SHOW route
router.get('/:foodId', (request, response) => {
    
        // GRAB the user ID from the parameters
        const userId = request.params.userId
        
        // GRAB the food ID from the parameters
        const foodId = request.params.foodId
    
        // USE the userModel to find the user by ID
        UserModel.findById(userId)
            .then((user) => {
                // THEN once the user has been returned,
                // FIND the food by ID from the user's foods
                const food = user.foods.id(foodId)
    
                // THEN render the food info using Handlebars
                // and pass the userId to use in link URLs
                response.render('foods/show', {
                    food: food,
                    userId: userId
                })
            })
            .catch((error) => {
                console.log(error)
            })
    })

//Create Delete Route 
router.get('/:foodId/delete', (request, response) =>{
    const userId = request.params.userId
    const foodId = request.params.foodId

    UserModel.findById(userId)
        .then((user) =>{
            const food = user.foods.id(foodId).remove()
            return user.save()
        })
        .then(() =>{
            response.redirect(`/users/${userId}/foods`)
        })
})

module.exports = router;