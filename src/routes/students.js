const express = require('express')
const Student = require('../models/student')
const route = new express.Router()

//Create student
route.post('/students', async(req, res) => {
    const student = new Student(req.body)

    try{
        const newStudent = await student.save()
        res.status(201).send(newStudent)
    }catch(e){
        res.status(500).send({message: e.message})
    }
})

//Read students
route.get('/students', async(req, res) => {
    try{
        const students = await Student.find({})
        res.send(students)
    }catch(e){
        res.status(500).send({message: e.message})
    }
})

//Read individual student
route.get('/students/:id', async(req, res) => {
    const _id = req.params.id

    try{
        const student = await Student.findById(_id)

        if(!student){
            return res.status(404).send('The student with that ID could not be found.')
        }

        res.send(student)

    }catch(e){
        res.status(500).send({message: e.message})
    }
})

//Update student
route.patch('/students/:id', async(req,res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'DOB', 'email', 'phone', 'belt', 'currentProgram', 'membership']


    
    try{
        const student = await Student.findById(_id)
        
        if(!student){
            return res.status(404).json('The student with that ID could not be found')
        } 

        updates.forEach((update) => {
            if(allowedUpdates.includes(update)){
                student[update] = req.body[update]
            }else{
                return res.status(400).json(`${update} is not a valid thing to update`)
            }
        })

        await student.save()

        res.send(student)
    }catch(e){
        res.status(500).send({message: e.message})
    }
})

//Delete student
route.delete('/students/:id', async(req, res) => {
    const _id = req.params.id

    try{
        const student = await Student.findByIdAndDelete(_id)

        if(!student){
            return res.status(404).json('User with that ID could not be found.')
        }

        res.send(student)
    }catch(e){
        res.status(500).send({message: e.message})
    }
})

module.exports = route

