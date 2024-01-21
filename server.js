const express = require('express');
const app = express();
require('dotenv').config({path: 'pass.env'});
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true}, {useUnifiedTopology: true});

const notesSchema = {
    title: String,
    description: String,
    date: Date,
    people: Number,
    price: Number
}
const Note = mongoose.model('Note', notesSchema); 



app.get("/", function(req, res) {
    res.sendFile(__dirname + '/rideshare_newpost.html');
})

app.post("/", function(req, res){
    let newNote = new Note({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        people: req.body.people,
        price: req.body.price
    });
    newNote.save();
    res.redirect('/');
})

app.listen(3000, function () {
    console.log('listening on port new');
})