import express from "express";

import { getAllAccounts } from "../controllers/accountsController.js";

export const router = express.Router();

router.get("/", getAllAccounts);
