const mongoose = require('mongoose');
const { INDUSTRY_TYPE } = require('../utils/constant');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },

    description: {
        type: String,
         trim: true,
        required: true
    },

    website: {
        type: String,
        trim: true,
        match: [/^https?:\/\/.+/, 'Please use a valid URL']
    },

    industryType: {
        type: String,
        enum: {
            values: Object.values(INDUSTRY_TYPE),
            message: 'Invalid industry type'
        },
        required: true
    },

    foundedYear: {
        type: Number,
        min: 1900,
        max: new Date.getFullYear()
    },

    headquarters: {
        type: String,
        trim: true,
    },

    rolesOffered: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    }],

    active: {
        type: Boolean,
        default: true
    }

}, { timestamps : true });

const Company = mongoose.model('Company', companySchema);

module.exports = {
    Company
}