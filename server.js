server .js const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

let balance = 500;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "Banking app is healthy"
  });
});

app.get("/api/balance", (req, res) => {
  res.json({ balance });
});

app.post("/api/deposit", (req, res) => {
  const amount = Number(req.body.amount);

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Enter a valid deposit amount" });
  }

  balance += amount;

  res.json({
    message: `Deposited $${amount}`,
    balance
  });
});

app.post("/api/withdraw", (req, res) => {
  const amount = Number(req.body.amount);

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Enter a valid withdrawal amount" });
  }

  if (amount > balance) {
    return res.status(400).json({ message: "Insufficient funds" });
  }

  balance -= amount;

  res.json({
    message: `Withdrew $${amount}`,
    balance
  });
});

app.listen(PORT, () => {
  console.log(`Banking app running on port ${PORT}`);
});