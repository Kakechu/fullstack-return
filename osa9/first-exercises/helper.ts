export const parseArguments = (args: string[]): number[] => {
  if (args.length < 3) throw new Error("No arguments given!");
  if (args.length < 4) throw new Error("Not enough arguments!");

  args = args.slice(2);
  if (!args.every((a) => !isNaN(Number(a)))) {
    throw new Error("Provided values were not numbers!");
  }

  const parsedArgs = args.map((value) => Number(value));

  return parsedArgs;
};
