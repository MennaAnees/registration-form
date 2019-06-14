const express = require("express");
const router = express.Router();
const User = require('../models/user');
const uuid = require('uuid');


var addUser = function (params) {
    return new Promise(function (resolve, reject) {

        User.create(params, function (err, data) {
            if (err)
                reject(err.message);
            resolve(data);
        })

    });
}
router.post("/register", async (req, res) => {
    debugger;
    const { body } = req;

    try {
        var user = await addUser(body)
        res
            .status(200)
            .send({ data: user })
    } catch (err) {
        res
            .status(400)
            .send({ error: err })
    }
});


module.exports = router;
