import { parseArguments } from "./helper";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export type ExerciseRequest = {
  daily_exercises: number[];
  target: number;
};

export const calculateExercises = (days: number[], target: number): Result => {
  const periodLength = days.length;
  const trainingDays = days.filter((day) => day > 0).length;
  const average = days.reduce((acc, x) => acc + x, 0) / periodLength;
  const success = average >= target;
  let rating = 0;
  let ratingDescription = "";

  switch (true) {
    case average < target:
      rating = 1;
      ratingDescription = "try better next time!";
      break;
    case average === target:
      rating = 2;
      ratingDescription = "not too bad but could be better";
      break;
    case average > target:
      rating = 3;
      ratingDescription = "well done, keep it up!";
      break;
    default:
      throw new Error("Rating error!");
  }

  const calculatedResult = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };

  return calculatedResult;
};

if (require.main === module) {
  try {
    const inputExercises = parseArguments(process.argv);

    console.log(calculateExercises(inputExercises.slice(1), inputExercises[0]));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}
