// Dependencies
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
require('dotenv').config()

// Initialize App
const app = express();
app.use(bodyParser.json());
app.use(cors())
app.use(cors({
    origin: 'http://localhost:3000',
  }));
app.use(express.static('uploads'));


// serve static front end in production mode
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../', 'client', 'build')));
}


// Home Route
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).json({message: "Welcome to the Taste Buds API!"})
})

// Controllers
app.use('/users', require('./controllers/users'))
app.use('/groups', require('./controllers/groups'))
app.use('/days', require('./controllers/days'))

// Wildcard Route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'));
  });

// Listener
app.listen(process.env.PORT, () => {
    console.log(`Server Running on port ${process.env.PORT}...`)
})
