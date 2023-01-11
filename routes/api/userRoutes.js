const router = require('express').Router();
const { route } = require('.');
const {
    getUsers,
    getSingleUser,
    createNewUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController')

router.route('/').get(getUsers).post(createNewUser);

route.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;