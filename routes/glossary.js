const express = require('express');
const router = express.Router();
const fs = require('fs')
var ObjectId= require('mongodb').ObjectId


//get all glossary terms
router.get('/', function(req, res, next) {

    try {
        req.app.locals.collection.find({}).toArray(function (err, result){
            if (err) {
                throw err;
            }
            res.json(result)
        })
    }
    catch (error) {
        console.log('Error', error)
    }

})


//add a new array element
router.post('/', function (req, res, next) {

    try {
        req.app.locals.collection.insertOne(req.body)
    }
    catch (error) {
        console.log('Error', error)
    }

   res.send("OK")
})


//delete a specific array element
router.delete('/:id', function (req, res, next) {

    try {
        req.app.locals.collection.deleteOne({ _id: ObjectId(req.params.id) }, function (err, obj) {
            if (err) { 
                throw err
            }
            else {
                res.send("OK")
            }
        })
    }
    catch {
        res.send("NOT OK")
    }

})


//replace an array element with an updated element
router.put('/:id', function (req, res, next) {

    try {
        req.app.locals.collection.replaceOne({_id: ObjectId(req.params.id)}, req.body)
        res.send("OK")
    }
    catch (error) {
        console.log('Error', error)
    }
   
})


module.exports = router;
