'use strict'

const Message = require("../models/Message.model")

class MessageController {
    createMessage = async(req, res, next) => {
        const newMessage = new Message(req.body)

        try {
            const savedMessage = await newMessage.save()
            return res.status(201).json({
                new_message: savedMessage
            })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    getMessage = async(req, res, next) => {
        try {
            const messages = await Message.find({
                conversationId: req.params.conversationId
            })
            return res.status(200).json({
                messages: messages
            })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = new MessageController()