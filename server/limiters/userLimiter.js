const rateLimit = require("express-rate-limit");

exports.signupLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3,
    message: "Too many signup attempts. Try again in an hour.",
});

exports.loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10,
    message: "Too many login attempts. Please wait a few minutes.",
});

exports.updateUserLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many profile updates. Try again later.",
});
