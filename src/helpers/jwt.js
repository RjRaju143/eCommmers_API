import dotenv from "dotenv";
import JWT from "jsonwebtoken";
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
dotenv.config();

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }

  done();
}

export const jsonVerify = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(401).send("Authorization header missing.");
  }
  const token = bearerHeader.split(" ")[1];
  // Verify the JWT with path-specific configuration
  JWT.verify(token, JWT_TOKEN_SECRET, { isRevoked }, (error, decode) => {
    if (error) {
      logger.error(error);
      return res.status(401).send("Invalid token.");
    } else {
      req.decode = decode;
      next();
    }
  });
};


