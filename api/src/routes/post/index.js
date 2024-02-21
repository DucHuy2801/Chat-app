'use strict'

const express = require("express")
const router = express.Router()
const postController = require("../../controllers/post.controller")
const { asyncHandler } = require("../../helper/asyncHandler")

router.post("", asyncHandler(postController.createPost))
router.get("/:id", asyncHandler(postController.getPost))
router.put("/:id", asyncHandler(postController.updatePost))
router.delete("/:id", asyncHandler(postController.deletePost))
router.put("/:id/like", asyncHandler(postController.interactPost))
router.get("/timeline/:userId", asyncHandler(postController.getTimelinePost))
router.get("/profile/:username", asyncHandler(postController.getAllPostsByUsername))

module.exports = router