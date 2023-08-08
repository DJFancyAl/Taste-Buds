// Dependencies
import express from 'express';
import { Group, Day } from '../models';
const router = require('express').Router()

// GET All Days (By Group)
router.get('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const foundGroup = await Group.findById(req.params.id)
        res.status(200).json(foundGroup.days)
    } catch (err) {
        res.status(400).json({error: err})
    }
})

// Get Current Day (By Group)
router.get('/:id/today', async (req: express.Request, res: express.Response) => {
    try {
        const today = new Date()
        const day = await Day.findOne({group: req.params.id, date: today.toLocaleDateString()})

        if(!day){
            console.log("Creating")
            const createdDay = await Day.create({group: req.params.id})
            res.status(200).json(createdDay)
        } else {
            res.status(200).json(day)
        }
    } catch (err) {
        res.status(400).json({error: err})
    }
})

// Wildcard
router.get('*', (req: express.Request, res: express.Response) => {
    res.status(404).json({error: "Uh oh! That page does not exist."})
})


// Export
module.exports = router