import express from "express";
const router = express.Router();
import {
  categoriesDELETE,
  categoriesGETALL,
  categoriesGETBYID,
  categoriesPOST,
  categoriesPUT,
} from "../controllers/categories.js";
import { jsonVerify } from "../helpers/jwt.js";
// GET http://localhost:8855/api/v1/categories
router.get("/", categoriesGETALL);
// POST http://localhost:8855/api/v1/categories
router.post("/",jsonVerify, categoriesPOST);
// DELETE http://localhost:8855/api/v1/categories/ID_9876543
router.delete("/:id",jsonVerify, categoriesDELETE);
// GET http://localhost:8855/api/v1/categories/ID_9876543
router.get("/:id", categoriesGETBYID);
// PUT http://localhost:8855/api/v1/categories/ID_9876543
router.put("/:id",jsonVerify, categoriesPUT);

export default router;


