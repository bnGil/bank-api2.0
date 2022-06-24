import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  accountIds: {
    type: [String],
    required: true,
  },
  totalCash: {
    type: Number,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
