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

// GET http://localhost:8855/api/v1/users # Only admin can acces the responce . # Done .
router.get(`/`, usersGETALl);

// POST http://localhost:8855/api/v1/users # Only admin can acces the responce . # Done .
router.post("/", usersPOSt);

// POST http://localhost:8855/api/v1/users/login # Done .
router.post("/login", usersLOGINPOST);

// POST http://localhost:8855/api/v1/users/register # Done
router.post("/register", usersREGISTER);

// GET http://localhost:8855/api/v1/users/ID_9876543 # Only admin can acces the responce . # Done .
router.get("/:id", usersGETBYID);

/// GET http://localhost:8855/api/v1/users/get/count # Only admin can acces the responce . # Done .
router.get("/get/count", usersGetCount);

/// DELETE http://localhost:8855/api/v1/users/id09876543 # Only admin can acces the responce . # Done .
router.delete("/:id", usersDELETE);

export default router;
