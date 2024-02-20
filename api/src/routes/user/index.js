'use strict'

const express = require("express")
const router = express.Router()
const userController = require("../../controllers/user.controller")
const { asyncHandler } = require("../../helper/asyncHandler")

router.get('/', asyncHandler(userController.getInfoUser))
router.put('/:id', asyncHandler(userController.updateUser))
router.delete('/:id', asyncHandler(userController.deleteUser))
router.get('/friends/:userId', asyncHandler(userController.getFriends))
router.put("/:id/follow", asyncHandler(userController.followUser))
router.put("/:id/unfollow", asyncHandler(userController.unfollowUser))

module.exports = router