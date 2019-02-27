const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { comparePass } = require('../helpers/password')


module.exports = {
    login: (req, res) => {
        User
            .findOne({
                email: req.body.email
            })
            .then(findResult => {
                if (!findResult) res.status(404).json({ msg: `user not found` })
                else {
                    if (!comparePass(req.body.password, findResult.password)) res.status(401).json({ msg: `incorrect password` })
                    else {
                        let token = jwt.sign({
                            id: findResult._id,
                            email: findResult.email,
                            name: findResult.name,
                            gender: findResult.gender,
                            role : findResult.role
                        }, process.env.JWT_SECRET)
                        res.status(200).json({ access_token: token, id : findResult._id, name: findResult.name })
                    }
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    register: function (req, res) {
        User
            .create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                gender : req.body.gender,
                role : req.body.role
            })
            .then(createResult => {
                let userId = createResult._id
                // Cart.create({ userId: userId })
                res.status(201).json(createResult)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    createAdmin: function (req, res) {
        User
            .create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                gender : req.body.gender,
                role: 'admin'
            })
            .then(createResult => {
                res.status(201).json(createResult)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    findAll: function (req, res) {
        User
            .find({})
            .then(findResult => {
                res.status(200).json(findResult)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}