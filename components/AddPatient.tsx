import React, { useContext, useState } from "react";
import { StyleSheet, Text } from "react-native";
import {
  Button,
  HStack,
  Icon,
  Stack,
  TextInput,
} from "@react-native-material/core";
import { PatientsContext } from "../contexts/patients";
import DatePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const AddPatientForm = () => {
  const { addPatient } = useContext(PatientsContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [showDate, setShowDate] = useState(false);

  const onDateChange = (
    event: DateTimePickerEvent,
    newDate: Date | undefined
  ) => {
    setDate(newDate || new Date());
    setShowDate(false);
  };

  return (
    <Stack spacing={10} style={styles.container}>
      <TextInput
        label="Nome"
        value={name}
        onChangeText={setName}
        leading={(props) => <Icon name="account" {...props} />}
      />
      <TextInput
        label="Indirizzo"
        value={address}
        onChangeText={setAddress}
        leading={(props) => <Icon name="home" {...props} />}
      />
      <HStack style={styles.date} spacing={10}>
        <Text>Data fine piano</Text>
        <Text>{date.toLocaleDateString()}</Text>
        <Button title="Cambia" onPress={() => setShowDate(true)} />
        {showDate && (
          <DatePicker mode="date" value={date} onChange={onDateChange} />
        )}
      </HStack>
      <Button
        title="Aggiungi"
        onPress={() => addPatient(name, address, date.toLocaleDateString())}
      />
    </Stack>
  );
};

export default AddPatientForm;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    width: "80%",
  },
  date: {
    alignItems: "center",
  },
});
