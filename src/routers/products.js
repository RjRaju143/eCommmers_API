import express from "express";
const router = express.Router();

import { uploadOptions, createUploadFolder } from "../config/fileUpload.js";

import { jsonVerify } from "../helpers/jwt.js";

import {
  galleryimagesBYID,
  productPUTBYID,
  productsALL,
  productsBYID,
  productsDELETE,
  productsGeFeaturedBYNUMBER,
  productsGetCount,
  productsQueryList,
} from "../controllers/products.js";

/// POST http://localhost:8855/api/v1/products # need to fix bugs # Done .
router.post(
  "/",
  jsonVerify,
  createUploadFolder,
  uploadOptions.single("image"),
  productsALL
);

/// GET http://localhost:8855/api/v1/products/:id09876543 # Done .
router.get("/:id", productsBYID);

/// PUT http://localhost:8855/api/v1/product/id1234567 # Done .
router.put("/:id", jsonVerify, productPUTBYID);

/// DELETE http://localhost:8855/api/v1/products/id09876543 # Done .
router.delete("/:id", jsonVerify, productsDELETE);

/// GET http://localhost:8855/api/v1/products/get/count # Done .
router.get("/get/count", productsGetCount);

/// GET http://localhost:8855/api/v1/products/get/featured/12 # Done .
router.get("/get/featured/:count", productsGeFeaturedBYNUMBER);

/// GET http://localhost:8855/api/v1/products?categories=87654,9786 # Done .
router.get(`/`, productsQueryList);

/// PUT http://localhost:8855/api/v1/products/gallery-images/:id0987654 # need to fix bugs ..
router.put(
  "/gallery-images/:id",
  jsonVerify,
  uploadOptions.array("images", 10),
  galleryimagesBYID
);

export default router;
