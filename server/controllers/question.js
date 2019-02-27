const Question = require('../models/question')

module.exports = {
    createQuestion: (req, res) => {
        Question
            .create({
                title: req.body.title,
                description: req.body.description,
                createdBy: req.user.id
            })
            .then(question => {
                res.status(201).json(question)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    readAllQuestion: (req, res) => {
        Question
            .find({}).populate('createdBy')
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    readOneQuestion: (req, res) => {
        Question
            .findOne({
                _id: req.params.id
            }).populate('createdBy').populate({
                path: 'answers',
                options: {
                    populate: {
                        path: 'createdBy'
                    }
                }
            })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    updateQuestion: (req, res) => {
        Question
            .findOneAndUpdate({
                _id: req.params.id
            }, { $set: req.body }, { new: true })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    deleteQuestion: (req, res) => {
        Question
            .findOneAndDelete({
                _id: req.params.id
            })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    upVoteQuestion: (req, res) => {
        Question
            .findOneAndUpdate({
                _id: req.params.id
            }, {
                    $push: {
                        upvotes: [req.user.id]
                    }
                }, { new: true })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                res.status(200).json(err)
            })
    },
    downVoteQuestion: (req, res) => {
        Question
            .findOneAndUpdate({
                _id: req.params.id
            }, {
                    $push: {
                        downvotes: [req.user.id]
                    }
                }, { new: true })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    removeUpvotesQuestion : (req,res) => {
        Question
            .findOneAndUpdate({
                _id: req.params.id
            },{
                $pull : {
                    upvotes : req.user.id
                }
            })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    removeDownvotesQuestion : (req,res) => {
        Question
            .findOneAndUpdate({
                _id: req.params.id
            },{
                $pull : {
                    downvotes : req.user.id
                }
            })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}