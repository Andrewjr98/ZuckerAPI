const { User, Thought} = require('../models');

module.exports = {
    getFeed(req,res){
        Thought.find()
        .then((Thought) => res.json(Thought))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req,res){
        Thought.findMany({ _username: req.params.username})
        .select
    },
    createNewThought(req,res){
        Thought.create(req.body)
        .then((Thought) => res.json(Thought))
        .catch((err) => res.status(500).json(err))
    },
    updateThought(req,res){
        Thought.findOneAndUpdate(
            { thoughtText: req.params.thoughtText},
            {$set: req.body},
            { runValidators: true, new: true }
        )
        .then((Thought) =>
        !Thought
        ? res.status(404).json({ message: 'No matching thoughts'})
        : res.json(Thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)
        })
    },
    deleteThought(req,res){
        Thought.findOneAndDelete({})
    },
    addReaction(req,res){
        Thought.findOneAndUpdate(
            { _id: req.params.reactionId },
            { $addToSet: {reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((Thought) =>
        !Thought
        ? res.status(404).json({'This Thought does not exist'})
        : res.json(Thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    removeReaction(req,res){
        Thought.findOneAndUpdate(
            { _id: req.params.reactionId },
            {$pull: { reactions: {reactionId: req.params.reactionId} } }
            {runValidators: true, new: true}
        )
        .then((Thought) => 
    !Thought
    ? res.status(404).json({ message:'This Reaction does not exist'})
    : res.status(Thought)
    )
    .catch((err) => res.status(500).json(err));
    }
}