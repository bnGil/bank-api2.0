import express from "express";

import {
  depositToAccount,
  getAccountById,
  getAllAccounts,
  transfer,
  withdrawFromAccount,
} from "../controllers/accountsController.js";

export const router = express.Router();

router.get("/", getAllAccounts);
router.get("/:accountId", getAccountById);
router.put("/deposit", depositToAccount);
router.put("/withdraw", withdrawFromAccount);
router.put("/transfer", transfer);
