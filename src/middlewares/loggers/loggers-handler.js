/// winston loggers ..
import { logger } from "./logger.js"
//// Error handler middleware
export const errorLog = (err, req, res, next) => {
  logger.error(
    `${500}-${req.originalUrl}-${req.method}-${err.message}-${req.ip}`,
  );
  res.status(err.status || 500).send("Internal Server Error");
};
//// Middleware function to log all requests
export const infoLog = (req, res, next) => {
  logger.info(`${res.statusCode} ${req.method} ${req.url} ${req.ip}`);
  next();
};
