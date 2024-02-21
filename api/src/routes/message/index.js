'use strict'

const express = require("express")
const router = express.Router()
const messageController = require("../../controllers/message.controller")
const { asyncHandler } = require("../../helper/asyncHandler")

router.post("", asyncHandler(messageController.createMessage))
router.get("/:conversationId", asyncHandler(messageController.getMessage))

module.exports = router