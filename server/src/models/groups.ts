// Dependencies
import { Schema, model } from 'mongoose';

// Group Schema
const groupSchema = new Schema({
    members: [{type: Schema.Types.ObjectId, ref: 'User'}],
    description: String,
    type: String,
    date: { type : Date, default: Date.now },
    items: [{type: Object, properties: {
        name: {type: String},
        description: {type: String}
    }}],
    days: [{type: Schema.Types.ObjectId, ref: 'Day'}]
});

// Export
module.exports = model('Group', groupSchema)