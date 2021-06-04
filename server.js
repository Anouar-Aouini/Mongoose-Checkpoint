const express = require("express");
const mongoose = require('mongoose')
const Person = require('./models/person');
const app = express();
app.use(express.json());
require('dotenv').config();

// connecting to database
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(
            process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log("connected to the database");
    } catch (error) {
        console.log(error);
    }
};
connectDB();
//creating and a person record based on Person modal
//then saving the record
const person = new Person({
    name: "person",
    age: 12,
    favoriteFoods: ["Pizza", "Noddles"]
}).save(function (err, data) {
    try {
        console.log("person saved")
    } catch (error) {
        console.log(error)
    }
})
//creating an array of people
const arrayOfPeople = [{
    name: "person1",
    age: 13,
    favoriteFoods: ["Pasta", "Pizza", "Sandwich"]
}, {
    name: "person2",
    age: 14,
    favoriteFoods: ["Salad", "French Fries", "Caesar Salad"]
}, {
    name: "person3",
    age: 15,
    favoriteFoods: ["Salisbury Steak", "Carpaccio", "Eggs Benedict"]
    }]
//creating many records using model.create()
const people = Person.create(arrayOfPeople).save(function (err, data) {
    try {
        console.log("person saved")
    } catch (error) {
        console.log(error)
    }
});
//searching through the database
const peopleFind = Person.find({
    name: "person1"
});
//searching for a single matching document from the database with a favoriteFoods including Pizza
const findOnePerson = Person.findOne({
    favoriteFoods: {
        $in: ["Pizza"]
    }
});
//finding the only person having this id:60b2a2e6b6c3bd3f90645cfa
const findByIdPerson = Person.findById({
    _id: "60b2a2e6b6c3bd3f90645cfa"
})
// finding a person by id then adding "hamburger" to the person's favoriteFoods then  
//saving the change
Person.findById({
    _id: "60b2a2e6b6c3bd3f90645cfa"
}).update({}, {
    $set: {
        favoriteFoods: Array.push("hamburger")
    }
}).save(function (err, data) {
    try {
        console.log("person saved")
    } catch (error) {
        console.log(error)
    }
})
//setting a person's age to 20
Person.findOneAndUpdate({
    name: "person2"
}, {
    $set: {
        age: 20
    }
}, {
    new: true
}).save(function (err, data) {
    try {
        console.log("person saved")
    } catch (error) {
        console.log(error)
    }
})
//finding the person and removing it
Person.findByIdAndRemove({
    _id: "60b2a2e6b6c3bd3f90645cfa"
})
//deleting all people with the name Mary
Person.remove({
    name: "Mary"
}, (err, date) => {
    try {
        console.log("person removed")
    } catch (error) {
        console.log(error)
    }
})
//
Perrson.find({
    favoriteFoods: {
        $in: ["burritos"]
    }                        //find people who like burritos
}).sort({
    name: 1                  //sort them by name
}).limit(2).select({         //limit the results to two documents, 
    age: false               //hide their age
}).exec((err, data => {
    try {
        console.log("excuted")
    } catch (error) {
        console.log(error)
    }
}))
console.log(process.env.PORT)
app.listen(process.env.PORT, (err) => {
    if (err) console.log(err)
    console.log(`server is connected on port 3000`)
});