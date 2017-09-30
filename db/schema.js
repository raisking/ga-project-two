const mongoose = require('mongoose');
//Instantiate a namespace for our Schema 
//constructor defined by mongoose
const Schema = mongoose.Schema;

const ListSchema = new Schema({
    name:{
        type: String,
        required: true,
        
    },
    qty: {
        type: Number,
        required: true
    },
    
})

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },

    lists: [ListSchema]

})


//create models for each schema
const UserModel = mongoose.model('User', UserSchema);
const ListModel = mongoose.model('List', ListSchema);


//Export each model so they can be required elesewhere
module.exports = {
    UserModel: UserModel,
    ListModel: ListModel
   
}