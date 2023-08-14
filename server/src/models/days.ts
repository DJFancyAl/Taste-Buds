// Dependencies
import { Schema, model } from 'mongoose';

const today = new Date()

// Group Schema
const daySchema = new Schema({
    group: {type: Schema.Types.ObjectId, ref: 'Group'},
    date:  { type : String, default: today.toLocaleDateString() },
    selections: [{type: Object, properties: {
        member: {type: Schema.Types.ObjectId, ref: 'User'},
        selection: {type: Object, properties: {
            name: String,
            type: String
        }},
        default: []
    }}],
    summary: String
});

// Export
module.exports = model('Day', daySchema)