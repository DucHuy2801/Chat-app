'use strict'

const express = require("express")
const router = express.Router()

route.use('/v1/api/auth', require('./auth'))
route.use('/v1/api/user', require('./user'))
route.use('/v1/api/post', require('./post'))
route.use('/v1/api/conversation', require('./conversation'))
route.use('/v1/api/message', require('./message'))

module.exports = router