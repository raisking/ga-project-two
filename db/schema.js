const mongoose = require('mongoose');
// First, we instantiate a namespace for our 
//Schema constructor defined by mongoose.
const Schema = mongoose.Schema;
const ListSchema = new Schema({ //User
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    }

})
const FoodSchema = new Schema({
    day: {
        type: String,
        required: true
    },
    breakfast: {
        type: String,
        required: true
    },
    lunch: {
        type: String,
        required: true
    },
    dinner: {
        type: String,
        required: true
    }
})
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: Number,
        required: true
    },
    store: {
        type: String,
        required: true
    },
    lists: [ListSchema],
    foods: [FoodSchema]
});
// Create models for each schema
const UserModel = mongoose.model('Company', UserSchema)
const ListModel = mongoose.model('Snowboard', ListSchema)
const FoodModel = mongoose.model('Food', FoodSchema)
// Export each model so they can be required elsewhere
module.exports = {
    UserModel: UserModel,
    ListModel: ListModel,
    FoodModel: FoodModel
}
