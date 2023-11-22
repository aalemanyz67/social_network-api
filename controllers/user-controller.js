const { User } = require('../models');

const UserController = {
    //this GET all users
    getAllUsers(req, res) {
        User.find({})
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err));
    },

    //this Gets only one user by ID
    getUserById(req, res) {
        User.findById(req.params.userId)
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err));
    },

    //This creates a user
    createUser(req, res) {
        User.create(req.body)
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err));
    },

    //This will update user by ID
    updateUserById(req, res) {
        User.findOneAndUpdate(req.params.id, req.body, { new: true})
        .then(userData => {
            if (!userData) {
                return res.statys(404).json({ message: 'User cannot be found'});
            }
            res.json(userData);
        })
        .catch(err => res.status(500).json(err));
    },

    //This will delete a user
    deleteUserById(req, res) {
        User.findOneAndDelete(req.params.id)
        .then(userData => {
            if(!userData) {
                return res.status(404).json({message: 'User cannot be found'});
            }
            res.json({message: 'User has been deleted.'});
        })
        .catch(err => res.status(500).json(err));

    },

    //this adds a friend to the users friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: {friends: req.body.friendId || req.params.friendId} },
            { new: true}
        )
        .then(userData => {
            if (!userData) {
                return res.status(404).json({message: 'User cannot be found.'});
            }
            res.json(userData);
        })
        .catch(err => res.status(500).json(err));
    },

    //this removes friend from user friends list
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )

        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'There is no user with this ID.'});
            }
            //checks if friend was removed
            const removed = !dbUserData.friends.includes(params.friendId);
            if (removed){
                res.json({message: 'Friend has been removed successfully!', dbUserData});
            }else {
                res.json(dbUserData);
            }
        })
        .catch((err) => res.status(400).json(err));
    },
};

//module to export UserController
module.exports = UserController;