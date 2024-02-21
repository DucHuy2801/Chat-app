'use strict'

const Conversation = require("../models/Conversation.model")

class ConversationController {
    createConversation = async(req, res, next) => {
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId]
        })

        try {
            const savedConversation = await newConversation.save()
            return res.status(201).json({
                new_conversation: savedConversation
            })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    getConversationByUser = async(req, res, next) => {
        try {
            const conversation = await Conversation.find({
                members: { $in: [req.params.userId] }
            })
            return res.status(200).json({
                conversation: conversation
            })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
    
    getConversationByTwoUserId = async(req, res, next) => {
        try {
            const conversation = await Conversation.find({
                members: { $in: [req.params.firstUserId, req.params.secondUserId] }
            })
            return res.status(200).json({
                conversation: conversation
            })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = new ConversationController()