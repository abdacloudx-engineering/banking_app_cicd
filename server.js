const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Demo balance. This will reset when the app restarts.
let balance = 500;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "Banking app is running successfully"
  });
});

app.get("/api/balance", (req, res) => {
  res.json({
    balance: balance
  });
});

app.post("/api/deposit", (req, res) => {
  const amount = Number(req.body.amount);

  if (!amount || amount <= 0) {
    return res.status(400).json({
      message: "Deposit amount must be greater than zero"
    });
  }

  balance += amount;

  res.json({
    message: `Successfully deposited $${amount}`,
    balance: balance
  });
});

app.post("/api/withdraw", (req, res) => {
  const amount = Number(req.body.amount);

  if (!amount || amount <= 0) {
    return res.status(400).json({
      message: "Withdrawal amount must be greater than zero"
    });
  }

  if (amount > balance) {
    return res.status(400).json({
      message: "Insufficient funds"
    });
  }

  balance -= amount;

  res.json({
    message: `Successfully withdrew $${amount}`,
    balance: balance
  });
});

app.listen(PORT, () => {
  console.log(`Banking app is running on port ${PORT}`);
});