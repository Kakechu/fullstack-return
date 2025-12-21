import { useParams } from "react-router-dom";
import patients from "../../services/patients";
import { useEffect, useState } from "react";
import {
  Patient,
  Gender,
  Entry,
  Diagnosis,
  EntryType,
  NewEntry,
} from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetails from "./EntryDetails";
import {
  Alert,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AddEntryForm from "../AddEntryForm/AddEntryForm";
import patientService from "../../services/patients";
import axios from "axios";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientDetailsPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const id = useParams().id;
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      const data = await patients.getById(id);
      setPatient(data);
    };
    void fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }
  interface EntryTypeOption {
    value: EntryType;
    label: string;
  }

  const entryTypeOptions: EntryTypeOption[] = Object.values(EntryType).map(
    (v) => ({
      value: v,
      label: v.toString(),
    })
  );
  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const entryType = Object.values(EntryType).find(
        (e) => e.toString() === value
      );
      if (entryType) {
        setEntryType(entryType);
      }
    }
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const entry = await patientService.addEntry(patient.id, values);
      setPatient({ ...patient, entries: patient.entries.concat(entry) });
      setShowEntryForm(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response?.data) {
        const data = e.response.data;
        if (typeof data === "string") {
          setError(data);
        } else if (typeof data === "object" && "error" in data) {
          setError(e.response?.data as string);
        } else {
          setError("Unrecognized axios error");
        }
      }
    }
  };

  const onCancel = () => {
    setShowEntryForm(false);
  };

  return (
    <div>
      <h1>
        {patient.name} {patient.gender === Gender.Male && <MaleIcon />}
        {patient.gender === Gender.Female && <FemaleIcon />}
        {patient.gender === Gender.Other && <TransgenderIcon />}
      </h1>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      {error && <Alert severity="error">{error}</Alert>}
      {showEntryForm && (
        <AddEntryForm
          entryType={entryType}
          onSubmit={submitNewEntry}
          onCancel={onCancel}
          diagnoses={diagnoses}
        />
      )}
      <h2>entries</h2>
      {patient.entries.map((entry: Entry) => (
        <Box
          key={entry.id}
          border={2}
          borderRadius={2}
          padding={2}
          marginBottom={2}
        >
          <div>
            {entry.date}{" "}
            {entry.type === "HealthCheck" && <MedicalServicesIcon />}
            {entry.type === "OccupationalHealthcare" && (
              <>
                <WorkIcon /> {entry.employerName}
              </>
            )}
            {entry.type === "Hospital" && <LocalHospitalIcon />}
          </div>
          <i>{entry.description}</i>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code} {diagnoses.find((d) => d.code === code)?.name}
              </li>
            ))}
          </ul>
          <EntryDetails entry={entry} />
          <div>diagnose by {entry.specialist}</div>
        </Box>
      ))}
      <InputLabel style={{ marginTop: 20 }}>Entry Type</InputLabel>
      <Select
        label="Entry type"
        fullWidth
        value={entryType}
        onChange={onEntryTypeChange}
      >
        {entryTypeOptions.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowEntryForm(true)}
      >
        ADD NEW ENTRY
      </Button>
    </div>
  );
};

export default PatientDetailsPage;
