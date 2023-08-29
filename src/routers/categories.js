import express from "express";
const router = express.Router();

import {
  categoriesDELETE,
  categoriesGETALL,
  categoriesGETBYID,
  categoriesPOST,
  categoriesPUT,
} from "../controllers/categories.js";

// GET http://localhost:8855/api/v1/categories # Done ////
router.get("/", categoriesGETALL);

// POST http://localhost:8855/api/v1/categories # /////
router.post("/", categoriesPOST);

// DELETE http://localhost:8855/api/v1/categories/ID_9876543  # Done /////
router.delete("/:id", categoriesDELETE);

// GET http://localhost:8855/api/v1/categories/ID_9876543 # Done   /////
router.get("/:id", categoriesGETBYID);

// PUT http://localhost:8855/api/v1/categories/ID_9876543 # Done .   ////
router.put("/:id", categoriesPUT);

export default router;

