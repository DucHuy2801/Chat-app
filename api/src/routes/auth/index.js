'use strict'

const express = require("express")
const router = express.Router()
const authController = require("../../controllers/auth.controller")
const { asyncHandler } = require("../../helper/asyncHandler")

router.post('/register', asyncHandler(authController.register))
router.post('/signin', asyncHandler(authController.signin))

module.exports = router