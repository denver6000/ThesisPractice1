import express, { application } from "express"
import {createServer} from "http"
import test from "./util.js"

const expressApp = express()
const httpServer = createServer(expressApp)

const port = 80 || process.env.PORT

httpServer.listen(port, () => {
    console.log(`Listening on ${port}`)
})