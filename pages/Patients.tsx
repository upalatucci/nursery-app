import React, { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { PatientsContext } from "../contexts/patients";
import AddPatientForm from "../components/AddPatient";
import { Icon, ListItem } from "@react-native-material/core";

const Patients = () => {
  const { patients, removePatient } = useContext(PatientsContext);
  return (
    <View style={styles.container}>
      <AddPatientForm />

      <FlatList
        data={patients}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            secondaryText={`${item.address}   ${item.expireDate}`}
            trailing={(props) => (
              <Icon
                name="trash-can"
                {...props}
                onPress={() => removePatient(item.id)}
              />
            )}
          />
        )}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

export default Patients;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    flex: 1,
    width: "100%",
  },
});
