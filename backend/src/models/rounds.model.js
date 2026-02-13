const mongoose = require('mongoose');
const { DIFFICULTY_LEVEL } = require('../utils/constants');

const roundsSchema = new mongoose.Schema({
    hiringId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hiring',
        required: true,
        index: true
    },
    
    roundName: {
        type: String,
        required: true,
        trim: true
    },

    durationMinutes: {
        type: Number,
        min: 0
    },

    topics: {
        type: [String],
    },

    questionLink: {
        type: [String],
        trim: true,
        match: [/^https?:\/\/.+/, "Invalid URL"]
    },

    difficulty: {
        type: String,
        enum: {
            values: Object.keys(DIFFICULTY_LEVEL),
            message: 'Invalid difficulty level'
        }
    }

}, { timestamps : true });

const Rounds = mongoose.model('Rounds', roundsSchema);

module.exports = Rounds;