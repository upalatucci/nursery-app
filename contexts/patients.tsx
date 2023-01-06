import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Patient = {
  id: string;
  name: string;
  address?: string;
  expireDate?: string;
};

type ContextType = {
  patients: Patient[];
  addPatient: (name: string, address?: string, expireDate?: string) => void;
  removePatient: (id: string) => void;
};

export const PatientsContext = React.createContext<ContextType>({
  patients: [],
  addPatient: (_name) => null,
  removePatient: (_id: string) => null,
});

const Provider = PatientsContext.Provider;

const PatientsContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    AsyncStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    AsyncStorage.getItem("patients").then((patientsString) => {
      console.log(patientsString);
      if (patientsString) setPatients(JSON.parse(patientsString));
    });
  }, []);

  const addPatient = useCallback(
    (name: string, address?: string, expireDate?: string) => {
      setPatients((currentPatients) =>
        currentPatients.concat([
          {
            id: currentPatients.length.toString(),
            name,
            address,
            expireDate,
          },
        ])
      );
    },
    []
  );

  const removePatient = useCallback((id: string) => {
    setPatients((currentPatients) =>
      currentPatients.filter((p) => p.id !== id)
    );
  }, []);

  return (
    <Provider value={{ patients, addPatient, removePatient }}>
      {children}
    </Provider>
  );
};

export default PatientsContextProvider;
