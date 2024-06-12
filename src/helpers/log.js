const winston = require("winston");

const level = process.env.LOG_LEVEL || "debug";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: level,
      timestamp: () => {
        return new Date().toISOString();
      },
      colorize: true,
      json: process.env.NODE_ENV === "production",
      stringify: (obj) => JSON.stringify(obj),
    }),
  ],
});

module.exports = logger;
