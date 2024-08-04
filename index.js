// environment variable will be added  to process.env file.
require('dotenv').config()   

// import express
const express = require('express')

// import cors
const cors = require('cors')

// import router
const router = require('./router')

// import mongodb
require("./db/connection")

// import application specific middleware

// const appMiddleware = require('./middleware/appMiddleware')

// create server
const projectFairServer = express()

// use cors to connect with front end
projectFairServer.use(cors())

// json() - middleware - to  convert json format
projectFairServer.use(express.json())

// server use router
projectFairServer.use(router)

// first argument - by which name the folder have to be called
// second argument - export this folder
projectFairServer.use('/uploads',express.static('./uploads'))

// use middleware
// projectFairServer.use(appMiddleware)

// port
const PORT = 3000 || process.env.PORT

// run the server
projectFairServer.listen(PORT,()=> {
    console.log(`project fair server running successfully at port number : ${PORT}`);
})

// get 
projectFairServer.get('/',(req,res)=>{
    res.send('get request recieved')
}) 

projectFairServer.post('/',(req,res)=>{
    res.send('post request recieved')
})