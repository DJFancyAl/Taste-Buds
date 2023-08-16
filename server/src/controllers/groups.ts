// Dependencies
import express from 'express';
import { Group, User } from '../models';
import { validateToken } from '../JWT';
const router = require('express').Router()


// GET All Groups
router.get('/', validateToken, async (req: express.Request, res: express.Response) => {
    try {
        res.status(200).json("All Groups Rt.")
    } catch (err) {
        res.status(400).json({error: err})
    }
})


// Create New Group
router.post('/', validateToken, async (req: express.Request, res: express.Response) => {
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
        const updatedUser = await User.findByIdAndUpdate(member, {group: createdGroup}, { new: true }).populate('group')
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(400).json({error: err})
    }
})


// Get One Group
router.get('/:id', validateToken, async (req: express.Request, res: express.Response) => {
    try {
        const foundGroup = await Group.findById(req.params.id).populate({path: 'members', select: 'name username date bio pic'}).populate({path: 'requests', select: 'name username'}).select('-days')
        res.status(200).json(foundGroup)
    } catch (err) {
        res.status(400).json({error: err})
    }
})


// Edit Group
router.put('/:id', validateToken, async (req: express.Request, res: express.Response) => {
    try {
        const updatedGroup = await Group.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json("Group Updated!")
    } catch (err) {
        res.status(400).json({error: err})
    }
})


// Create Request
router.get('/request/:budId/:userId', validateToken, async (req: express.Request, res: express.Response) => {
    try {
        const foundGroup = await User.findById(req.params.budId).select('group')
        const updatedGroup = await Group.findByIdAndUpdate(
            foundGroup.group,
            {$addToSet: {'requests': req.params.userId}}
        )
            res.status(200).json("Request Created!")
        } catch (err) {
        res.status(400).json({error: err})
    }
})


// Add Member
router.get('/:groupId/:userId', validateToken, async (req: express.Request, res: express.Response) => {
    try {
        const foundUser = await User.findByIdAndUpdate(
            req.params.userId,
            {group: req.params.groupId},
            {new: true}
        )

        const foundGroup = await Group.findByIdAndUpdate(
            req.params.groupId,
            { $pull: {'requests': req.params.userId}, $addToSet: {'members': foundUser} },
            {new: true}
        ).populate({path: 'members', select: '-password'})

        res.status(200).json(foundGroup)
    } catch (err) {
        res.status(400).json({error: 'Sorry - unable to add member.'})
    }
})

// Delete Member
router.delete('/:groupId/:userId', validateToken, async (req: express.Request, res: express.Response) => {
    try {
        const foundGroup = await Group.findByIdAndUpdate(req.params.groupId, {$pull: {'members': req.params.userId}}, {new: true})
        const foundUser = await User.findByIdAndUpdate(req.params.userId, {'group': null}, { new: true }).select('-password')
        if (foundGroup.members.length === 0) {
            await Group.findByIdAndDelete(req.params.groupId)
            res.status(200).json(foundUser)
        } else {
            res.status(200).json(foundUser)
        }
    } catch (err) {
        res.status(400).json({error: err})
    }
})

// Add Item
router.post('/:id/items', validateToken, async (req: express.Request, res: express.Response) => {
    try {
        const foundGroup = await Group.findByIdAndUpdate(req.params.id,{$addToSet: {'items': req.body}})
        res.status(200).json(req.body)
    } catch (err) {
        res.status(400).json({error: err})
    }
})

// Delete Item
router.put('/:id/items', validateToken, async (req: express.Request, res: express.Response) => {
    try {
        const foundGroup = await Group.findByIdAndUpdate(req.params.id,{$pull: {'items': req.body}})
        res.status(200).json("Item Deleted!")
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