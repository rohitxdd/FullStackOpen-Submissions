import axios from "axios";
import { Entry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getPatientDetails = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const createNewEntry = async (id: string, obj: object) => {
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/${id}/entries`, obj);

  console.log(data);
  return data;
};

export default {
  getAll,
  create,
  getPatientDetails,
  createNewEntry,
};
