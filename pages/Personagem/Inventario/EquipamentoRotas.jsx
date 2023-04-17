
import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Equipamento from "./Equipamento";

export default function EquipamentoRotas() {
    
  const Stack = createNativeStackNavigator();

  return (
        <>
            <Stack.Navigator
              screenOptions={{
                contentStyle:{backgroundColor:'#1E1E1E'},
                headerStyle: {backgroundColor: '#1E1E1E'},
                headerTintColor: '#fff',
                headerTitleStyle:{fontSize:20}
              }}
            >

              <Stack.Screen name="ListaItens" component={Equipamento} options={{ 
                  title: 'Inventario',
                  headerShown: false
              }} />

            </Stack.Navigator>
        </>
  )
}