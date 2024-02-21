'use strict'

const express = require("express")
const router = express.Router()
const conversationController = require("../../controllers/conversation.controller")
const { asyncHandler } = require("../../helper/asyncHandler")

router.post("", asyncHandler(conversationController.createConversation))
router.get("/:userId", asyncHandler(conversationController.getConversationByUser))
router.get("/find/:firstUserid/:secondUserId", asyncHandler(conversationController.getConversationByTwoUserId))

module.exports = router