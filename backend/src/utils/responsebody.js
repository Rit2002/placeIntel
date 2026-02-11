/**
 * This function will be used as a template for building success response
 */
successResponseBody = (data, message = "Successfully processed the request") => ({
  success : true,
  err : null,
  data : data,
  message : message
});

/**
 * This function will be used as a template for building error response
 */
errorResponseBody = (err, message="Something went wrong") => ({
  success : false,
  err : err,
  data : null,
  message :  message
})

module.exports = {
  successResponseBody,
  errorResponseBody
}