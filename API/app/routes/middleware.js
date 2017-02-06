// app/routes/middleware.js

module.exports = {
  customMiddleware : function(req, res, next) {
    // do logging
    console.log(Date.now(),"Request URL:", req.originalUrl, "Request Type:",
      req.method, "Request Params:", req.params, "Request Body:", req.body);

    // make sure we go to the next step and don't stop here
    next();
  }
}