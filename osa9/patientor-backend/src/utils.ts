import {
  NewPatient,
  Gender,
  HealthCheckRating,
  Diagnosis,
  NewEntry,
} from "./types";
import { z } from "zod";

// Patient-related utils
export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};

// Entry-related schemas and utils
export const dischargeSchema = z.object({
  date: z.string(),
  criteria: z.string(),
});

export const baseNewEntrySchema = z.object({
  description: z.string().min(1),
  date: z.string().min(1),
  specialist: z.string().min(1),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const healthCheckEntrySchema = baseNewEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

export const hospitalEntrySchema = baseNewEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: dischargeSchema,
});

export const occupationalHealthcareEntrySchema = baseNewEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({ startDate: z.string(), endDate: z.string() })
    .optional(),
});

export const entrySchema = z.union([
  healthCheckEntrySchema,
  hospitalEntrySchema,
  occupationalHealthcareEntrySchema,
]);

export const toNewEntry = (object: unknown): NewEntry => {
  return entrySchema.parse(object);
};

export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};
