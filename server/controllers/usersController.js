import { isExist, loadJson } from "../utils/jsonUtils.js";
import { createNewUser } from "../utils/usersUtils.js";

export const getAllUsers = (req, res) => {
  try {
    const users = loadJson("users");
    res.status(200).json(users);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const getUserById = (req, res) => {
  try {
    const userId = req.params.userId;
    if (!isExist(userId, "users")) {
      throw new Error("This user does not exist");
    }
    const users = loadJson("users");
    const user = users.find((user) => user.id === userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const createUser = (req, res) => {
  try {
    const { userId, accountIds } = req.body;
    console.log(userId, accountIds);
    if (!userId) {
      throw new Error("Missing user ID");
    }
    if (isExist(userId, "users")) {
      throw new Error("This user already exist");
    }
    if (accountIds.some((accountId) => !isExist(accountId, "accounts"))) {
      throw new Error(`One or more of the accounts IDs mentioned do not exist`);
    }

    createNewUser(userId, accountIds);
    res.status(200).send("User has been created successfuly");
  } catch (err) {
    res.status(400).send(err.message);
  }
};
