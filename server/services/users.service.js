import { Account } from "../models/Account.models.js";
import { User } from "../models/User.models.js";

export const deleteUserFromDB = async (userId) => {
  await User.findByIdAndDelete(userId);
  await Account.updateMany(
    { usersIds: userId },
    { $pull: { usersIds: userId } }
  );
  await Account.deleteMany({ usersIds: { $size: 0 } });
};
