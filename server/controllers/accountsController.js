import { loadJson } from "../utils/jsonUtils.js";

export const getAllAccounts = (req, res) => {
  try {
    const accounts = loadJson("accounts");
    res.status(200).json(accounts);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
