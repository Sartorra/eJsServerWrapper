// Test code for eJsServerWrapper
import { eJsServerWrapper } from "./index.js"
import express from 'express'

// Create an express app
let app = express()

app.get('/', (req, res) => {
    res.send('hello world')
})

// Create a server wrapper
let serverWrapper = new eJsServerWrapper(app, './key.pem', './cert.pem')

// Connect listeners
serverWrapper.ConnectListeners()