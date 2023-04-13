import React, { useState } from "react";
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TarefasRotas from "../Tarefas/TarefasRotas";
import AtributosRotas from "../Atributos/AtributosRotas";
import Personagem from "../Personagem/Personagem";

export default function BottomMenu() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Quests" component={TarefasRotas} />
        <Tab.Screen name="Personagem" component={Personagem} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}