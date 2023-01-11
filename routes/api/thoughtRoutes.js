const router = require('express').Router();

const {
   getFeed,
   getSingleThought,
   createThought,
   updateThought,
   deleteThought, 
   addReaction,
   removeReaction
}= require('../../controllers/thoughtController');
const { get } = require('../../models/Reactions');

router.route('/').get(getFeed).post(createThought);

router
.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.deleteThought(deleteThought);

router
.route('/:thoughtId/reactions')
.post(addReaction)
.delete(removeReaction);

module.exports = router;