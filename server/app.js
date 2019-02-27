const express = require('express')
const app = express()
const port = 3000
const cron = require('node-cron')
const kue = require('kue')
const queue = kue.createQueue()
const User = require('./models/user')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
require('dotenv').config()

const mongoose = require('mongoose')
var NODE_ENV = process.env.NODE_ENV
mongoose.connect(`mongodb://localhost:27017/hacktiv_flow_${NODE_ENV}`, { useNewUrlParser: true })
const cors = require('cors')

app.use(cors())

const userRoute = require('./routes/user.js')
const questionRoute = require('./routes/questions')
const answerRoute = require('./routes/answers')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

let everyFridayAt5am = '0 5 * * 5'
// cron.schedule('* * * * *', ()=> {
//     console.log('testing cron')
// })
cron.schedule(everyFridayAt5am, () => {
    User
        .find({})
        .then(users => {
            users.forEach(user => {
                queue.create('send-weekly-email',{
                    username : user.name,
                    email : user.email
                })
            })
        })
        .catch(err => {
            console.log(err)
        })
})

queue.process('send-weekly-email',(job,done) => {
    
    let transporter = nodemailer.createTransport(smtpTransport({
        service:'gmail',
        auth : {
            user: process.env.USER,
            pass: process.env.PASS
        }
    }))

    let mailOption = {
        from : process.env.USER,
        to: job.data.email,
        subject: 'weekly reminder for mini overflow',
        text: `Hey ${job.data.user} its been a week since our last email, how about you go and ask question in our site`,
        html : 'Hey hey'
    }

    transporter.sendMail(mailOption,(err,info) => {
        if(err) console.log(err)
        else {
            console.log(info)
        }
    })

    done()
})

app.use('/users', userRoute)
app.use('/questions', questionRoute)
app.use('/answers',answerRoute)

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})

module.exports = app
