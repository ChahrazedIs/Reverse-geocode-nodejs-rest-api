const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
var bodyParser = require('body-parser');

const mongoose = require('mongoose');
const consts = require('./consts');
var routes = require('./routes.js');


//===============================================
//        Set up body parser
//===============================================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//=================================================
//        Mongoose Connection
//=================================================
mongoose.connect(consts.mongoURI , {
    useNewUrlParser: true
})
.then(()=>{
    console.log('MongoDB connected successfuly!');
})
.catch(err=>{
    console.log(err);
})


//=================================================
//        Routes
//=================================================

app.get('/', (req, res) => {
    res.send("Welcome to the express starter by ISMAIL Chahrazed");
});
app.use('/', routes);


//=================================================
//        Start the server
//=================================================

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});