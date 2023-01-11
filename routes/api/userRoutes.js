const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createNewUser,
    updateUser,
    deleteUser,
    addNewFriend,
    removeFriend
} = require('../../controllers/userController')

router.route('/').get(getUsers).post(createNewUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addNewFriend).delete(removeFriend);

module.exports = router;