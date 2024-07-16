import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import HealthRatingBar from "../HealthRatingBar";
import "./EntryDetails.style.css";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

interface EntryProps {
  entry: Entry;
}

function Wrapper({ children }: { children: JSX.Element }) {
  return <div className="wrapper">{children}</div>;
}

function HealthCheck({ entry }: { entry: HealthCheckEntry }) {
  return (
    <Wrapper>
      <div className="details">
        <div>
          {entry.date} <LocalHospitalIcon />
        </div>
        <div>{entry.description}</div>
        <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
        <div>Diagnose by {entry.specialist}</div>
      </div>
    </Wrapper>
  );
}

function HospitalCheck({ entry }: { entry: HospitalEntry }) {
  return (
    <Wrapper>
      <div className="details">
        <div>
          {entry.date} <LocalHospitalIcon />
        </div>
        <div>{entry.description}</div>
        <div>Diagnose by {entry.specialist}</div>
      </div>
    </Wrapper>
  );
}

function OccupationalCheck({ entry }: { entry: OccupationalHealthcareEntry }) {
  return (
    <Wrapper>
      <div className="details">
        <div>
          {entry.date} <WorkIcon /> {entry.employerName}
        </div>
        <div>{entry.description}</div>
        <div>Diagnose by {entry.specialist}</div>
      </div>
    </Wrapper>
  );
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default function EntryDetails({ entry }: EntryProps) {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    case "Hospital":
      return <HospitalCheck entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
}
