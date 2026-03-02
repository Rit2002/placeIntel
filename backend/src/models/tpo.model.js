const mongoose = require('mongoose');

const tpoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },

    department: {
        type: String,
        required: true
    }

}, { timestamps : true });

const TPO = mongoose.model('TPO', tpoSchema);

module.exports = TPO;