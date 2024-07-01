import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Patient } from "../../types";
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
  const navigate = useNavigate();

  useEffect(() => {
    async function getDetails(id: string) {
      const result = await patientService.getPatientDetails(id);
      setData(result);
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
      </div>
    )
  );
}
