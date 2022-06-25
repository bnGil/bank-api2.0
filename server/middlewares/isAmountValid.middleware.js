export const isAmountValid = async (req, res, next) => {
  const { amount } = req.body;
  if (!amount) {
    return res.status(400).send("Amount is missing");
  }
  if (typeof amount !== "number") {
    return res.status(400).send("Amount must be a number");
  }
  if (amount < 0) {
    return res.status(400).send("Amount must be positive");
  }
  next();
};
