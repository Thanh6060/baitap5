const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware parse JSON
app.use(express.json());

// Middleware logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware checkAge
const checkAge = (req, res, next) => {
  const age = Number(req.query.age || req.body.age);

  if (!age || age < 18) {
    return res.status(400).json({
      error: "Bạn chưa đủ 18 tuổi",
    });
  }

  next();
};

// Serve static HTML
app.use(express.static("public"));

/*
  GET /api/info
*/
app.get("/api/info", checkAge, (req, res) => {
  const { name, age } = req.query;

  res.json({
    name,
    age,
    message: `Chào mừng ${name}!`,
  });
});

/*
  POST /api/register
*/
app.post("/api/register", (req, res) => {
  const { name, age, email } = req.body;

  if (!name || !age || !email) {
    return res.status(400).json({
      error: "Vui lòng điền đầy đủ",
    });
  }

  res.json({
    id: 1,
    name,
    age,
    email,
  });
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});