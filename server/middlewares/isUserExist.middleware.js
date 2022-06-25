import mongoose from "mongoose";
import { User } from "../models/User.models.js";

export const isUserExist = async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).send("User ID is missing");
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send("User ID is not valid");
  }
  const user = await User.findById({ _id: userId });
  if (!user) {
    return res.status(400).send("This user does not exist");
  }
  next();
};
