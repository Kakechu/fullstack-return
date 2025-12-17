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
    res.status(400).send({ error: error.issues });
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
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry>) => {
    const patientId = req.params.id;
    const entryToAdd = toNewEntry(req.body);
    entryToAdd.diagnosisCodes = parseDiagnosisCodes(req.body);
    const addedEntry = patientService.addEntry(patientId, entryToAdd);
    res.json(addedEntry);
  }
);

router.use(errorMiddleware);

export default router;
