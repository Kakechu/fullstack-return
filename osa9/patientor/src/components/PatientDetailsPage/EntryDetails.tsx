import { green, orange, red, yellow } from "@mui/material/colors";
import {
  Entry,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HealthCheckRating,
} from "../../types";
import FavoriteIcon from "@mui/icons-material/Favorite";

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({
  entry,
}) => {
  return (
    <div>
      <div>discharge date: {entry.discharge.date}</div>
      <div>discharge criteria: {entry.discharge.criteria}</div>
    </div>
  );
};

const OccupationalEntryDetails: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <div>
      {entry.sickLeave && (
        <div>
          sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </div>
      )}
    </div>
  );
};

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  const determineColor = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return green[500];
      case HealthCheckRating.LowRisk:
        return yellow[500];
      case HealthCheckRating.HighRisk:
        return orange[500];
      case HealthCheckRating.CriticalRisk:
        return red[500];
      default:
        return assertNever(rating);
    }
  };

  return (
    <div>
      <FavoriteIcon sx={{ color: determineColor(entry.healthCheckRating) }} />
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const assertNever = (entry: unknown): never => {
  throw new Error(`Unknown entry type: ${entry}`);
};

export default EntryDetails;
