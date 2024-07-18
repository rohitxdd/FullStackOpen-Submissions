import data from "../data/patients";
import diagnoses from "../data/diagnoses";
const diagnosesCodes = diagnoses.map((e) => e.code);
import {
  PatientsEntry,
  Gender,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
  BaseEntry,
  Entry,
} from "../types";
import { v1 as uuid } from "uuid";

function newPatientEntry(
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown
): PatientsEntry {
  const newEntry: PatientsEntry = {
    name: parseString(name),
    dateOfBirth: parseString(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: String(occupation),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    entries: [], //empty for now
  };
  data.push(newEntry);
  return newEntry;
}

function newEntryService(newEntry: Entry, patientid: string): number {
  const index = data.findIndex((e) => e.id === patientid);
  if (index !== -1) {
    data[index].entries.push(newEntry);
  }
  return index;
}

function parseNewEntryData(
  description: unknown,
  date: unknown,
  specialist: unknown,
  type: unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rest: any
): Entry {
  const newEntry: Omit<BaseEntry, "id"> = {
    description: parseString(description),
    date: parseString(date),
    specialist: parseString(specialist),
  };

  switch (type) {
    case "HealthCheck":
      const healthCheckEntry: HealthCheckEntry = {
        id: uuid(),
        description: newEntry.description,
        date: newEntry.date,
        specialist: newEntry.specialist,
        type: "HealthCheck",
        healthCheckRating: parseFloat(
          parseString(rest.healthCheckRating)
        ) as HealthCheckRating,
      };
      return healthCheckEntry;
    case "Hospital":
      const hospitalEntry: HospitalEntry = {
        id: uuid(),
        description: newEntry.description,
        date: newEntry.date,
        specialist: newEntry.specialist,
        type,
        discharge: rest.discharge as { date: string; criteria: string },
        diagnosisCodes: parseDiagnoseCode(rest.diagnosisCodes),
      };
      return hospitalEntry;
    case "OccupationalHealthcare":
      const occupationalHealthcareEntry: OccupationalHealthcareEntry = {
        id: uuid(),
        description: newEntry.description,
        date: newEntry.date,
        specialist: newEntry.specialist,
        type,
        employerName: rest.employerName as string,
        sickLeave: rest.sickLeave as
          | { startDate: string; endDate: string }
          | undefined,
      };
      return occupationalHealthcareEntry;
    default:
      throw new Error("Invalid entry type");
  }
}

function findPatientById(id: string) {
  const res = data.find((e) => e.id === id);
  return res;
}

function parseDiagnoseCode(codes: unknown): string[] {
  try {
    if (Array.isArray(codes)) {
      codes.forEach((code) => {
        if (isString(code) && diagnosesCodes.includes(code as string)) {
          //ok
        } else {
          throw new Error();
        }
      });
      return codes as string[];
    }
    throw new Error("Not a array");
  } catch {
    throw new Error("Bad Fields");
  }
}

function parseString(str: unknown): string {
  if (str && isString(str)) {
    return String(str);
  } else {
    throw new Error("Not a valid string");
  }
}

function parseGender(gender: unknown): Gender {
  if (
    isString(gender) &&
    (gender === Gender.Male ||
      gender === Gender.Female ||
      gender === Gender.Other)
  ) {
    return gender as Gender;
  } else {
    throw new Error("Not a valid gender");
  }
}

const isString = (text: unknown): boolean => {
  return typeof text === "string" || text instanceof String;
};

export { newPatientEntry, findPatientById, parseNewEntryData, newEntryService };
