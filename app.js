const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const app = express()
const tasks = require('./routes/routes')
const rateLimiter = require('express-rate-limit')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// use express
app.use(express.static('./public'))
app.use(express.json())

// extra security
app.set('trust proxy',1)
app.use(rateLimiter({
    windowMs:15 * 60 * 1000,
    max: 100,
    standardHeaders:true,
    legacyHeaders:false
}))
app.use(cors())
app.use(helmet())
app.use(xss())




// routes
app.use('/api/v2/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)


// connect DB
mongoose.connect(process.env.MONGO_URI)


const port = process.env.PORT || 3000
const start = async () => {
    try {
        
        app.listen(port, () => 
        console.log(`Server is listening on the port ${port}`)
        )
    } catch (error) {
        console.log(error);
    }
}
start()