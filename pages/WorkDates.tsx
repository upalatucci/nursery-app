import {
  HStack,
  Icon,
  IconButton,
  ListItem,
} from "@react-native-material/core";
import React, { useContext, useState } from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { ShiftsContext } from "../contexts/shifts";
import CalendarPicker from "react-native-calendar-picker";
import { convertToDate, formatDate, shiftDate } from "../utils";
import ShiftDate from "../components/ShiftDate";

const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
  const fontSize = isFirst ? 16 : 14;
  const color = isFirst ? "black" : "#43515c";

  return (
    <TouchableOpacity style={[{ height: reservation.height }]}>
      <Text style={{ fontSize, color }}>{reservation.name}</Text>
    </TouchableOpacity>
  );
};

const WorkDates = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { shifts } = useContext(ShiftsContext);

  const [date, setDate] = useState(new Date());

  const onDateChange = (newDate: any) => {
    setDate(newDate?.clone()?.utc()?.startOf("day")?.toDate() || new Date());
  };

  const shift = shifts.find((s) => s.date === formatDate(date));

  return (
    <View style={styles.container}>
      <CalendarPicker onDateChange={onDateChange} />

      <FlatList
        data={shift?.patients}
        renderItem={({ item, index }) => (
          <ListItem title={item.name} secondaryText={shiftDate(date, index)} />
        )}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      <View style={styles.plusIconView}>
        <IconButton
          icon={(props) => <Icon name="plus" {...props} />}
          color="white"
          contentContainerStyle={styles.plusIcon}
          onPress={() => navigation.navigate("Modal", { date })}
        />
      </View>
    </View>
  );
};

export default WorkDates;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  plusIcon: {
    backgroundColor: "purple",
  },
  plusIconView: {
    position: "absolute",
    right: 30,
    bottom: 30,
  },
  date: {
    flex: 1,
  },
  list: {
    flex: 1,
    width: "100%",
  },
});
