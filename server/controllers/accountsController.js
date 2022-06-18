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
    if (Number(amount) < 0) {
      throw new Error("Can deposit only positive numbers");
    }

    const accounts = loadJson("accounts");
    const accountIndex = accounts.findIndex(
      (account) => accountId === account.id
    );
    accounts[accountIndex].cash =
      Number(accounts[accountIndex].cash) + Number(amount);
    saveJson(accounts, "accounts");
    // addMoneyToAcount(amount,accountId)
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
    if (Number(amount) < 0) {
      throw new Error("Can withdraw only positive numbers");
    }

    const accounts = loadJson("accounts");
    const accountIndex = accounts.findIndex(
      (account) => accountId === account.id
    );
    accounts[accountIndex].cash =
      Number(accounts[accountIndex].cash) - Number(amount);
    if (accounts[accountIndex].cash + accounts[accountIndex].credit < amount) {
      throw new Error("Not enough cash and credit for this action");
    }
    saveJson(accounts, "accounts");
    // addMoneyToAcount(amount,accountId)
    updateUsers();
    res.status(200).send("The withdraw was made successfuly");
  } catch (err) {
    res.status(400).send(err.message);
  }
};
