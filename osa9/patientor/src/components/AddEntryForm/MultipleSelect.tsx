import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Diagnosis } from "../../types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props = {
  diagnoses: Diagnosis[];
  selectedCodes: string[];
  onChange: (codes: string[]) => void;
};

export default function MultipleSelectCheckmarks({
  diagnoses,
  selectedCodes,
  onChange,
}: Props) {
  const handleChange = (event: SelectChangeEvent<typeof selectedCodes>) => {
    const {
      target: { value },
    } = event;
    onChange(typeof value === "string" ? value.split(",") : value);
  };

  const diagnosisCodes = diagnoses.map((d) => d.code);

  return (
    <div>
      <FormControl sx={{ mt: 2, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Diagnoses</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedCodes}
          onChange={handleChange}
          input={<OutlinedInput label="Diagnoses" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {diagnosisCodes.map((code) => (
            <MenuItem key={code} value={code}>
              <Checkbox checked={selectedCodes.includes(code)} />
              <ListItemText primary={code} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
