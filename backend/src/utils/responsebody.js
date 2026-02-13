/**
 * This function will be used as a template for building success response
 */
successResponseBody = (data, message = "Successfully processed the request") => ({
  success : true,
  message : message,
  data : data,
  err : null
});

/**
 * This function will be used as a template for building error response
 */
errorResponseBody = (err, message="Something went wrong") => ({
  success : false,
  message :  message,
  err : err,
  data : null,
})

module.exports = {
  successResponseBody,
  errorResponseBody
}