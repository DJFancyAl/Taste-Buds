// Dependencies
import express from 'express';
import { Group, Day } from '../models';
import { createSummary } from '../summary'
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
        const day = await Day.findOne({
            group: req.params.id,
            date: today.toLocaleDateString()
          }).populate({
            path: 'group',
            select: 'items',
            populate: {
              path: 'members items',
              select: 'name username'
            }
          })

        if(!day){
            const createdDay = await Day.create({group: req.params.id})
            res.status(200).json(createdDay)
        } else {
            res.status(200).json(day)
        }
    } catch (err) {
        res.status(400).json({error: "Sorry - unable to fetch today's info."})
    }
})


// Add Selections (By Day ID)
router.post('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const today = await Day.findByIdAndUpdate(
                req.params.id,
                {$addToSet: {'selections': req.body}},
                {new: true}
            ).populate({
                path: 'group',
                select: 'items',
                populate: {
                  path: 'members items',
                  select: 'name username'
                }
              })

        if(today.group.members.length === today.selections.length){
            createSummary(today.selections)
            today.summary = "The results are in! You both want Sushi."
            await today.save()
        }
        res.status(200).json(today)
    } catch (err) {
        res.status(400).json({error: 'Sorry - unable sot submit choices.'})
    }
})


// Edit Day
router.put('/:dayId/:userId', async (req: express.Request, res: express.Response) => {
    try {
        const today = await Day.findById(req.params.dayId).populate({
                    path: 'group',
                    select: 'items',
                    populate: {
                      path: 'members items',
                      select: 'name username'
                    }
                  })
        today.selections = today.selections.filter((selection: { member: string; }) => selection.member !== req.params.userId)
        const updatedToday = await today.save()
        res.status(200).json(updatedToday)
    } catch (err) {
        res.status(400).json({error: 'Sorry - unable to make edits.'})
    }
})


// Wildcard
router.get('*', (req: express.Request, res: express.Response) => {
    res.status(404).json({error: "Uh oh! That page does not exist."})
})


// Export
module.exports = router