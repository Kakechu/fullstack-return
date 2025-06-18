import express from "express";
const app = express();

import calculateBmi from "./bmiCalculator";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get(`/bmi`, (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  try {
    const bmi = calculateBmi(height, weight);

    const result = {
      weight,
      height,
      bmi,
    };

    res.send(result);
  } catch (error: any) {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
