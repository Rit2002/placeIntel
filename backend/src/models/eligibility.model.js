const mongoose = require('mongoose');

const eligibilitySchema = new mongoose.Schema({

    hiringId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hiring',
        required: true,
    },

    academics: {
        
        minCgpa: {
            type: Number,
            min: 0,
            max: 10,
            required: true,
        },

         maxBacklogs: {
            type: Number,
            min: 0,
            default: 0,
            required: true,
        },

        tenthPercent: {
            type: Number,
            min: 0,
            max: 100,
            required: true,
        },

        twelthPercent: {
            type: Number,
            min: 0,
            max: 100,
            required: true,
        },

        degreePercent: {
            type: Number,
            min: 0,
            max: 100,
            required: true
        }
    },

    education: {

        allowedDegrees: [{
            type: String,
            required: true,
            trim: true
        }],

        allowedBranches: [{
            type: String,
            required: true,
            trim: true
        }],

        graduationYears: [{
            type: Number
        }]
    },

    additionalConstraints: {

        gapYearsAllowed: {
            type: Number,
            default: 0
        },

    }
    
}, { timestamps : true });

eligibilitySchema.index({ hiringId: 1 });
eligibilitySchema.index({ "academics.minCgpa": 1 });
eligibilitySchema.index({ "education.allowedBranches": 1 });

const Eligibility = mongoose.model('Eligibility', eligibilitySchema);

module.exports = Eligibility;