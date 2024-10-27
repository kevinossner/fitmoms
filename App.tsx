import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";

import MomsOverviewScreen from "./src/screens/moms/MomsOverviewScreen";
import CalendarScreen from "./src/screens/calendar/CalendarScreen";
import SessionDetailsScreen from "./src/screens/calendar/SessionDetailsScreen";
// import CourseDetailsScreen from "./src/screens/courses/CourseDetailsScreen";
import MomDetailsScreen from "./src/screens/moms/MomDetailsScreen";
import MomAddScreen from "./src/screens/moms/MomAddScreen";
import MomEditScreen from "./src/screens/moms/MomEditScreen";
import CourseOverviewScreen from "./src/screens/courses/CoursesOverviewScreen";
import CourseAddScreen from "./src/screens/courses/CourseAddScreen";
import SessionAddScreen from "./src/screens/calendar/SessionAddScreen";
import { RootStackParamList } from "./src/types/RootStackParamListType";
import { Amplify } from "aws-amplify";
import {
  withAuthenticator,
  useAuthenticator,
} from "@aws-amplify/ui-react-native";
import awsExports from "./src/aws-exports";

Amplify.configure(awsExports);

const MomsStack = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MomsOverview"
        component={MomsOverviewScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MomDetails"
        component={MomDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MomAdd"
        component={MomAddScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MomEdit"
        component={MomEditScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const CourseStack = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CourseOverview"
        component={CourseOverviewScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="CourseDetails"
        component={CourseDetailsScreen}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="CourseAdd"
        component={CourseAddScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const CalendarStack = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SessionDetails"
        component={SessionDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SessionAdd"
        component={SessionAddScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// const userSelector = (context: any) => [context.user];
// const SignOutButton = () => {
//   const { user, signOut } = useAuthenticator(userSelector);
//   return (
//     <Pressable onPress={signOut} style={styles.buttonContainer}>
//       <Text style={styles.buttonText}>
//         Hello, {user.username}! Click here to sign out!
//       </Text>
//     </Pressable>
//   );
// };

const App = () => {
  const Tab = createBottomTabNavigator();
  return (
    <>
      <SafeAreaView style={styles.topSafeArea} />
      <SafeAreaView style={styles.bottomSafeArea}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName: keyof typeof Ionicons.glyphMap;

                if (route.name === "Home") {
                  iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Mamas") {
                  iconName = focused ? "people" : "people-outline";
                } else if (route.name === "Kalender") {
                  iconName = focused ? "calendar" : "calendar-outline";
                } else if (route.name === "Kurse") {
                  iconName = focused ? "barbell" : "barbell-outline";
                } else {
                  iconName = "help";
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "#720039",
              tabBarInactiveTintColor: "gray",
            })}
          >
            <Tab.Screen
              name="Kalender"
              component={CalendarStack}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Mamas"
              component={MomsStack}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Kurse"
              component={CourseStack}
              options={{ headerShown: false }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};
export default withAuthenticator(App);
// export default App;

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor: "#f0f0f0",
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
