const rateLimit = require("express-rate-limit");

exports.getLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 50, // 50 reqs per minute
    message: "Too many read requests. Please slow down.",
});

exports.createPostLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 7, // max 7 post creations
    message: "Too many posts created. Try again later.",
});

exports.updatePostLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many updates. Please slow down.",
});
