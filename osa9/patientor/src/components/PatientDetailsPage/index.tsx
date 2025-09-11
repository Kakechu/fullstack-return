import { useParams } from "react-router-dom";
import patients from "../../services/patients";
import { useEffect, useState } from "react";
import { Patient, Gender, Entry, Diagnosis } from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetails from "./EntryDetails";
import { Box, Button } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientDetailsPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const id = useParams().id;

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

  return (
    <div>
      <h1>
        {patient.name} {patient.gender === Gender.Male && <MaleIcon />}
        {patient.gender === Gender.Female && <FemaleIcon />}
        {patient.gender === Gender.Other && <TransgenderIcon />}
      </h1>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
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
      <Button variant="contained" color="primary">
        ADD NEW ENTRY
      </Button>
    </div>
  );
};

export default PatientDetailsPage;
