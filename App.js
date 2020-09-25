import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import ListsScreen from "./src/screens/ListsScreen";
import RepeatScreen from "./src/screens/RepeatScreen";
import TranslateScreen from "./src/screens/TranslateScreen";
import { Provider as WordProvider } from "./src/context/WordContext";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const ListsStack = createStackNavigator();
const TranslateStack = createStackNavigator();
const RepeatStack = createStackNavigator();

const ListsStackScreen = () => {
  return (
    <ListsStack.Navigator>
      <ListsStack.Screen name="Lists" component={ListsScreen} />
    </ListsStack.Navigator>
  );
};

const TranslateStackScreen = () => {
  return (
    <TranslateStack.Navigator>
      <TranslateStack.Screen name="Translate" component={TranslateScreen} />
    </TranslateStack.Navigator>
  );
};

const RepeatStackScreen = () => {
  return (
    <RepeatStack.Navigator>
      <RepeatStack.Screen name="Repeat" component={RepeatScreen} />
    </RepeatStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <WordProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Translate"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === "Translate") {
                return <FontAwesome name="magic" size={size} color={color} />;
              } else if (route.name === "Lists") {
                return (
                  <Ionicons
                    name={focused ? "ios-list-box" : "ios-list"}
                    size={size}
                    color={color}
                  />
                );
              } else {
                return <Ionicons name="md-school" size={size} color={color} />;
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="Translate" component={TranslateStackScreen} />
          <Tab.Screen name="Lists" component={ListsStackScreen} />
          <Tab.Screen name="Repeat" component={RepeatStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </WordProvider>
  );
};

export default App;
