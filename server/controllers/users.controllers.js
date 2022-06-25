import { User } from "../models/User.models.js";
import {
  addUserIdToAccounts,
  createAccount,
  getTotalCash,
} from "../services/account.service.js";
import { deleteUserFromDB } from "../services/users.service.js";

export const createUser = async (req, res) => {
  try {
    const { name, accountIds } = req.body;
    // make check middleware. see old project validation
    if (accountIds.length === 0) {
      const newAccount = await createAccount();
      accountIds.push(newAccount._id);
    }
    const totalCash = await getTotalCash(accountIds);
    const newUser = new User({ name, accountIds, totalCash });
    addUserIdToAccounts(newUser._id, accountIds);
    await newUser.save();
    res.status(201).send("User has been created successfuly");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).send(allUsers);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    //check if exist
    const { userId } = req.params;
    const user = await User.find({ userId });
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    //check if exist
    const { userId } = req.body;
    await deleteUserFromDB(userId);
    res.status(204).send("User was deleted successfuly");
  } catch (err) {
    res.status(400).send(err.message);
  }
};
