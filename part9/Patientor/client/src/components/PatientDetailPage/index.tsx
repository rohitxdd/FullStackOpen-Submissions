import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { Diagnosis, Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

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
  const navigate = useNavigate();

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
        <h3>Entries</h3>
        {data.entries.map((e) => {
          return (
            <React.Fragment key={e.id}>
              <p>{e.description}</p>
              <ul>
                {e.diagnosisCodes?.map((code) => {
                  const diagnosesDesc =
                    diagnoses?.find((e) => e.code === code)?.name || "";
                  return (
                    <li key={code}>
                      {code}: {diagnosesDesc}
                    </li>
                  );
                })}
              </ul>
            </React.Fragment>
          );
        })}
      </div>
    )
  );
}
