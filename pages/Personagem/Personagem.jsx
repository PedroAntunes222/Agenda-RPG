import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AtributosRotas from "./Atributos/AtributosRotas";
import EquipamentoRotas from "./Equipamentos/EquipamentoRotas";
import GrimorioRotas from "./Grimorio/GrimorioRotas";

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
        component={EquipamentoRotas}
        options={{
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Grimorio" 
        component={GrimorioRotas}
        options={{
          headerShown: false
        }}
      />

    </Tab.Navigator>
  )
}
