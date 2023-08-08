// Dependencies
import express from 'express';
import { Group } from '../models';
const router = require('express').Router()


// GET All Groups
router.get('/', async (req: express.Request, res: express.Response) => {
    try {
        res.status(200).json("All Groups Rt.")
    } catch (err) {
        res.status(400).json({error: err})
    }
})

// Create New Group
router.post('/', async (req: express.Request, res: express.Response) => {
    const { member, description, type } = req.body

    // Check if member is provided
    if (!member) {
        return res.status(400).json({error: "Member not present"})
    }
    
    // Create Group
    try {
        const newGroup = {
            members: [member],
            description: description,
            type: type
        }
        const createdGroup = await Group.create(newGroup)
        res.status(200).json(createdGroup)
    } catch (err) {
        res.status(400).json({error: err})
    }
})

// // Edit User
// router.put('/:id', async (req: express.Request, res: express.Response) => {
//     try {
//         const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body)
//         res.status(200).json("User Updated!")
//     } catch (err) {
//         res.status(400).json({error: err})
//     }
// })

// Delete Member
router.put('/:groupId/:userId', async (req: express.Request, res: express.Response) => {
    try {
        const foundGroup = await Group.findByIdAndUpdate(
            req.params.groupId,
            {
                $pull: {
                    'members': req.params.userId
                }
            },
            { new: true }
        )

        if (foundGroup.members.length === 0) {
            await Group.findByIdAndDelete(req.params.groupId)
            res.status(200).json("Group deleted!")
        } else {
            res.status(200).json("Member deleted!")
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