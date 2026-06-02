


// run :  npm i express-rate-limit

import rateLimit from "express-rate-limit";





const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // allowing 10 requests in the time window specified above (1 minute) from the same IP

  // if the number of requests in the time window exceeds the limmit, this will be the body of the response with status code 429 (too many requests)
  message: {
    message: "Too many requests from this IP, please try again after a minute",
  },
  // uses cleaner modren headers in the response to indicate the rate limit status
  standardHeaders: true,

  // disables the old headers that are no longer used by convention
  legacyHeaders: false,
});

export default rateLimiter;
