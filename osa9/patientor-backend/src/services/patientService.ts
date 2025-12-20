import patients from "../../data/patients";

import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  NewEntry,
  Entry,
} from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    return undefined;
  }
  return {
    ...patient,
    entries: patient.entries ?? [],
  };
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const patient = getPatientById(patientId);
  const added = {
    id: uuid(),
    ...entry,
  };
  patient?.entries.push(added);
  return added;
};

export default {
  getPatients,
  getPatientById,
  getNonSensitivePatients,
  addPatient,
  addEntry,
};
