const express = require('express')
const app = express()
const mongoose = require('mongoose')
const studentRoute = require('./routes/students')

require('dotenv').config()

const db = mongoose.connection

//Connecting to Mongodb 
mongoose.connect(process.env.DATABASE_URL,  { useNewUrlParser: true, useFindAndModify: false })


db.once('open', () =>  console.log('Connected to database'))
db.on('error', (err) => console.log('There has been an error connecting to db'))

//Initializing express to parse incoming data to JSON
app.use(express.json())

//Telling express to use this route
app.use(studentRoute)

app.listen(3000, () => console.log('Server is up on 3000', ))