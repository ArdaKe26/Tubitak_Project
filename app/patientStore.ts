// Simple in-memory patient store for sharing between screens.
// This keeps data only during the app lifetime (no persistence).

let patients: string[] = [];
let selectedPatient: string | null = null;

export const getPatients = (): string[] => patients;

export const setPatients = (p: string[]): void => {
  patients = p;
};

export const addPatient = (p: string): void => {
  patients.push(p);
};

export const removePatient = (p: string): void => {
  patients = patients.filter((x) => x !== p);
};

export const getSelectedPatient = (): string | null => selectedPatient;

export const setSelectedPatient = (p: string | null): void => {
  selectedPatient = p;
};

export default {
  getPatients,
  setPatients,
  addPatient,
  removePatient,
  getSelectedPatient,
  setSelectedPatient,
};
