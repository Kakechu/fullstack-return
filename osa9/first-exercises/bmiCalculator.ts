import { parseArguments } from "./helper";

const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0 || weight <= 0) {
    throw new Error("Height and weight must be positive numbers.");
  }
  const result = weight / Math.pow(height / 100, 2);

  switch (true) {
    case result < 16:
      return "Underweight (Severe thinness)";
    case result < 17:
      return "Underweight (Moderate thinness)";
    case result < 18.5:
      return "Underweight (Mild thinness)";
    case result < 25:
      return "Normal range";
    case result < 30:
      return "Overweight (Pre-obese)";
    case result < 35:
      return "Obese (Class I)";
    case result < 40:
      return "Obese (Class II)";
    case result >= 40:
      return "Obese (Class III)";
    default:
      throw new Error("Error!");
  }
};

if (require.main === module) {
  try {
    const parsed = parseArguments(process.argv);
    console.log(calculateBmi(parsed[0], parsed[1]));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}

export default calculateBmi;
