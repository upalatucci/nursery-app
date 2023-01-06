import React, { useContext, useState } from "react";
import { Button } from "@react-native-material/core";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { ShiftsContext } from "../contexts/shifts";
import { Patient, PatientsContext } from "../contexts/patients";
import { formatDate } from "../utils";

function ModalScreen(props) {
  const date = props.route.params.date;
  const { patients } = useContext(PatientsContext);
  const { addShifts } = useContext(ShiftsContext);

  const [value, setValue] = useState(null);

  const [items, setItems] = useState(
    patients.map((patient) => ({ label: patient.name, value: patient.id }))
  );

  const [open, setOpen] = useState(false);

  const createShift = () => {
    const initialValue: Patient[] = [];

    const selectedPatients = items.reduce((acc, item) => {
      const patientItem = patients.find((p) => p?.id === item.value);

      if (patientItem) acc.push(patientItem);
      return acc;
    }, initialValue);

    addShifts(formatDate(date), selectedPatients);
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        multiple={true}
        mode="BADGE"
      />

      <Button onPress={createShift} title="Crea" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "space-evenly" },
  text: { fontSize: 30 },
});

export default ModalScreen;
