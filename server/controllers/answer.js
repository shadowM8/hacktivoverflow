const Answer = require('../models/answer')
const Question = require('../models/question')

module.exports = {
    createAnswer: (req, res) => {
        Answer
            .create({
                title: req.body.title,
                description: req.body.description,
                createdBy: req.user.id
            })
            .then(answer => {
                return Question.updateOne({
                    _id: req.body.questionId
                }, {
                        $push: {
                            answers: [answer._id]
                        }
                    })
                    .then(() => {
                        res.status(201).json(answer)
                    })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    readAllAnswer: (req, res) => {
        Answer
            .find({})
            .then(answers => {
                res.status(200).json(answers)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    readOneAnswer: (req, res) => {
        Answer
            .findOne({
                _id: req.params.id
            })
            .then(answer => {
                res.status(200).json(answer)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    updateAnswer: (req, res) => {
        Answer
            .findOneAndUpdate({
                _id: req.params.id
            }, { $set: req.body }, { new: true })
            .then(answer => {
                res.status(200).json(answer)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    upVoteAnswer: (req, res) => {
        Answer
            .findOneAndUpdate({
                _id: req.params.id
            }, {
                    $push: {
                        upvotes: [req.user.id]
                    }
                }, { new: true })
            .then(answer => {
                console.log('masuk',answer)
                res.status(200).json(answer)
            })
            .catch(err => {
                console.log('error',err)
                res.status(500).json(err)
            })
    },
    downVoteAnswer: (req, res) => {
        Answer
            .findOneAndUpdate({
                _id: req.params.id
            }, {
                    $push: {
                        downvotes: [req.user.id]
                    }
                }, { new: true })
            .then(answer => {
                res.status(200).json(answer)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    removeUpvoteAnswer: (req, res) => {
        Answer
            .findOneAndUpdate({
                _id: req.params.id
            }, {
                    $pull: {
                        upvotes: req.user.id
                    }
                }, { new: true })
            .then(answer => {
                res.status(200).json(answer)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    removeDownvoteAnswer: (req, res) => {
        Answer
            .findOneAndUpdate({
                _id: req.params.id
            }, {
                    $pull: {
                        downvotes: req.user.id
                    }
                }, { new: true })
            .then(answer => {
                res.status(200).json(answer)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}