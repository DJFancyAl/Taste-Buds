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
        type: {type: String}
    }}],
    requests: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

// Export
module.exports = model('Group', groupSchema)