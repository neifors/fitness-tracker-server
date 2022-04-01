const express = require('express');
const router = express.Router();
const Habit= require('../models/Habit.js')

let now= new Date().getTime()
let week1=now+(3600*24*7*1000)

// let finish=new Date(week1).toUTCString().slice(0,16)

router.get('/:username', async (req, res)=>{
    try {
        const habits = await Habit.gethabits(req.params.username)
        res.json(habits)
    } catch(err) {
        res.status(500).json({err})
    }
})

router.post('/', async (req, res)=>{
    try {
        let data= {
            username: req.body.username,
            habitName: req.body.habitName,
            frequency: req.body.frequency,
            notes: req.body.notes,
            startDate: now,
            finishDate: week1,
            complete: false,
            currentStreak: 0,
            topStreak: 0,
            outOfWeek: false,
            lastUpdate: ""
        }
        const newhabit = await Habit.create(data)
        if (!newhabit){
            return res.status(500).json({err: 'habit couldnt be created'})
        }
        res.status(201).json({msg: 'Habit created', habit: newhabit})
        console.log(newhabit)

    } catch(err){
        res.status(500).json({err})
    }
})

router.delete('/:id', async (req, res)=>{
    try {
        const habits = await Habit.delete(req.params.id)
        res.json(habits)
    } catch(err) {
        res.status(500).json({err})
    }
})

router.patch('/:id', async (req, res)=>{
    try {
        console.log(req.params.id,req.body)
        const habits = await Habit.update(req.params.id,req.body)
        console.log(req.body)
        res.status(201).json(habits)
    } catch(err) {
        res.status(422).json({err})
    }
})

module.exports=router;

