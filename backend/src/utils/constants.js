

const STATUS = {
    OK : 200,
    CREATED : 201,
    INTERNAL_SERVER_ERROR : 500,
    UNAUTHORISED : 401,
    NOT_FOUND : 404,
    BAD_REQUEST : 400,
    FORBIDDEN : 403,
    UNPROCESSABLE_ENTITY : 422,
    GONE : 410,
    PAYMENT_REQUIRED : 402,
    CONFLICT : 409
}

const INDUSTRY_TYPE = {
    product : 'product',
    service : 'service',
    startup : 'startup'
}

const DIFFICULTY_LEVEL = {
    EASY : 'Easy',
    MEDIUM : 'Medium',
    HARD : 'Hard'
}

const ROUND_TYPE = {
    OA : "OA", 
    Technical : "Technical", 
    HR : "HR", 
    Managerial : "Managerial", 
    Assignment : "Assignment"
}

module.exports = {
    STATUS,
    INDUSTRY_TYPE,
    DIFFICULTY_LEVEL,
    ROUND_TYPE
}