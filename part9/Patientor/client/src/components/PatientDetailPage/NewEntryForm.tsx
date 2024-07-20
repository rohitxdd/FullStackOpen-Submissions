import { useRef, useState } from "react";
import {
  Diagnosis,
  Entry,
  EntryTypes,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import "./NewEntryForm.styles.css";
import {
  Alert,
  Button,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  NewHealthCheckValidation,
  NewHospitalValidation,
  NewOccupationalValidation,
} from "../../validation/newEntry";
import patients from "../../services/patients";
import { AxiosError } from "axios";
import diagnoses from "../../services/diagnoses";

interface NewEntryProps {
  setForm: (x: boolean) => void;
  diagnosesCode: Diagnosis[] | null;
  patientId: string;
  onData: (x: Entry) => void;
}

export default function NewEntryForm({
  patientId,
  setForm,
  diagnosesCode,
  onData,
}: NewEntryProps) {
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState<EntryTypes>("HealthCheck");
  const [selecteddiaCode, setSelectedDiaCodes] = useState<string[]>([]);
  const DescriptionRef = useRef<HTMLInputElement>();
  const dateRef = useRef<HTMLInputElement>();
  const SpecialistRef = useRef<HTMLInputElement>();
  const healthRef = useRef<HTMLInputElement>();
  const dischargeRef = useRef<HTMLInputElement>();
  const criteriaRef = useRef<HTMLInputElement>();
  const employerRef = useRef<HTMLInputElement>();
  const sickFromRef = useRef<HTMLInputElement>();
  const sickToRef = useRef<HTMLInputElement>();

  const EntryTuple = ["HealthCheck", "Hospital", "OccupationalHealthcare"];

  if (diagnosesCode == null) {
    throw new Error("diagnoses code are null");
  }
  const diagnosesCodes = diagnosesCode.map((e) => e.code);

  const handleChange = (event: SelectChangeEvent<typeof selecteddiaCode>) => {
    const {
      target: { value },
    } = event;
    setSelectedDiaCodes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  async function handleSubmission() {
    setError(null);

    let EntryObj: Entry;

    if (type === "HealthCheck") {
      const obj = {
        date: dateRef?.current?.value,
        specialist: SpecialistRef?.current?.value,
        type,
        description: DescriptionRef?.current?.value,
        healthCheckRating: Number(healthRef?.current?.value ?? 0),
      };

      const result = NewHealthCheckValidation.safeParse(obj);
      if (!result.success) {
        const errors = JSON.parse(result.error.message);
        setError(`${errors[0].path[0]} : ${errors[0].message}`);
        return;
      } else {
        EntryObj = obj as HealthCheckEntry;
      }
    } else if (type === "Hospital") {
      const obj = {
        date: dateRef?.current?.value,
        specialist: SpecialistRef?.current?.value,
        type,
        description: DescriptionRef?.current?.value,
        discharge: {
          date: dischargeRef?.current?.value,
          criteria: criteriaRef?.current?.value,
        },
      };
      const result = NewHospitalValidation.safeParse(obj);
      if (!result.success) {
        const errors = JSON.parse(result.error.message);
        setError(`${errors[0].path[0]} : ${errors[0].message}`);
        return;
      } else {
        EntryObj = obj as HospitalEntry;
      }
    } else {
      const obj: Record<string, any> = {
        date: dateRef?.current?.value,
        specialist: SpecialistRef?.current?.value,
        type,
        description: DescriptionRef?.current?.value,
        employerName: employerRef?.current?.value,
      };

      if (sickFromRef?.current?.value) {
        obj.sickLeave = {
          startDate: sickFromRef?.current.value,
          endDate: sickToRef?.current?.value,
        };
      }

      const result = NewOccupationalValidation.safeParse(obj);
      if (!result.success) {
        const errors = JSON.parse(result.error.message);
        setError(`${errors[0].path[0]} : ${errors[0].message}`);
        return;
      } else {
        EntryObj = obj as OccupationalHealthcareEntry;
      }
    }

    if (selecteddiaCode.length > 0) {
      for (let index = 0; index < selecteddiaCode.length; index++) {
        const element = selecteddiaCode[index];
        if (!diagnosesCodes.includes(element)) {
          setError("Invalid Diagnoses code");
          return;
        }
      }
      EntryObj.diagnosisCodes = selecteddiaCode;
    }

    try {
      const data = await patients.createNewEntry(patientId, EntryObj);
      onData(data);
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.message);
      } else {
        setError("Something went wrong");
      }
    }
  }

  function handleDropDownChange(event: SelectChangeEvent) {
    if (EntryTuple.includes(event.target.value)) {
      const v = event.target.value as EntryTypes;
      setType(v);
    }
  }
  return (
    <div className="form-border">
      <h3>New Entry Form</h3>
      {error && (
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      )}
      <div>
        <InputLabel id="entry-label">Entry Type</InputLabel>
        <Select
          fullWidth
          labelId="entry-label"
          value={type}
          onChange={handleDropDownChange}
        >
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            Occupational Healthcare
          </MenuItem>
        </Select>
      </div>
      <div>
        <InputLabel>Description</InputLabel>
        <Input fullWidth type="text" inputRef={DescriptionRef}></Input>
      </div>
      <div>
        <InputLabel>Date</InputLabel>
        <Input fullWidth type="date" inputRef={dateRef}></Input>
      </div>
      <div>
        <InputLabel>Specialist</InputLabel>
        <Input fullWidth type="text" inputRef={SpecialistRef}></Input>
      </div>
      {type === "HealthCheck" && (
        <div>
          <InputLabel>HealthCheck Rating</InputLabel>
          <Input fullWidth type="number" inputRef={healthRef}></Input>
        </div>
      )}

      {type === "Hospital" && (
        <>
          <div>
            <InputLabel>Discharge Date</InputLabel>
            <Input fullWidth type="date" inputRef={dischargeRef}></Input>
          </div>
          <div>
            <InputLabel>Discharge Criteria</InputLabel>
            <Input fullWidth type="text" inputRef={criteriaRef}></Input>
          </div>
        </>
      )}

      {type === "OccupationalHealthcare" && (
        <>
          <div>
            <InputLabel>Employer Name</InputLabel>
            <Input fullWidth type="text" inputRef={employerRef}></Input>
          </div>
          <div>
            <InputLabel>Sick Leave From</InputLabel>
            <Input fullWidth type="date" inputRef={sickFromRef}></Input>
          </div>
          <div>
            <InputLabel>Sick Leave To</InputLabel>
            <Input fullWidth type="date" inputRef={sickToRef}></Input>
          </div>
        </>
      )}
      <div>
        <InputLabel id="diagnoses-multi">Diagnosis</InputLabel>
        <Select
          labelId="diagnoses-multi"
          multiple
          value={selecteddiaCode}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
        >
          {diagnosesCode.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.name}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="button-wrapper">
        <Button variant="contained" color="primary" onClick={handleSubmission}>
          ADD
        </Button>
        <Button
          variant="contained"
          color="error"
          className="cancel-button"
          onClick={() => setForm(false)}
        >
          CANCEL
        </Button>
      </div>
    </div>
  );
}
