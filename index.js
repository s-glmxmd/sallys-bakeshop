const express = require("express");
const app = express();
const cors = require("cors");
const port = 2000;

const Order = require('./order-model');
const bakeryOrders = new Map();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json("Welcome to Sally's bakeshop!");
}); 

app.post('/newOrder', (req, res) => {
    const orderId = req.body.name + req.body.duration;
    const newOrder = new Order({
        _id: orderId,
        name: req.body.name,
        duration: req.body.duration
    });
    bakeryOrders.set(newOrder._id, newOrder);
    console.log(bakeryOrders);
    res.json(`Baker ${newOrder.name} was given an order that will take ${newOrder.duration} hours to complete`);
});

app.listen(port, () =>{
    console.log(`Sally's bakeshop is running on port: ${port}`);
}); 