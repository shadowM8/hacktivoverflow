const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    title : {
        type : String,
        required: [true, `title must be filled`]
    },
    description : {
        type : String,
        required: [true, `description must be filled`]
    },
    upvotes : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
    downvotes : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
    createdBy : {
        type : Schema.Types.ObjectId, ref:'User'
    },
    answers : [{
        type : Schema.Types.ObjectId,
        ref : 'Answer'
    }]
    
})

const Question = mongoose.model('Question',questionSchema)

module.exports = Question