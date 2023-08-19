// Dependencies
import express from 'express';
import { User, Group } from '../models';
import bcrypt from 'bcrypt';
import { createToken, validateToken } from '../JWT';
const router = require('express').Router()

interface CustomRequest extends express.Request {
    user: string;
}

// GET All Users
router.get('/', validateToken, async (req: express.Request, res: express.Response) => {
    try {
        const foundUsers = await User.find()
        res.status(200).json(foundUsers)
    } catch (err) {
        res.status(400).json({error: "Sorry - can't find users."})
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
    
    // Check User Exists
    const searchUser = await User.findOne({username: username})
    if (searchUser) {
        return res.status(400).json({error: "That username is already in use." })
    }
    
    // Create User
    try {
        const createdUser = await User.create({username, password})
        const token = createToken(createdUser._id)
        res.status(200).json(token)
    } catch (err) {
        res.status(400).json({error: "Sorry - registration not completed."})
    }
})


// Get User Data
router.get('/user', validateToken, async (req: CustomRequest, res: express.Response) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization missing!' });
    }
    
    try {
        const foundUser = await User.findById(req.user).select('-password').populate({path: 'group', select: 'members requests'})
        res.status(200).json(foundUser);
    } catch(err) {
        res.status(400).json({error: "User not found..."});
    }
})


// Login User
router.post('/login', async (req: express.Request, res: express.Response) => {
    const {username, password} = req.body

    // Check if username and password is provided
    if (!username || !password) {
        return res.status(400).json({error: "Username or Password not present"})
    }

    try {
        // Get the User
        const foundUser = await User.findOne({username})

        // Check if user exists
        if (!foundUser) {
            return res.status(401).json({error: "Login not succesful - User not found."})
        }

        // Verify Password
        const validPassword = await bcrypt.compare(password, foundUser.password)
        if (!validPassword){
            res.status(401).json({error: "Login not successful - Invalid Password."})
        } else {
            const token = createToken(foundUser._id)
            res.status(200).json(token)
        }
    } catch (err) {
        res.status(400).json({error: "Sorry - login not completed."})
    }
})


// Search for User
router.get('/search/:name', validateToken, async (req: express.Request, res: express.Response) => {
    try {
        const foundUsers = await User.find({
            $or: [
              { username: req.params.name },
              { name: req.params.name }
            ]    
          }).select('username name group')

          
        for(let i =0; i < foundUsers.length; i++){
            if(!foundUsers[i].group)
            foundUsers.splice(i, 1)
        }
        
        if(foundUsers.length === 0) {
           return res.status(400).json({error: 'User Not Found'})
        }
        
        res.status(200).json(foundUsers)
        
    } catch(err) {
        res.status(400).json({error: "Sorry - unable to find user."})
    }
})


// Edit User
router.put('/:id', validateToken, async (req: express.Request, res: express.Response) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        const {password, ...rest} = updatedUser._doc
        res.status(200).json(rest);
    } catch (err) {
        res.status(400).json({error: "Sorry - changes not saved."})
    }
})

// Delete User
router.delete('/:id', validateToken, async (req: express.Request, res: express.Response) => {
    try {
        const foundUser = await User.findById(req.params.id).select('group').populate('group')

        // Remove User from Group if Necessary
        if(foundUser.group) {
            const foundGroup = await Group.findByIdAndUpdate(foundUser.group._id, {$pull: {members: {_id: foundUser._id}}})}

        // Delete the User
        await foundUser.deleteOne();
        res.status(200).json("User deleted!")
    } catch (err) {
        res.status(400).json({error: "Sorry - user not deleted."})
    }
})


// Wildcard
router.get('*', (req: express.Request, res: express.Response) => {
    res.status(404).json({error: "Uh oh! That page does not exist."})
})


// Export
module.exports = router