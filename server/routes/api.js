const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/mean', (err, client) => {
        if (err) return console.log(err);

        let db = client.db('mean');

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
/*router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});*/

router.get('/orders', (req, res) => {
    connection((db) => {
        db.collection('order').aggregate([
            { $lookup:
                {
                    from: 'customers',
                    localField: 'customerNumber',
                    foreignField: 'customerNumber',
                    as: 'customerDetail'
                }
            },
            { $unwind: "$customerDetail"},
            { $project:
                {
                    "_id" : 0,
                    "orderNumber" : 1,
                    "orderDate" : 1,
                    "requiredDate" : 1,
                    "shippedDate" : 1,
                    "itemQty" : 1,
                    "status" : 1,
                    "remarks" : 1,
                    "customerNumber" : 1,
                    "customerDetail.customerName" : 1,
                    "customerDetail.contactLastName" : 1,
                    "customerDetail.contactFirstName" : 1,
                    "customerDetail.phone" : 1,
                    "customerDetail.addressLine1" : 1,
                    "customerDetail.addressLine2" : 1,
                    "customerDetail.city" : 1,
                    "customerDetail.title" : 1,
                    "customerDetail.creditLimit" : 1,
                    "customerDetail.createDate" : 1,
                    "customerDetail.updateDate" : 1
                }
            }
        ])
            //.find()
            .toArray()
            .then((orders) => {
                response.data = orders;
                response.rows = orders;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;