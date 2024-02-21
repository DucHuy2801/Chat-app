'use strict'

const Post = require("../models/Post.model")
const User = require("../models/User.model")

class PostController {
    createPost = async(req, res, next) =>{
        const new_post = new Post(req.body)
        try {
            const saved_post = await new_post.save()
            return res.status(201).json({
                new_post: saved_post
            })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    getPost = async(req, res, next) => {
        try {
            const post = await Post.findById(req.params.id)
            return res.status(200).json({
                post: post
            })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    updatePost = async(req, res, next) => {
        try {
            const id = req.params.id
            const post = await Post.findById(id)
            if (post.userId === req.body.userId) {
                await post.updateOne({ $set: req.body })
                return res.status(200).json({ message: "Update post successfully!" })
            } else {
                return res.status(403).json({ message: "You can update only your post!" })
            }
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    deletePost = async(req, res, next) => {
        try {
            const id = req.params.id
            const post = await Post.findById(id)
            if (post.userId === req.body.userId) {
                await post.deleteOne()
                return res.status(200).json({ message: "Delete post successfully!" })
            } else {
                return res.status(403).json({ message: "You can delete only your post!" })
            }
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    // like or dislike post
    interactPost = async(req, res, next) => {
        try {
            const post = await Post.findById(req.params.id)
            if (!post.likes.includes(req.body.userId)) {
                await post.updateOne({ $push: { likes: req.body.userId }})
                return res.status(200).json({ message: "The post has been liked!" })
            } else {
                await post.updateOne({ $pull: { likes: req.body.userId }})
                return res.status(200).json({ message: "The post has been disliked!" })
            }
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    getTimelinePost = async(req, res, next) => {
        try {
            const currentUser = await User.findById(req.params.userId)
            const userPosts = await Post.find({ userId: currentUser._id })
            const friendPosts = await Promise.all(
                currentUser.followings.map((friendId) => {
                    return Post.find({ userId: friendId })
                })
            )
            return res.status(200).json(userPosts.concat(...friendPosts))
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    getAllPostsByUsername = async(req, res, next) => {
        try {
            const user = await User.findOne({ username: req.params.username })
            const posts = await Post.find({ userId: user._id })
            return res.status(200).json({ posts: posts })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = new PostController()