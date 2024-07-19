import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { Diagnosis, Entry, Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetails from "../EntryDetails/EntryDetails";
import { Button } from "@mui/material";
import NewEntryForm from "./NewEntryForm";

function GenderIcon({ gender }: { gender: "male" | "female" | "other" }) {
  switch (gender) {
    case "male":
      return <MaleIcon />;
    case "female":
      return <FemaleIcon />;
    case "other":
      return <TransgenderIcon />;
    default:
      return null;
  }
}

export default function PatientDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const navigate = useNavigate();

  function OnEntryData(newEntry: Entry) {
    setData((prev) => {
      if (!prev) return prev;
      return { ...prev, entries: [...prev.entries, newEntry] };
    });
    setShowForm(false);
  }

  useEffect(() => {
    async function getDetails(id: string) {
      const result = await patientService.getPatientDetails(id);
      const diaresult = await diagnosesService.getAllDiagnoses();
      setData(result);
      setDiagnoses(diaresult);
    }
    if (id) {
      void getDetails(id);
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  return (
    data && (
      <div>
        <h2>
          {data.name} {<GenderIcon gender={data.gender} />}
        </h2>
        <h4>ssn: {data.ssn}</h4>
        <h4>occupation: {data.occupation}</h4>
        {!showForm ? (
          <Button variant="contained" onClick={() => setShowForm(!showForm)}>
            Add New Entry
          </Button>
        ) : (
          <NewEntryForm
            patientId={id as string}
            setForm={setShowForm}
            diagnosesCode={diagnoses}
            onData={OnEntryData}
          />
        )}
        {data.entries.length > 0 ? (
          <>
            <h3>Entries</h3>
            {data.entries.map((e) => (
              <EntryDetails key={e.id} entry={e} />
            ))}
          </>
        ) : (
          <h3>No Entries Found</h3>
        )}
      </div>
    )
  );
}
