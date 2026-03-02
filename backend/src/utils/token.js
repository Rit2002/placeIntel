const crypto = require('crypto');

const generatePasswordResetToken = () => {
     // Generating random tokens
    const resetToken = crypto.randomBytes(32).toString("hex");

    /**
     * createHash --> It creates a hash object. Tells Node: “Use SHA-256 algorithm” 
     * update --> send the actual data to be hashed
     * digest --> tell the hash fn, expecting data in hex format
     */
    const hashedToken = crypto
        .createHash('sha256') 
        .update(resetToken)
        .digest('hex')

    return {
        resetToken,
        hashedToken
    }
}

const sha256 = (token) => {
   return crypto
        .createHash('sha256')
        .update(token)
        .digest('hex')
}

module.exports = {
    generatePasswordResetToken,
    sha256
};