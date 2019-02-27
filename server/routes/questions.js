router = require('express').Router()
const Controller = require('../controllers/question')
const Auth = require('../middlewares/auth')

router.post('/', Auth, Controller.createQuestion)
router.get('/', Controller.readAllQuestion)
router.get('/:id', Controller.readOneQuestion)
router.put('/:id', Auth, Controller.updateQuestion)
router.patch('/:id/upvote', Auth, Controller.upVoteQuestion)
router.patch('/:id/downvote', Auth, Controller.downVoteQuestion)
router.patch('/:id/removeupvote', Auth, Controller.removeUpvotesQuestion)
router.patch('/:id/removedownvote', Auth, Controller.removeDownvotesQuestion)
router.delete('/:id', Auth, Controller.deleteQuestion)
module.exports = router