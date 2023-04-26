import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Inventario from "./Inventario";
import ViewItem from "./ViewItem";

export default function InventarioRotas() {
  const Stack = createNativeStackNavigator();

  return (
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: "#1E1E1E" },
          headerStyle: { backgroundColor: "#1E1E1E" },
          headerShadowVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: { fontSize: 30 },
        }}
      >
        
        <Stack.Screen
          name="ListaItens"
          component={Inventario}
          options={{
            title: "Inventario",
          }}
        />

        <Stack.Screen
          name="ViewItem"
          component={ViewItem}
          options={({ route }) => ({
            title: route.params.title,
            id: route.params.id,
          })}
        />
      </Stack.Navigator>
  );
}
