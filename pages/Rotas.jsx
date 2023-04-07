
import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ListaTarefas from "./Tarefas/ListaTarefas";
import AdicionaTarefa from "./Tarefas/AdicionaTarefa";
import ViewTarefa from "./Tarefas/ViewTarefa";

export default function Rotas() {
    
  const Stack = createNativeStackNavigator();

  return (
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                contentStyle:{backgroundColor:'#1E1E1E'},
                headerStyle: {backgroundColor: '#1E1E1E'},
                headerTintColor: '#fff',
                headerTitleStyle:{fontSize:30}
              }}
            >
              <Stack.Screen name="Home" component={ListaTarefas} options={{ 
                  title: 'Quests',
              }} />
              <Stack.Screen name="Add" component={AdicionaTarefa} options={{ 
                  title: 'Add',
              }} />
              <Stack.Screen name="View" component={ViewTarefa} options={({ route }) => ({
                  title: route.params.title,
                  id: route.params.id
              })} />
            </Stack.Navigator>
          </ NavigationContainer>
  )
}