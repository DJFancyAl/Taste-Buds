// Dependencies
import express from 'express';
import { User } from '../models';
import bcrypt from 'bcrypt';
const router = require('express').Router()


// GET All Users
router.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const foundUsers = await User.find()
        res.status(200).json(foundUsers)
    } catch (err) {
        res.status(400).json({error: err})
    }
})

// Create New User
router.post('/', async (req: express.Request, res: express.Response) => {
    const { username, password, confirmPassword } = req.body

    // Check if username and password is provided
    if (!username || !password) {
        return res.status(400).json({error: "Username or Password not present"})
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({error: "Passwords do not match!"})
    }
    
    // Check Password Length
    if (password.length < 6) {
        return res.status(400).json({error: "Password less than 6 characters" })
    }
    
    // Create User
    try {
        const createdUser = await User.create({username, password})
        res.status(200).json(createdUser)
    } catch (err) {
        res.status(400).json({error: err})
    }
})

// Edit User
router.put('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json("User Updated!")
    } catch (err) {
        res.status(400).json({error: err})
    }
})

// Delete User
router.delete('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User deleted!")
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