const express = require("express");
const app = express();
const cors = require("cors");
const uuid = require("uuid");
const underscore = require("underscore");
const port = 2000;

const Order = require('./order-model');
const bakerSchedule = new Map();
bakerSchedule.set("LarryV", {currentAvailability: 7});
bakerSchedule.set("HenryH", {currentAvailability: 5});
bakerSchedule.set("SaraK", {currentAvailability: 3});
bakerSchedule.set("AllieD", {currentAvailability: 3});

let orders = [];


app.use(cors());
app.use(express.json());

app.get('/orders', (req, res) => {
    const sortedOrders = underscore.sortBy(orders, 'name');
    res.json(sortedOrders);
}); 

app.post('/deleteOrder', (req, res) => {
    let orderId = "";
    orders.forEach(order => {
        if (order._id = req.body.id){
            orderId = order._id;
            let orderIndex = orders.indexOf(orderId);
            orders.splice(orderIndex);
        }
    });

    console.log("Spliced:", orders);

    res.json(orders);
})

app.post('/newOrder', (req, res) => {
    
    if (bakerSchedule.has(req.body.name)){
        const baker = bakerSchedule.get(req.body.name);
        const availability = baker.currentAvailability + parseInt(req.body.duration);
        if (availability <= 8) {
            const newSchedule = {
                currentAvailability: availability
            };
            bakerSchedule.set(req.body.name, newSchedule);
            //console.log("Current baker scheudle", bakerSchedule.entries());

            const newOrder = new Order({
                name: req.body.name,
                duration: req.body.duration
            });

            orders.push({
                _id: newOrder._id,
                name: newOrder.name,
                duration: newOrder.duration
            });
            console.log("Current Orders", orders);
            
            res.json(`Baker ${req.body.name} was given an order that will take ${req.body.duration} hour(s) to complete`);
        } else {

            res.json(`Sorry, baker ${req.body.name} only has ${8 - baker.currentAvailability} hour(s) available and cannot take this order.`);
        }
    } else {

        res.json(`Sorry, ${req.body.name} does not work at Sally's bakeshop`);
    }


});

app.listen(port, () =>{
    console.log(`Sally's bakeshop is running on port: ${port}`);
}); 