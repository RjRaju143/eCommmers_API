import dotenv from "dotenv";
dotenv.config();

import express from "express";
const router = express.Router();

import {
  usersDELETE,
  usersGETALl,
  usersGETBYID,
  usersGetCount,
  usersLOGINPOST,
  usersPOSt,
  usersREGISTER,
} from "../controllers/users.js";

import { jsonVerify } from "../helpers/jwt.js";

// GET http://localhost:8855/api/v1/users # Only admin can acces the responce . # Done .
router.get(`/`, jsonVerify, usersGETALl);

// POST http://localhost:8855/api/v1/users # Only admin can acces the responce . # Done .
router.post("/", usersPOSt);

// POST http://localhost:8855/api/v1/users/login # Done .
router.post("/login", usersLOGINPOST);

// POST http://localhost:8855/api/v1/users/register # Done
router.post("/register", usersREGISTER);

// GET http://localhost:8855/api/v1/users/ID_9876543 # Only admin can acces the responce . # Done .
router.get("/:id", jsonVerify, usersGETBYID);

/// GET http://localhost:8855/api/v1/users/get/count # Only admin can acces the responce . # Done .
router.get("/get/count", jsonVerify, usersGetCount);

/// DELETE http://localhost:8855/api/v1/users/id09876543 # Only admin can acces the responce . # Done .
router.delete("/:id", jsonVerify, usersDELETE);

export default router;
