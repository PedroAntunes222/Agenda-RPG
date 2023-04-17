import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TarefasRotas from "../Tarefas/TarefasRotas";
import Personagem from "../Personagem/Personagem";

export default function BottomMenu() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={() => ({
          headerTintColor: "#fff",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#1E1E1E",
          },
          tabBarStyle: {
            backgroundColor: "#1E1E1E",
            borderTopWidth: 0,
          },
          headerTitleStyle: {
            fontSize: 30,
          },
        })}
      >
        <Tab.Screen
          name="Quests"
          component={TarefasRotas}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen name="Personagem" component={Personagem} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
