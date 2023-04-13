
import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ListaTarefas from "./ListaTarefas";
import ViewTarefa from "./ViewTarefa";
import AdicionaTarefa from "./AdicionaTarefa";

export default function TarefasRotas() {
    
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
        <>
            <Stack.Navigator
              screenOptions={{
                contentStyle:{backgroundColor:'#1E1E1E'},
                headerStyle: {backgroundColor: '#1E1E1E'},
                headerTintColor: '#fff',
                headerTitleStyle:{fontSize:30}
              }}
            >

              <Stack.Screen name="ListaTarefas" component={ListaTarefas} options={{ 
                  title: 'Quests',
              }} />

              <Stack.Screen name="AddTarefa" component={AdicionaTarefa} options={{ 
                  title: 'Add',
              }} />
              
              <Stack.Screen name="ViewTarefa" component={ViewTarefa} options={({ route }) => ({
                  title: route.params.title,
                  id: route.params.id
              })} />

            </Stack.Navigator>
        </>
  )
}