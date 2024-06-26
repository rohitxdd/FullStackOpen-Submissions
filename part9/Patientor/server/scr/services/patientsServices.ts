import data from "../data/patients";
import { PatientsEntry } from "../types";
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
    gender: parseString(gender),
    occupation: String(occupation),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
  };
  data.push(newEntry);
  return newEntry;
}

function parseString(str: unknown): string {
  if (str && isString(str)) {
    return String(str);
  } else {
    throw new Error("Not a valid string");
  }
}

const isString = (text: unknown): boolean => {
  return typeof text === "string" || text instanceof String;
};

export { newPatientEntry };
