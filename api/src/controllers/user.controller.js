'use strict'
const User = require("../models/User.model")
const bcrypt = require("bcrypt")

class UserController {
    
    getInfoUser = async(req, res, next) => {
        const userId = req.query.userId;
        const username = req.query.username;
        
        try {
            const user = userId ? await User.findById(userId) : await User.findOne({ username: username })
            const { password, updatedAt, ...other } = user._doc 
            return res.status(200).json({
                data: other
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }

    updateUser = async(req, res, next) => {
        if (req.body.userId === req.params.id || req.body.isAdmin ) {
            if (req.body.password) {
                try {
                    const salt = await bcrypt.genSalt(10)
                    req.body.password = await bcrypt.hash(req.body.password, salt)
                } catch (error) {
                    return res.status(500).json({ message: error.message })
                }
            }

            try {
                const user = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                })
                return res.status(200).json({ message: "Account has been updated successfully!" })
            } catch (error) {
                    return res.status(500).json({ message: error.message })
            }
        }
    }

    deleteUser = async(req, res, next) => {
        if (req.body.userId == req.params.id || req.body.isAdmin ) {
            try {
                await User.findByIdAndDelete(req.params.id)
                return res.status(200).json({ message: "Account has been deleted!" })
            } catch (error) {
                return res.status(500).json({ message: error.message })
            }
        } else {
            return res.status(403).json({ message: "You can delete only your account!" })
        }
    }

    followUser = async(req, res, next) => {
        if (req.body.userId = req.params.id) {
            try {
                const user = await User.findById(req.params.id)
                const currentUser = await User.findById(req.body.userId)
                if (!user.followes.includes(req.body.userId)) {
                    await user.updateOne({ $push: { followes: req.body.userId }})
                    await currentUser.updateOne({ $push: { followings: req.params.id }})
                    return res.status(200).json({ message: "You follow this use successfully!" })
                } else {
                    return res.status(403).json({ message: "You have already follow this user!" })
                }
            } catch (error) {
                return res.status(500).json({ message: error.message })
            }
        } else {
            return res.status(403).json({ message: "You can't follow yourself!" })
        }
    }

    unfollowUser = async(req, res, next) => {
        if (req.body.userId = req.params.id) {
            try {
                const user = await User.findById(req.params.id)
                const currentUser = await User.findById(req.body.userId)
                if (!user.followes.includes(req.body.userId)) {
                    await user.updateOne({ $pull: { followes: req.body.userId }})
                    await currentUser.updateOne({ $pull: { followings: req.params.id }})
                    return res.status(200).json({ message: "You unfollow this user successfully!" })
                } else {
                    return res.status(403).json({ message: "You don't follow this user!" })
                }
            } catch (error) {
                return res.status(500).json({ message: error.message })
            }
        } else {
            return res.status(403).json({ message: "You can't unfollow yourself!" })
        }
    }

    getFriends = async(req, res, next) => {
        try {
            const user = await User.findById(req.params.userId)
            const friends = await Promise.all(
                user.followings.map((friendId) => {
                    return User.findById(friendId)
                })
            )
            let friendList = [];
            friends.map((friend) => {
                const { _id, username, profile_picture } = friend
                friendList.push({ _id, username, profile_picture })
            })
            return res.status(200).json({ friend_list: friendList })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = new UserController()