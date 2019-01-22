//--------------------------------------------------------------------------------------------------
//App Config
const PORT = 3000;

//--------------------------------------------------------------------------------------------------
//Load package dependency
const express = require("express");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

//--------------------------------------------------------------------------------------------------
//Mongoose config
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const MONGODB_URI = 'mongodb://localhost:27017/modusin'
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
})

//--------------------------------------------------------------------------------------------------
//Create mongoose Model
const Customers = mongoose.model("customers", new Schema({
    first_name: String,
    last_name: String,
    age: Number,
    address: {
        street: String,
        city: String,
        state: String
    }
}, {
    timestamps: true
}))



//--------------------------------------------------------------------------------------------------
//API Response
app.get("/", (req, res) => {
    res.send({
        name: "API Project 3",
        version: "1.0.0",
        author: "John Doe"
    });
});

app.get("/customers", (req, res) => {
    Customers.find().then(customers => {
        if (customers === null) {
            return res.send({
                message: "data not found"
            })
        }
        res.send({
            data: customers
        })
    })
});

app.get("/customers/:_id", (req, res) => {
    Customers.findById(req.params._id).then(customers => {
        if (customers === null) {
            return res.send({
                message: "data not fund"
            })
        }

        res.send({
            data: customers
        })
    })
});

app.post("/customers", (req, res) => {
    Customers.create(req.body, (error, customer) => {
        if (error) return res.send({
            message: "Error",
            data: error
        });

        res.send({
            message: "Insert new customer success",
            data: customer
        });
    });
})

//Run app and console log notif
app.listen(PORT, () => console.log(`Application Running on  port ${PORT}`))