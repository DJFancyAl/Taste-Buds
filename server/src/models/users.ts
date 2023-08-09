// Dependencies
import { CallbackError, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

// User Schema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        default: 'Anonymous'
    },
    password: {type: String, minlength: 6, required: true},
    bio: String,
    pic: String,
    date: { type : Date, default: Date.now },
    group: {type: Schema.Types.ObjectId, ref: 'Group'}
});

// Salt incoming passwords
userSchema.pre('save', function(next) {
    const user = this;
    
    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
      return next();
    }
    
    // Generate a salt
    bcrypt.genSalt(10, function(err: CallbackError | undefined, salt: string) {
        if (err) {
            return next(err);
        }
        
        // Hash the password using the salt
        bcrypt.hash(user.password, salt, function(err: CallbackError | undefined, hash: string) {
            if (err) {
            return next(err);
            }
            
            // Override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

// Export
module.exports = model('User', userSchema)