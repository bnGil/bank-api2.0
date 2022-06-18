import {
  updateAccountCash,
  updateAccountCredit,
} from "../utils/accountsUtils.js";
import { isExist, loadJson, saveJson } from "../utils/jsonUtils.js";
import { updateUsers } from "../utils/usersUtils.js";

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

export const depositToAccount = (req, res) => {
  try {
    const { accountId, amount } = req.body;
    if (!isExist(accountId, "accounts")) {
      throw new Error("This account does not exist");
    }
    if (typeof amount !== "number") {
      throw new Error("Amount is not a number");
    }
    if (amount < 0) {
      throw new Error("Can deposit only positive numbers");
    }
    updateAccountCash(amount, accountId);
    updateUsers();
    res.status(200).send("The deposit was made successfuly");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const withdrawFromAccount = (req, res) => {
  try {
    const { accountId, amount } = req.body;
    if (!isExist(accountId, "accounts")) {
      throw new Error("This account does not exist");
    }
    if (typeof amount !== "number") {
      throw new Error("Amount is not a number");
    }
    if (amount < 0) {
      throw new Error("Can withdraw only positive numbers");
    }
    const accounts = loadJson("accounts");
    const accountIndex = accounts.findIndex(
      (account) => accountId === account.id
    );
    if (accounts[accountIndex].cash + accounts[accountIndex].credit < amount) {
      throw new Error("Not enough cash and credit for this action");
    }
    updateAccountCash(-amount, accountId);
    updateUsers();
    res.status(200).send("The withdraw was made successfuly");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const transfer = (req, res) => {
  try {
    const { fromAccId, toAccId, amount } = req.body;
    if (!isExist(fromAccId, "accounts") || !isExist(toAccId, "accounts")) {
      throw new Error("One or two of the account IDs do not exist");
    }
    if (typeof amount !== "number") {
      throw new Error("Amount is not a number");
    }
    if (amount < 0) {
      throw new Error("Can transfer only positive numbers");
    }
    updateAccountCash(-amount, fromAccId);
    updateAccountCash(amount, toAccId);
    updateUsers();
    res.status(200).send("The transfer was made successfuly");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const updateCredit = (req, res) => {
  try {
    const { accountId, amount } = req.body;
    if (!isExist(accountId, "accounts")) {
      throw new Error("This account does not exist");
    }
    if (typeof amount !== "number") {
      throw new Error("Amount is not a number");
    }
    if (amount < 0) {
      throw new Error("Credit can only get positive numbers");
    }
    updateAccountCredit(accountId, amount);
    res.status(200).send("Credit updated successfuly");
  } catch (err) {
    res.status(400).send(err.message);
  }
};
