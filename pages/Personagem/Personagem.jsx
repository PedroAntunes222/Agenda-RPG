import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ListaAtributos from "../Atributos/ListaAtributos";
import AtributosRotas from "../Atributos/AtributosRotas";

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
      />
      <Tab.Screen 
        name="Equipamento" 
        component={ListaAtributos}
      />
    </Tab.Navigator>
  )
}
