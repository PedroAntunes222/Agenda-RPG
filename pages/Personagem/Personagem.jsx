import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AtributosRotas from "./Atributos/AtributosRotas";
import InventarioRotas from "./Inventario/InventarioRotas";

const Tab = createMaterialTopTabNavigator();

export default function Personagem() {
  return (
    <Tab.Navigator
        screenOptions={{
            tabBarStyle: {backgroundColor: '#1E1E1E'},
            tabBarLabelStyle: {color: 'white'},
        }}
      >
      <Tab.Screen 
        name="Atributos" 
        component={AtributosRotas} 
        options={{
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Equipamento" 
        component={InventarioRotas}
        options={{
          headerShown: false
        }}
      />
    </Tab.Navigator>
  )
}
