const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {encryptPass} = require('../helpers/password')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, `name must be filled`]
    },
    gender : {
        type : String,
        required : [true, `gender must be filled`]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, `email must be filled`],
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `Please fill valid email address`],
        validate: [checkUnique, 'Email already taken']
    },
    password: {
        type: String,
        required : [true, `password must be filled`]
    },
    role : {
        type : String,
        default : 'user'
    },
})

userSchema.pre('save', function (next) {
    if(this.password) this.password = encryptPass(this.password)
    
    next()
})

function checkUnique() {
    return new Promise((resolve, reject) => {
        User.findOne({ email: this.email, _id: { $ne: this._id } })
            .then(data => {
                if (data) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
            .catch(err => {
                reject(false)
            })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = User