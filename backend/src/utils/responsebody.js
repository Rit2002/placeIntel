/**
 * This object will be used as a template for building success response
 */
successResponseBody = {
  success : true,
  err : {},
  data : {},
  message :  "Successfully processed the request"
}

/**
 * This object will be used as a template for building error response
 */
errorResponseBody = {
  success : false,
  err : {},
  data : {},
  message :  "Something went wrong"
}

module.exports = {
  successResponseBody,
  errorResponseBody
}