// Dependencies
import express from 'express';
import { User } from '../models';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';
const router = require('express').Router()


// Set up Multer for handling file uploads
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../uploads'),
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
const upload = multer({ storage });

// GET All Users
router.get('/', async (req: express.Request, res: express.Response) => {
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
        const {password: string, ...rest} = createdUser._doc
        res.status(200).json(rest)
    } catch (err) {
        res.status(400).json({error: "Sorry - registration not completed."})
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
        const user = await User.findOne({username})

        // Check if user exists
        if (!user) {
            res.status(401).json({error: "Login not succesful - User not found."})
        }

        // Validate Password
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword){
            res.status(401).json({error: "Login not successful - Invalid Password."})
        } else {
            const {password, ...rest} = user._doc;
            res.status(200).json(rest)
        }
    } catch (err) {
        res.status(400).json({error: "Sorry - login not completed."})
    }
})


// Search for User
router.get('/search/:name', async (req: express.Request, res: express.Response) => {
    try {
        const foundUsers = await User.find({
            $or: [
              { username: req.params.name },
              { name: req.params.name }
            ],
            
          }).select('username name group')

        if(foundUsers.length === 0) {
            res.status(400).json({error: 'User Not Found'})
        } else {
            res.status(200).json(foundUsers)
        }
    } catch(err) {
        res.status(400).json({error: "Sorry - unable to find user."})
    }
})


// Upload Profile
router.post('/:id/upload', upload.single('profileImage'), async (req: express.Request, res: express.Response) => {
    try {
        if (req.file) {
                const updatedUser = await User.findByIdAndUpdate(req.params.id, {pic: req.file.filename})
                const {password, ...rest} = updatedUser._doc
                res.status(200).json(rest);
            } else {
                res.status(400).json({ error: 'File upload failed' });
            }
    } catch (e) {
        res.status(400).json({error: e });
    }
})

// Get Profile Image
router.get('/:id/profile', async (req: express.Request, res: express.Response) => {
    try {
        const foundUser = await User.findById(req.params.id)
        const file = path.join(__dirname, '../../uploads', foundUser.pic);
        res.sendFile(file)
    } catch (e) {
        console.log(e)
        res.status(400).json({ error: e });
    }
})

// Edit User
router.put('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body)
        const {password, ...rest} = updatedUser._doc
        res.status(200).json(rest);
    } catch (err) {
        res.status(400).json({error: "Sorry - changes not saved."})
    }
})

// Delete User
router.delete('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
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