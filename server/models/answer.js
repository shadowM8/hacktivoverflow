const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
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
    }
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer