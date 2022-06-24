import mongoose from "mongoose";

const { Schema } = mongoose;

const accountSchema = new Schema({
  usersIds: {
    type: [String],
    required: true,
  },
  credit: {
    type: Number,
    required: true,
    validate(val) {
      if (val < 0) {
        throw new Error("Credit must be positive!");
      }
    },
  },
  cash: {
    type: Number,
    required: true,
  },
});

export const Account = mongoose.model("Account", userSchema);
