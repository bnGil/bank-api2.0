import { Account } from "../models/Account.models.js";

export const createAccount = async (cash = 0, credit = 0, usersIds = []) => {
  const newAccount = new Account({ cash, credit, usersIds });
  const savedAccount = await newAccount.save();
  return savedAccount;
};

export const getTotalCash = async (accountIds) => {
  const filteredAccounts = await Account.find({ _id: { $in: accountIds } });
  const totalCash = filteredAccounts.reduce((accum, account) => {
    return accum + account.cash;
  }, 0);
  return totalCash;
};

export const addUserIdToAccounts = async (userId, accountIds) => {
  await Promise.all(
    accountIds.map((accountId) =>
      Account.findByIdAndUpdate(accountId, { $push: { usersIds: userId } })
    )
  );
};

export const deleteAccounts = async (accountIds) => {
  await Account.deleteMany({ _id: { $in: accountIds } });
};
