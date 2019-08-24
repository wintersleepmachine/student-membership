const mongoose = require('mongoose')

const Student = mongoose.model('Member', {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    DOB:{
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
    },
    phone: {
        type: Number,
        trim: true,
    },
    currentProgram: {
        type:String,
        required: true,
        trim: true
    }, 
    belt: {
        type: Array
    },
    membership: {
        type: String,
        required: true
    }
})

module.exports = Student