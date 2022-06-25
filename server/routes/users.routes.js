import express from "express";

import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
} from "../controllers/users.controllers.js";
import { isUserExist } from "../middlewares/isUserExist.middleware.js";

export const router = express.Router();

router.use(["/user", "/add", "/delete"], isUserExist);

router.get("/", getAllUsers);
router.get("/user", getUserById);
router.post("/add", createUser);
router.delete("/delete", deleteUser);
