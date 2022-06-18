import express from "express";

import {
  getAccountById,
  getAllAccounts,
} from "../controllers/accountsController.js";

export const router = express.Router();

router.get("/", getAllAccounts);
router.get("/:accountId", getAccountById);
