import { useRef, useState } from "react";
import { Diagnosis, Entry } from "../../types";
import "./NewEntryForm.styles.css";
import { Alert, Button, Input, InputLabel } from "@mui/material";
import { NewHealthCheckValidation } from "../../validation/newEntry";
import patients from "../../services/patients";
import { AxiosError } from "axios";

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
  const DescriptionRef = useRef<HTMLInputElement>();
  const dateRef = useRef<HTMLInputElement>();
  const SpecialistRef = useRef<HTMLInputElement>();
  const healthRef = useRef<HTMLInputElement>();
  const diagnosisRef = useRef<HTMLInputElement>();

  if (diagnosesCode == null) {
    throw new Error("diagnoses code are null");
  }
  const diagnosesCodes = diagnosesCode.map((e) => e.code);

  async function handleSubmission() {
    setError(null);
    const obj = {
      date: dateRef?.current?.value,
      specialist: SpecialistRef?.current?.value,
      type: "HealthCheck",
      description: DescriptionRef?.current?.value,
      healthCheckRating: Number(healthRef?.current?.value ?? 0),
    };
    const result = NewHealthCheckValidation.safeParse(obj);
    if (!result.success) {
      const errors = JSON.parse(result.error.message);
      setError(`${errors[0].path[0]} : ${errors[0].message}`);
    } else {
      const selectedDiagnoseCodes = diagnosisRef.current?.value
        .split(",")
        .map((e) => e.trim());
      if (selectedDiagnoseCodes) {
        selectedDiagnoseCodes.forEach((e) => {
          if (!diagnosesCodes.includes(e)) {
            setError("Invalid Diagnoses code");
          }
        });
      }
      if (error) {
        return;
      }
      try {
        const data = await patients.createNewEntry(patientId, obj);
        onData(data);
      } catch (e) {
        if (e instanceof AxiosError) {
          setError(e.message);
        }
      }
    }
  }

  return (
    <div className="form-border">
      <h3>New HealthCheck Entry</h3>
      {error && (
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      )}
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
      <div>
        <InputLabel>HealthCheck Rating</InputLabel>
        <Input fullWidth type="number" inputRef={healthRef}></Input>
      </div>
      <div>
        <InputLabel>Diagnosis Codes</InputLabel>
        <Input fullWidth type="text" inputRef={diagnosisRef}></Input>
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
