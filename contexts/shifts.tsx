import React, { useCallback, useEffect, useState } from "react";
import type { Patient } from "./patients";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Shift = {
  date: string;
  patients: Patient[];
};

type ContextType = {
  shifts: Shift[];
  addShifts: (date: string, patients: Patient[]) => void;
  removeShift: (date: string) => void;
};

export const ShiftsContext = React.createContext<ContextType>({
  shifts: [],
  addShifts: (_date, _patients) => null,
  removeShift: (_id: string) => null,
});

const Provider = ShiftsContext.Provider;

const ShiftsContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [shifts, setShifts] = useState<Shift[]>([]);

  useEffect(() => {
    AsyncStorage.setItem("shifts", JSON.stringify(shifts));
  }, [shifts]);

  useEffect(() => {
    AsyncStorage.getItem("shifts").then((patientsString) => {
      if (patientsString) setShifts(JSON.parse(patientsString));
    });
  }, []);

  const addShifts = useCallback((date: string, patients: Patient[]) => {
    setShifts((currentShifts) =>
      currentShifts.concat([
        {
          date,
          patients,
        },
      ])
    );
  }, []);

  const removeShift = useCallback((date: string) => {
    setShifts((currentShifts) => currentShifts.filter((p) => p.date !== date));
  }, []);

  return (
    <Provider value={{ shifts, addShifts, removeShift }}>{children}</Provider>
  );
};

export default ShiftsContextProvider;
