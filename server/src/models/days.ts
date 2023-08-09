// Dependencies
import { Schema, model } from 'mongoose';

const today = new Date()

// Group Schema
const daySchema = new Schema({
    group: {type: Schema.Types.ObjectId, ref: 'Group'},
    date:  { type : Date, default: Date.now },
    // member_items: []
});

// Export
module.exports = model('Day', daySchema)