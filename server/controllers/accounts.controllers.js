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
    const { accountId } = req.body;
    const account = await Account.find({ _id: accountId });
    res.status(200).send(account);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const updateCredit = async (req, res) => {
  try {
    //check if exist
    console.log(req.body);
    const { accountId, amount } = req.body;
    await Account.findOneAndUpdate(
      { _id: accountId },
      { credit: amount },
      { runValidators: true }
    );
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
    const { fromAccId, toAccId, amount } = req.body;
    const fromAccount = await Account.findById({ _id: fromAccId });
    const toAccount = await Account.findById({ _id: toAccId });
    if (!fromAccount || !toAccount) {
      return res.status(400).send("One or two of the accounts do not exist");
    }
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
