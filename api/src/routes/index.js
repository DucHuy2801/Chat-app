'use strict'

const express = require("express")
const router = express.Router()

route.use('/v1/api/auth', require('./auth'))
route.use('/v1/api/user', require('./user'))

module.exports = router