//creating and exporting a Person modal based on personSchema
let mongoose = require('mongoose')
let {Schema,model}=mongoose
let personSchema = new Schema({
    name: {
    type: String,
    required: true,
    unique: true,
    },
    age:Number,
    favoriteFoods:[{type:String}]
})
module.exports = model('Person', personSchema)