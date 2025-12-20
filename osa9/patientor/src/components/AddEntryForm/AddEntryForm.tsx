import {
  TextField,
  Box,
  Button,
  Grid,
  SelectChangeEvent,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, SyntheticEvent } from "react";
import {
  NewEntry,
  EntryType,
  HealthCheckRating,
  HealthCheckRatingString,
} from "../../types";

type Props = {
  entryType: EntryType;
  onSubmit: (values: NewEntry) => Promise<void>;
  onCancel: () => void;
};

const AddEntryForm = ({ entryType, onSubmit, onCancel }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setdiagnosisCodes] = useState("");
  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRatingString>(HealthCheckRatingString.Healthy);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  interface HealthCheckRatingOption {
    value: HealthCheckRatingString;
    label: string;
  }

  const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(
    HealthCheckRatingString
  ).map((v) => ({
    value: v,
    label: v.toString(),
  }));

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const healthCheckRating = Object.values(HealthCheckRatingString).find(
        (e) => e.toString() === value
      );
      if (healthCheckRating) {
        setHealthCheckRating(healthCheckRating);
      }
    }
  };

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();

    const entry = {
      description,
      date,
      specialist,
      diagnosisCodes: handleDiagnosisCodes(),
    };

    let entryToAdd: NewEntry;

    const assertNever = (value: never): never => {
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
    };

    switch (entryType) {
      case EntryType.HealthCheck:
        const ratingMap: Record<HealthCheckRatingString, HealthCheckRating> = {
          Healthy: HealthCheckRating.Healthy,
          LowRisk: HealthCheckRating.LowRisk,
          HighRisk: HealthCheckRating.HighRisk,
          CriticalRisk: HealthCheckRating.CriticalRisk,
        };

        entryToAdd = {
          ...entry,
          healthCheckRating: ratingMap[healthCheckRating],
          type: "HealthCheck",
        };
        break;
      case EntryType.Hospital:
        entryToAdd = {
          ...entry,
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
          type: "Hospital",
        };
        break;
      case EntryType.OccupationalHealthcare:
        entryToAdd = {
          ...entry,
          employerName,
          sickLeave:
            sickLeaveStart && sickLeaveEnd
              ? {
                  startDate: sickLeaveStart,
                  endDate: sickLeaveEnd,
                }
              : undefined,
          type: "OccupationalHealthcare",
        };
        break;
      default:
        return assertNever(entryType);
    }

    await onSubmit(entryToAdd);
  };

  const handleDiagnosisCodes = () => {
    return diagnosisCodes.split(",").map((code) => code.trim());
  };

  return (
    <Box
      border={2}
      borderRadius={2}
      padding={2}
      paddingBottom={6}
      marginTop={2}
    >
      <div>
        <div>
          New{" "}
          {(entryType === EntryType.HealthCheck && "Health Check") ||
            (entryType === EntryType.Hospital && "Hospital") ||
            (entryType === EntryType.OccupationalHealthcare &&
              "Occupational Health Care")}{" "}
          Entry
        </div>
        <form onSubmit={addEntry}>
          <TextField
            label="Description"
            fullWidth
            variant="standard"
            required
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label="Date"
            fullWidth
            variant="standard"
            required
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            label="Specialist"
            fullWidth
            variant="standard"
            required
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <TextField
            label="Diagnosis codes"
            fullWidth
            variant="standard"
            value={diagnosisCodes}
            onChange={({ target }) => setdiagnosisCodes(target.value)}
          />
          {/* Health Check-Specific fields */}
          {entryType === EntryType.HealthCheck && (
            <div>
              <InputLabel style={{ marginTop: 20 }}>
                Health Check Rating
              </InputLabel>
              <Select
                label="Health Check Rating"
                fullWidth
                value={healthCheckRating}
                onChange={onHealthCheckRatingChange}
              >
                {healthCheckRatingOptions.map((option) => (
                  <MenuItem key={option.label} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </div>
          )}
          {/* Hospital-Specific fields */}
          {entryType === EntryType.Hospital && (
            <div>
              {" "}
              <InputLabel style={{ marginTop: 20 }}>Sickleave</InputLabel>
              <TextField
                label="Date"
                fullWidth
                variant="standard"
                required
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
                style={{ marginLeft: 16 }}
              />
              <TextField
                label="Criteria"
                fullWidth
                variant="standard"
                required
                value={dischargeCriteria}
                onChange={({ target }) => setDischargeCriteria(target.value)}
                style={{ marginLeft: 16 }}
              />
            </div>
          )}
          {/* Occupational Healthcare-Specific fields */}
          {entryType === EntryType.OccupationalHealthcare && (
            <div>
              {" "}
              <TextField
                label="Employer"
                fullWidth
                variant="standard"
                required
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />
              <InputLabel style={{ marginTop: 20 }}>Sickleave</InputLabel>
              <TextField
                label="Start Date"
                fullWidth
                variant="standard"
                value={sickLeaveStart}
                onChange={({ target }) => setSickLeaveStart(target.value)}
                style={{ marginLeft: 16 }}
              />
              <TextField
                label="End Date"
                fullWidth
                variant="standard"
                value={sickLeaveEnd}
                onChange={({ target }) => setSickLeaveEnd(target.value)}
                style={{ marginLeft: 16 }}
              />
            </div>
          )}
          <Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                style={{ float: "left" }}
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  float: "right",
                }}
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Box>
  );
};

export default AddEntryForm;
