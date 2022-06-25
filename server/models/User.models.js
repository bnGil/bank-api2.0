import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
  },
  accountIds: {
    type: [String],
  },
  totalCash: {
    type: Number,
  },
});

export const User = mongoose.model("User", userSchema);
