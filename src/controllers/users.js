import dotenv from "dotenv";
dotenv.config();

import { User } from "../modules/user.js";
import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

// GET http://localhost:8855/api/v1/users # Only admin can acces the responce . # Done .
export const usersGETALl = async (req, res) => {
  try {
    const userList = await User.find().select("-passwordHash -__v");

    if (userList.length == 0) {
      return res.status(404).json({
        status: res.statusCode,
        message: `users not found`,
      });
    }

    return res.send(userList);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// POST http://localhost:8855/api/v1/users # Only admin can acces the responce . # Done .
export const usersPOSt = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      isAdmin,
      apartment,
      street,
      zip,
      city,
      country,
    } = req.body;

    // check required fields ..
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    //
    const user = new User({
      name,
      email,
      passwordHash: bcrypt.hashSync(password, 10),
      phone,
      isAdmin,
      apartment,
      street,
      zip,
      city,
      country,
    });
    await user.save();
    res
      .status(201)
      .json({ status: res.statusCode, message: `register successfull` });
  } catch (error) {
    res.status(500).send(error);
  }
};

// POST http://localhost:8855/api/v1/users/login # Done .
export const usersLOGINPOST = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: `enter email and password` });
    }

    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user) {
      return res.status(404).json({
        status: res.statusCode,
        message: `User not found`,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: res.statusCode,
        message: `Incorrect email or password`,
      });
    }

    const token = jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin },
      JWT_TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
    );

    return res.status(200).json({ user: user.email, token });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// POST http://localhost:8855/api/v1/users/register # Done
export const usersREGISTER = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      isAdmin,
      street,
      apartment,
      zip,
      city,
      country,
    } = req.body;

    // check required fields..
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = new User({
      name,
      email,
      passwordHash: bcrypt.hashSync(password, 10),
      phone,
      isAdmin,
      street,
      apartment,
      zip,
      city,
      country,
    });
    await user.save();
    return res
      .status(201)
      .json({ status: res.statusCode, message: `register successfull` });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// GET http://localhost:8855/api/v1/users/ID_9876543 # Only admin can acces the responce . # Done .
export const usersGETBYID = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-passwordHash -__v",
    );
    if (!user) {
      return res.status(400).json({
        status: res.statusCode,
        message: `user not found`,
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ status: `id ${req.params.id} invalid` });
  }
};

/// GET http://localhost:8855/api/v1/users/get/count # Only admin can acces the responce . # Done .
export const usersGetCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments({});
    if (!userCount) {
      return res
        .status(404)
        .json({ status: res.statusCode, message: "user not found" });
    }

    return res.status(200).json({ count: userCount });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

/// DELETE http://localhost:8855/api/v1/users/id09876543 # Only admin can acces the responce . # Done .
export const usersDELETE = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {
        return res
          .status(200)
          .json({ status: res.statusCode, message: "user deleted" });
      } else {
        return res
          .status(404)
          .json({ success: res.statusCode, message: "user not found " });
      }
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

export default router;
