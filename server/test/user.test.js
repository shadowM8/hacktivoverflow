const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')
const jwt =require('jsonwebtoken')
const {comparePass} = require('../helpers/password')

chai.use(chaiHttp)

before(function (done){
    User.remove({},()=>{
        done()
    })
})

after(function (done){
    User.remove({},()=>{
        done()
    })
})

describe(`testing /users/ endpoint`, function(){
    let userEmail = null
    let userName = null
    let userGender = null
    let userRole = null
    let userPassword = null
    let userId = null
    describe(`POST /user/register success case`, function () {
        it(`POST /users/register should send an object of inserted user with 201 status code`, function (done) {
            let testUser = {
                name: `testing Keriting`,
                email: `test01@mail.com`,
                gender : 'male',
                password: `1234`,
                role : 'admin'
            }
            chai
                .request(app)
                .post('/users/register')
                .send(testUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('email')
                    expect(res.body).to.have.property('password')
                    expect(res.body).to.have.property('role')
                    expect(res.body).to.have.property('gender')
                    expect(res.body.name).to.equal(testUser.name)
                    expect(res.body.email).to.equal(testUser.email)
                    expect(res.body.gender).to.equal(testUser.gender)
                    expect(res.body.role).to.equal(testUser.role)
                    expect(comparePass(testUser.password, res.body.password)).to.equal(true)
                    userEmail = res.body.email
                    userPassword = testUser.password
                    userId = res.body._id
                    userName = res.body.name
                    userGender = res.body.gender
                    userRole = res.body.role
                    done();
                })
        })
    })

    describe(`POST /user/register failed case`, function() {
        it(`POST /users/register no input name, should return "name must be filled" `, function (done) {
            let testUser = {
                name: ``,
                email: `test02@mail.com`,
                gender : 'male',
                password: `1234`,
                role : 'admin'
            }
            chai
                .request(app)
                .post('/users/register')
                .send(testUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.include(`name must be filled`)
                    done();
                })
        })

        it(`POST /users/register no input email, should return "email must be filled" `, function (done) {
            let testUser = {
                name: `Jankovic`,
                email: ``,
                gender : 'male',
                password: `1234`,
                role : 'admin'
            }
            chai
                .request(app)
                .post('/users/register')
                .send(testUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.include(`email must be filled`)
                    done();
                })
        })

        it(`POST /users/register no input password, should return "password must be filled" `, function (done) {
            let testUser = {
                name: `Jankovic`,
                email: `anton03@mail.com`,
                gender : 'male',
                password: ``,
                role : 'admin'
            }
            chai
                .request(app)
                .post('/users/register')
                .send(testUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.include(`password must be filled`)
                    done();
                })
        })

        it(`POST /users/register input invalid email , should return "Please fill valid email address" `, function (done) {
            let testUser = {
                name: `Jankovic`,
                email: `anton03com`,
                gender : 'male',
                password: `1234`,
                role : 'admin'
            }
            chai
                .request(app)
                .post('/users/register')
                .send(testUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.include("Please fill valid email address")
                    done();
                })
        })
    })

    describe(`POST /users/login, success case`, function () {
        it(`POST /users/login should send a token when login succeeds`, function (done) {
            let loginUser = {
                email: userEmail,
                password: userPassword
            }
            chai
                .request(app)
                .post('/users/login')
                .send(loginUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('access_token')
                    expect(res.body.access_token).to.be.a('string')
                    let decoded = jwt.verify(res.body.access_token, process.env.JWT_SECRET)
                    expect(decoded.email).to.equal(loginUser.email)
                    expect(decoded.id).to.equal(userId)
                    expect(decoded.name).to.equal(userName)
                    done()
                })
        })
    })

    describe(`POST /users/login, failed case`, function () {
        it(`POST /users/login should send a msg 'incorrect password' when password incorrect`, function (done) {
            let loginUser = {
                email: userEmail,
                password: 'wrong password'
            }
            chai
                .request(app)
                .post('/users/login')
                .send(loginUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('incorrect password')
                    done()
                })
        })

        it(`POST /users/login should send a msg 'user not found' when user not registered`, function (done) {
            let loginUser = {
                email: 'unregistered@mail.com',
                password: 'wrong password'
            }
            chai
                .request(app)
                .post('/users/login')
                .send(loginUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('user not found')
                    done()
                })
        })

        it(`should send an array with 200 status code`, function (done) {
            chai
                .request(app)
                .get('/users')
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
        })
    })


})
