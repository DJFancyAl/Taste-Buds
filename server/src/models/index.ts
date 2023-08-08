// Dependencies
require('dotenv').config()
import { connect } from 'mongoose';

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  throw new Error('MONGO_URI is not defined in the environment.');
}

// Connect to MongoDB
connect(mongoURI)
  .then(()=>console.log('MongoDB connected'))
  .catch(e=>console.log(e));

export const User = require('./users.ts')
export const Group = require('./groups.ts')