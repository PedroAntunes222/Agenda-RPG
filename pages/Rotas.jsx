
import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomMenu from "./components/BottomMenu";

import ListaTarefas from "./Tarefas/ListaTarefas";
import AdicionaTarefa from "./Tarefas/AdicionaTarefa";
import ViewTarefa from "./Tarefas/ViewTarefa";

import ListaAtributos from "./Atributos/ListaAtributos";
import AdicionaAtributo from "./Atributos/AdicionaAtributo";
import ViewAtributo from "./Atributos/ViewAtributo";

export default function Rotas() {
    
  const Stack = createNativeStackNavigator();

  return (
        <>
          <NavigationContainer>
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
              
              <Stack.Screen name="ListaAtributos" component={ListaAtributos} options={{ 
                  title: 'Atributos'
              }} />
              <Stack.Screen name="AddAtributo" component={AdicionaAtributo} options={{ 
                  title: 'Add',
              }} />
              <Stack.Screen name="ViewAtributo" component={ViewAtributo} options={({ route }) => ({
                  title: route.params.title,
                  id: route.params.id
              })} />
            </Stack.Navigator>
            <BottomMenu />
          </NavigationContainer>
        </>
  )
}