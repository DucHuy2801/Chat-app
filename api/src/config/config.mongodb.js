'use strict'

const mongoose = require("mongoose")
const mongoose_uri = process.env.MONGOOSE_URI
const MAX_POLL_SIZE = 50;
const TIME_OUT_CONNECT = 3000;

class Database {
    constructor() {
        this.connect()
    }

    connect(type = 'mongodb') {
        mongoose.connect(mongoose_uri, {
            serverSelectionTimeoutMS: TIME_OUT_CONNECT,
            maxPoolSize: MAX_POLL_SIZE
        }).then(_ => {
            console.log(`Connect to MongoDB successfully!`)
        }).catch(err => {
            console.log(err)
        })
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }

        return Database.instance
    }
}

const instanceMongoDB = Database.getInstance()
module.exports = instanceMongoDB