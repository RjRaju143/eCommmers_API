import { logger } from "../middlewares/loggers/logger.js";
import { Order } from "../modules/order.js";
import { OrderItem } from "../modules/order-item.js";

/// GET http://localhost:8855/api/v1/orders  # Done .
export const ordersGET = async (req, res) => {
  try {
    const orderList = await Order.find()
      .populate("user", "name")
      .sort({ dateOrdered: -1 })
      .select("-__v");

    if (orderList == 0) {
      return res
        .status(404)
        .json({ status: res.statusCode, message: "orderList not found" });
    }

    return res.send(orderList);
  } catch (error) {
    return res
      .status(500)
      .json({ status: res.statusCode, error: error.message });
  }
};

/// GET http://localhost:8855/api/v1/orders/:id7654  # Done .
export const ordersGETBYID = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name")
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          select: "-__v",
          populate: { path: "category", select: "-__v" },
        },
        select: "-__v",
      })
      .select("-__v");

    if (!order) {
      return res.status(404).json({
        status: res.statusCode,
        message: `orders not found`,
      });
    }

    return res.send(order);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/// POST http://localhost:8855/api/v1/orders  # Done .
export const ordersPOST = async (req, res) => {
  try {
    const orderItemsIds = await Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
      }),
    );

    const totalPrices = await Promise.all(
      orderItemsIds.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate(
          "product",
          "price",
        );
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
      }),
    );

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    let order = new Order({
      orderItems: orderItemsIds,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice: totalPrice,
      user: req.body.user,
    });

    order = await order.save();

    if (!order) {
      return res
        .status(400)
        .json({ status: res.statusCode, message: "orders not found" });
    }

    res.status(201).json({
      status: res.statusCode,
      id: order._id,
      message: "order created",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: res.statusCode, error: error.message });
  }
};

/// PUT http://localhost:8855/api/v1/orders/:id12345678  # Done .
export const ordersPUT = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true },
    ).select("-__v");

    if (!order) {
      logger.error({
        status: res.statusCode,
        message: "order not found",
      });
      return res.status(400).json({
        status: res.statusCode,
        message: "order not found",
      });
    }

    return res.status(200).json({
      status: res.statusCode,
      id: order._id,
      message: "Successfully updated",
    });
  } catch (error) {
    logger.error(`id ${req.params.id} invalid, ${error.message}`);
    return res.status(500).json({ status: `id ${req.params.id} invalid` });
  }
};

/// DELETE http://localhost:8855/api/v1/orders/ID_9876543  # Done .
export const ordersDELET = (req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .then(async (order) => {
      if (order) {
        await order.orderItems.map(async (orderItem) => {
          await OrderItem.findByIdAndRemove(orderItem);
        });
        return res.status(200).json({
          status: res.statusCode,
          message: `order is deleted successfully`,
        });
      } else {
        return res.status(404).json({
          status: res.statusCode,
          message: `order not found`,
        });
      }
    })
    .catch((error) => {
      logger.error(`id ${req.params.id} invalid, ${error.message}`);
      return res
        .status(500)
        .json({ status: res.statusCode, error: error.message });
    });
};

/// GET http://localhost:8855/api/v1/orders/get/totalsales  # Done
export const ordersTotalSales = async (req, res) => {
  try {
    const totalsales = await Order.aggregate([
      { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
    ]);
    if (!totalsales) {
      return res.status(400).json({
        status: res.statusCode,
        message: `sales cant be generated`,
      });
    }

    return res.status(201).json({ totalsales: totalsales.pop().totalsales });
  } catch (error) {
    return res
      .status(500)
      .json({ status: res.statusCode, error: error.message });
  }
};

/// GET http://localhost:8855/api/v1/orders/get/count  # Done .
export const ordersGetCount = async (req, res) => {
  try {
    const orderCount = await Order.countDocuments();
    if (!orderCount)
      return res
        .status(404)
        .json({ status: res.statusCode, error: "orders not found" });

    return res.status(200).json({ count: orderCount });
  } catch (error) {
    return res
      .status(500)
      .json({ status: res.statusCode, error: error.message });
  }
};

/// GET http://localhost:8855/api/v1/orders/get/userorders/:userid1234567890  # Done .
export const userordersBYID = async (req, res) => {
  try {
    const userOrderList = await Order.find({ user: req.params.userid })
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          select: "-__v",
          populate: { path: "category", select: "-__v" },
        },
        select: "-__v",
      })
      .sort({ dateOrdered: -1 })
      .select("-__v");

    if (!userOrderList) {
      return res.status(404).json({
        status: req.statusCode,
        message: "user order lists not found",
      });
    }

    return res.send(userOrderList);
  } catch (error) {
    return res
      .status(500)
      .json({ status: res.sendStatus, error: error.message });
  }
};
