import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WorkDates from "./pages/WorkDates";
import Patients from "./pages/Patients";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PatientsContextProvider from "./contexts/patients";
import { Icon, IconComponentProvider } from "@react-native-material/core";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ShiftsContextProvider from "./contexts/shifts";
import ModalScreen from "./components/ModalScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();

const RootStack = createStackNavigator();

export type RootStackParamList = {
  Modal: { date: Date };
  Prestazioni: undefined;
  Pazienti: undefined;
};

const TabScreen = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Prestazioni"
      component={WorkDates}
      options={{
        tabBarIcon: (props) => <Icon name="calendar" {...props} />,
      }}
    />
    <Tab.Screen
      name="Pazienti"
      component={Patients}
      options={{
        tabBarIcon: (props) => <Icon name="account" {...props} />,
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <SafeAreaProvider>
        <PatientsContextProvider>
          <ShiftsContextProvider>
            <NavigationContainer>
              <RootStack.Navigator>
                <RootStack.Group screenOptions={{ headerShown: false }}>
                  <RootStack.Screen name="root" component={TabScreen} />
                </RootStack.Group>
                <RootStack.Group screenOptions={{ presentation: "modal" }}>
                  <RootStack.Screen name="Modal" component={ModalScreen} />
                </RootStack.Group>
              </RootStack.Navigator>
            </NavigationContainer>
          </ShiftsContextProvider>
        </PatientsContextProvider>
      </SafeAreaProvider>
    </IconComponentProvider>
  );
}
