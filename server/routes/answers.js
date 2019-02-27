const router = require('express').Router()
const Controller = require('../controllers/answer')
const Auth = require('../middlewares/auth')

router.post('/', Auth, Controller.createAnswer)
router.get('/', Controller.readAllAnswer)
router.get('/:id', Auth, Controller.readOneAnswer)
router.put('/:id', Auth, Controller.updateAnswer)
router.patch('/:id/upvote', Auth, Controller.upVoteAnswer)
router.patch('/:id/downvote', Auth, Controller.downVoteAnswer)
router.patch('/:id/removeupvote', Auth, Controller.removeUpvoteAnswer)
router.patch('/:id/removedownvote', Auth, Controller.removeDownvoteAnswer)

module.exports = router