// Dependencies
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
require('dotenv').config()

// Initialize App
const app = express();
app.use(bodyParser.json());
app.use(cors())
// app.use(function(req: express.Request, res: express.Response, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
//     // res.header("Access-Control-Allow-Headers", "Origin, x-access-token, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// });

// Home Route
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).json({message: "Welcome to the Taste Buds API!"})
})

// Controllers
app.use('/users', require('./controllers/users'))
app.use('/groups', require('./controllers/groups'))
app.use('/days', require('./controllers/days'))

// Wildcard Route
app.get('*', (req: express.Request, res: express.Response) => {
    res.status(404).json({error: "Uh oh...that page doesn't exist!"})
})

// Listener
app.listen(process.env.PORT, () => {
    console.log(`Server Running on port ${process.env.PORT}...`)
})
