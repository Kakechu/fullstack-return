import { useParams } from "react-router-dom";
import patients from "../../services/patients";
import { useEffect, useState } from "react";
import { Patient, Gender } from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

const PatientDetailsPage = () => {
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
    </div>
  );
};

export default PatientDetailsPage;
