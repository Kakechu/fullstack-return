import express, { NextFunction, Request, Response } from "express";
import patientService from "../services/patientService";
import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from "../types";
import { parseDiagnosisCodes, toNewEntry, toNewPatient } from "../utils";
import { z } from "zod";

const router = express.Router();

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    const messages = error.issues.map((i) => {
      const path = i.path.join(".");
      console.log(error.issues);

      return `Value of ${path} incorrect`;
    });

    res.status(400).send(messages.join(", "));
  } else {
    next(error);
  }
};

// Endpoints

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req: Request, res: Response<Patient>) => {
  const patient = patientService.getPatientById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post(
  "/",
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const patientToAdd = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(patientToAdd);
    res.json(addedPatient);
  }
);

router.post(
  "/:id/entries",
  (
    req: Request<{ id: string }, unknown, NewEntry>,
    res: Response<Entry>,
    next: NextFunction
  ) => {
    try {
      const patientId = req.params.id;
      const entryToAdd = toNewEntry(req.body);
      entryToAdd.diagnosisCodes = parseDiagnosisCodes(req.body);
      const addedEntry = patientService.addEntry(patientId, entryToAdd);
      res.json(addedEntry);
    } catch (e: unknown) {
      next(e);
    }
  }
);

router.use(errorMiddleware);

export default router;
