const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 20
    },
    
    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 20
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        immutable: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },

    password: {
        type: String,
        required: true,
        minLength: 8
    },

    role: {
        type: String,
        enum: {
            values: ['TPO', 'Student', 'Admin'],
            message: 'Invalid Role'
        },
        default: 'Student'
    }

}, { timestamps: true });

userSchema.pre('save', async function() {

    if(!this.isModified('password')) return;
    
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});

userSchema.methods.isValidPassword = async function(plainPassword) {

    const compare = await bcrypt.compare(plainPassword, this.password);

    return compare;
}

const User = mongoose.model('User', userSchema);

module.exports = User;