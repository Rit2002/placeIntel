const axios = require('axios');

const sendMail = async (email, subject, content) => {
    try {
       const response = await axios.post(`${process.env.NOTI_SERVICE}/notiservice/api/v1/notifications`, {
            subject: subject,
            recipientEmail: [email],
            content: content
        });

        console.log(response);
        
        return response;

    } catch (error) {
        console.error("Mail service error:", error.response?.data || error.message);

        throw error;        
    }
}

module.exports = sendMail;