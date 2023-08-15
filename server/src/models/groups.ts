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


// Create default Item Options
groupSchema.pre('save', function(next) {
    if (this.items.length === 0) {
        this.items.push(
            { name: "Big Tom's Barbeque", type: "Takeout" },
            { name: "Mario's Pizza", type: "Takeout" },
            { name: "Burgers by McDoogle", type: "Takeout" },
            { name: "Spaghetti and Meatballs", type: "Eat In" },
            { name: "Steaks on the Grill", type: "Eat In" },
            { name: "Breakfast for Dinner", type: "Eat In" },
            { name: "Tsunami Sushi", type: "Dine Out" },
            { name: "Betty's Diner", type: "Dine Out" },
            { name: "El Perro Cantina", type: "Dine Out" }
        );
    }
    next();
});


// Export
module.exports = model('Group', groupSchema)