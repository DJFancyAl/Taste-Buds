// Dependencies
import { Schema, model } from 'mongoose';

// Author Schema
const groupSchema = new Schema({
    members: [{type: Schema.Types.ObjectId, ref: 'User'}],
    description: String,
    type: String,
    date: { type : Date, default: Date.now },
});

// Export
module.exports = model('Group', groupSchema)