import { Account } from "../models/Account.models.js";
import { updateUsersCash } from "../services/users.service.js";

export const getAllAccounts = async (req, res) => {
  try {
    const allAccounts = await Account.find({});
    res.status(200).send(allAccounts);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const getAccountById = async (req, res) => {
  try {
    //check if exist
    const { accountId } = req.params;
    const account = await Account.find({ accountId });
    res.status(200).send(account);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const updateCredit = async (req, res) => {
  try {
    //check if exist
    const { accountId, amount } = req.body;
    await Account.findByIdAndUpdate({ _id: accountId }, { credit: amount });
    res.status(200).send("Credit updated successfuly");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const depositToAccount = async (req, res) => {
  try {
    //check if exist
    const { accountId, amount } = req.body;
    await Account.findByIdAndUpdate(
      { _id: accountId },
      { $inc: { cash: amount } }
    );
    await updateUsersCash(accountId, amount);
    res.status(200).send("The deposit was made successfuly");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const withdrawFromAccount = async (req, res) => {
  try {
    //check if exist
    const { accountId, amount } = req.body;
    await Account.findByIdAndUpdate(
      { _id: accountId },
      { $inc: { cash: -amount } }
    );
    await updateUsersCash(accountId, -amount);
    res.status(200).send("The withdraw was made successfuly");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const transfer = async (req, res) => {
  try {
    //check if exist
    const { fromAccId, toAccId, amount } = req.body;
    await Account.findByIdAndUpdate(
      { _id: fromAccId },
      { $inc: { cash: -amount } }
    );
    await Account.findByIdAndUpdate(
      { _id: toAccId },
      { $inc: { cash: amount } }
    );
    await updateUsersCash(fromAccId, -amount);
    await updateUsersCash(toAccId, amount);
    res.status(200).send("The transfer was made successfuly");
  } catch (err) {
    res.status(400).send(err.message);
  }
};
