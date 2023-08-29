import dotenv from "dotenv";
dotenv.config();

import expressJwt from "express-jwt";
import { API_URL } from "../utils/API.js";

export function authJwt() {
  const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
  return expressJwt({
    secret: JWT_TOKEN_SECRET,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      {
        // url: `${API_URL}/products`,
        url: /\/api\/v1\/products(.*)/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/public\/uploads(.*)/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/categories(.*)/,
        methods: ["GET", "OPTIONS"],
      },
      `${API_URL}/users/login`,
      `${API_URL}/users/register`,
    ],
  });
}

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }

  done();
}

