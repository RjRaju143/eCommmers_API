import express from "express";
const router = express.Router();
import {
  ordersDELET,
  ordersGET,
  ordersGETBYID,
  ordersGetCount,
  ordersPUT,
  ordersTotalSales,
  userordersBYID,
  ordersPOST,
} from "../controllers/orders.js";
/// GET http://localhost:8855/api/v1/orders
router.get("/", ordersGET);
/// GET http://localhost:8855/api/v1/orders/:id7654
router.get("/:id", ordersGETBYID);
/// POST http://localhost:8855/api/v1/orders
router.post("/", ordersPOST);
/// PUT http://localhost:8855/api/v1/orders/:id12345678
router.put("/:id", ordersPUT);
/// DELETE http://localhost:8855/api/v1/orders/ID_9876543
router.delete("/:id", ordersDELET);
/// GET http://localhost:8855/api/v1/orders/get/totalsales
router.get("/get/totalsales", ordersTotalSales);
/// GET http://localhost:8855/api/v1/orders/get/count
router.get("/get/count", ordersGetCount);
/// GET http://localhost:8855/api/v1/orders/get/userorders/:userid1234567890
router.get("/get/userorders/:userid", userordersBYID);

export default router;
