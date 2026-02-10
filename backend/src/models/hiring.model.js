const mongoose = require('mongoose');

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

    rounds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Rounds',
        required: true,
    },

    noOfRounds: {
        type: Number
    }

}, { timestamps : true });

const Hiring = mongoose.model('Hiring', hiringSchema);

module.exports = Hiring;