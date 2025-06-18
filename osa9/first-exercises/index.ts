import express from "express";
const app = express();
app.use(express.json());

import calculateBmi from "./bmiCalculator";
import { calculateExercises, ExerciseRequest } from "./exerciseCalculator";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  try {
    const bmi = calculateBmi(height, weight);

    const result = {
      weight,
      height,
      bmi,
    };

    res.send(result);
    return;
  } catch {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body as ExerciseRequest;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((n) => typeof n === "number") ||
    typeof target !== "number"
  ) {
    res.status(400).json({ error: "malformatted parameters " });
    return;
  }

  const result = calculateExercises(daily_exercises, target);
  res.send(result);
  return;
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
