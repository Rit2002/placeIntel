const mongoose = require('mongoose');
const { DIFFICULTY_LEVEL, ROUND_TYPE } = require('../utils/constants');

const hiringSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },

    roles: [{

        title:{
            type: String,
            required: true,
            trim: true
        },

        type:{
            type: String,
            enum: ["Intern", "Full Time", "Contract"],
            required: true
        },

        ctc:{
            type: Number,
            required: true,
        }
    }],

    rounds: [{
        name: {
            type: String,
            required: true
        },

        type: {
            type: String,
            enum: {
                values: Object.values(ROUND_TYPE),
                message: 'Invalid Round type'
            }
        },

        description: {
            type: String,
            trim: true
        },

        order: {
            type: Number,
            required: true
        },

        durationMinutes: {
            type: Number,
            required: true
        },

        difficulty: {
            type: String,
            enum: {
                values: Object.values(DIFFICULTY_LEVEL),
                message: 'Invalid difficulty level'
            }
        },

        topics: {
            type: [String],
        },
    }],

    year: {
        type: Number,
        // required: true,
        index: true
    },
    
}, { timestamps : true });

const Hiring = mongoose.model('Hiring', hiringSchema);

module.exports = Hiring;