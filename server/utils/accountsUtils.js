import { v4 as uuidv4 } from "uuid";
import { loadJson, saveJson } from "./jsonUtils.js";

export const createNewAccount = (usersIds) => {
  const accounts = loadJson("accounts");
  const newAccount = {
    id: uuidv4(),
    cash: 0,
    credit: 0,
    usersIds: usersIds,
    isActive: true,
  };
  accounts.push(newAccount);
  saveJson(accounts, "accounts");
  return newAccount;
};

export const getTotalCash = (accountIds) => {
  const accounts = loadJson("accounts");
  const filteredAccounts = accounts.filter((account) =>
    accountIds.includes(account.id)
  );
  const totalCash = filteredAccounts.reduce((accum, account) => {
    return accum + account.cash;
  }, 0);
  return totalCash;
};

export const addUserIdToAccounts = (userId, accountIds) => {
  console.log(userId);
  const accounts = loadJson("accounts");
  accounts.forEach((account) => {
    if (accountIds.includes(account.id)) {
      account.usersIds.push(userId);
    }
  });
  saveJson(accounts, "accounts");
};
