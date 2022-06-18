import { isExist, loadJson } from "../utils/jsonUtils.js";

export const getAllAccounts = (req, res) => {
  try {
    const accounts = loadJson("accounts");
    res.status(200).json(accounts);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const getAccountById = (req, res) => {
  try {
    const accountId = req.params.accountId;
    if (!isExist(accountId, "accounts")) {
      throw new Error("This account does not exist");
    }
    const accounts = loadJson("accounts");
    const account = accounts.find((account) => account.id === accountId);
    res.status(200).json(account);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
