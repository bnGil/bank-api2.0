import {
  addUserIdToAccounts,
  createNewAccount,
  getTotalCash,
} from "./accountsUtils.js";
import { loadJson, saveJson } from "./jsonUtils.js";

export const createNewUser = (userId, accountIds) => {
  if (accountIds.length === 0) {
    const newAccount = createNewAccount([userId]);
    accountIds.push(newAccount.id);
  } else {
    addUserIdToAccounts(userId, accountIds);
  }
  const users = loadJson("users");
  const newUser = {
    id: userId,
    accountIds,
    totalCash: getTotalCash(accountIds),
  };
  users.push(newUser);
  saveJson(users, "users");
};
