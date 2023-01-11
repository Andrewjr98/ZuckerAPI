const { User, Thought} = require('../models');

module.exports = {
    getUsers(req,res){
        User.find()
        .then((User)=> res.json(User))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req,res){
        User.findOne({_id: req.params.userId})
        .select('-__v')
        .then((User)=>
        !User
        ? res.status(404).json({message: 'User Not Found'})
        : res.json(User)
        )
        .catch((err)=> res.status(500).json(err));
    },
    createNewUser(req,res){
        User.create(req.body)
        .then((User) => res.json(User))
        .catch((err) => res.status(500).json(err));
    },
    updateUser(req,res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $set: req.body },
            { runValidators: true, new: true}
        )
        .then((User) =>
        !User
        ? res.status(404).json({message: 'No user with this Id'})
        : res.json(User)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)
        })
    },
    deleteUser(req,res){
        User.findOneAndDelete({ _id: req.params.userId})
        .then((User) => 
        !User
        ? res.status(404).json({ message: 'User Id is incorrect or does not exist.'})
        : Thought.deleteMany({ _id: {$in: User.thoughts} })
        )
        .then(() => res.join({ message: 'User and their thoughts have been Destroyed!'}))
        .catch((err) => res.status(500).json(err))
    },
    addNewFriend(req,res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            {$addToSet: {friends: req.body} },
            { runValidators: true, new: true }
        )
        .then((User) =>
        !User
        ? res.status(404).json({ message: 'No User with this ID!'})
        : res.json(User)
        )
        .catch((err) => res.status(500).json(err));
    },
    removeFriend(req,res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { userId: req.params.userId } } },
            {runValidators: true, new: true }
        )
        .then((User) =>
        !User
        ? res.status(404).json({ message: 'No User with this ID :( '})
        : res.json(User)
        )
        .catch((err) => res.status(500).json(err));
    }
}