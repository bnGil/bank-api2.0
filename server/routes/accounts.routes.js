import express from "express";

import {
  depositToAccount,
  getAccountById,
  getAllAccounts,
  transfer,
  updateCredit,
  withdrawFromAccount,
} from "../controllers/accounts.controllers.js";
import { isAccountExist } from "../middlewares/isAccountExist.middleware.js";
import { isAmountValid } from "../middlewares/isAmountValid.middleware.js";

export const router = express.Router();

router.use(["/account", "/credit", "/deposit", "/withdraw"], isAccountExist);
router.use(["/credit", "/deposit", "/withdraw", "/transfer"], isAmountValid);

router.get("/", getAllAccounts);
router.get("/account", getAccountById);
router.put("/credit", updateCredit);
router.put("/deposit", depositToAccount);
router.put("/withdraw", withdrawFromAccount);
router.put("/transfer", transfer);
