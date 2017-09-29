const mongoose = require('mongoose');
//Instantiate a namespace for our Schema 
//constructor defined by mongoose
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    }
    // email:{
    //     type: String,
    //     required: true
    // },
    // location: {
    //     type: String,
    //     required: true
    // },
    // store: {
    //     type: Number,
    //     required: true
    // }
})

const ListSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    qty: {
        type: Number,
        required: true
    },
    users: [UserSchema]
})
//create models for each schema
const ListModel = mongoose.model('List', ListSchema);
const UserModel = mongoose.model('User', UserSchema);

//Export each model so they can be required elesewhere
module.exports = {
    ListModel: ListModel,
    UserModel: UserModel
}