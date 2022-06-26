import mongoose from "mongoose";
import { Account } from "../models/Account.models.js";

export const isAccountExist = async (req, res, next) => {
  const { accountId } = req.body;
  if (!accountId) {
    return res.status(400).send("Account ID is missing");
  }
  if (!mongoose.Types.ObjectId.isValid(accountId)) {
    return res.status(400).send("Account ID is not valid");
  }
  const account = await Account.findById({ _id: accountId });
  if (!account) {
    return res.status(400).send("This account does not exist");
  }
  req.account = account;
  next();
};
