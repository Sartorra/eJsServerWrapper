/*
    eJsServerWrapper

    This is a wrapper for express apps.
    It allows you to run express apps as a http or https server.
*/
// Dependencies
import express from 'express'
import fs from 'fs'
import http from 'http'
import https from 'https'

/*
    @method CreateHTTPSOptions
    @param {string} keyPath
    @param {string} certPath
    @returns {object}
    @description Creates an object with the key and cert for https
*/
let CreateHTTPSOptions = (keyPath, certPath) => {
    return {
        key: fs.readFileSync(keyPath, 'utf8'),
        cert: fs.readFileSync(certPath, 'utf8')
    }
}

/*
    @class eJsServerWrapper
    @description This is a wrapper for express apps, allowing you to run express apps as a http or https server.
*/
class eJsServerWrapper {
    /*
        @constructor
        @param {express}
        @param {string} keyPath
        @param {string} certPath
    */
    constructor(app, keyPath, certPath) {
        // Create http and https servers
        this.httpServer = http.createServer(app)
        this.httpsServer = https.createServer(CreateHTTPSOptions(keyPath, certPath), app)
        
        // Misc
        this.app = app
    }

    /*
        @method ConnectListeners
        @param {number} [httpPort=8080] - The port to listen on for http
        @param {number} [httpsPort=8443] - The port to listen on for https
        @description Connects the listeners to the servers
    */
    ConnectListeners(httpPort = 8080, httpsPort = 8443) {
        // Connect listeners
        this.httpServer.listen(httpPort)
        this.httpsServer.listen(httpsPort)
    }

    /*
        @method DisconnectListeners
        @description Disconnects the listeners from the servers
    */
    DisconnectListeners() {
        // Disconnect listeners
        this.httpServer.close()
        this.httpsServer.close()
    }
}

export { eJsServerWrapper }