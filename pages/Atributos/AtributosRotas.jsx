
import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ListaAtributos from "./ListaAtributos";
import ViewAtributo from "./ViewAtributo"
import AdicionaAtributo from "./AdicionaAtributo";

export default function AtributosRotas() {
    
  const Stack = createNativeStackNavigator();

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

              <Stack.Screen name="ListaAtributos" component={ListaAtributos} options={{ 
                  title: 'Lista de Atributos',
              }} />

              <Stack.Screen name="AddAtributo" component={AdicionaAtributo} options={{ 
                  title: 'Add',
              }} />

              <Stack.Screen name="ViewAtributo" component={ViewAtributo} options={({ route }) => ({
                  title: route.params.title,
                  id: route.params.id
              })} />

            </Stack.Navigator>
        </>
  )
}