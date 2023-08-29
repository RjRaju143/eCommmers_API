export function errorHandler(error, req, res, next) {
  if (error.name == "UnauthorizedError") {
    return res
      .status(401)
      .json({ status: res.statusCode, error: `The user is not authorized` });
  }

  if (error.name == "validationError") {
    return res.status(401).json(error);
  }

  return res.status(401).json(error);
}


