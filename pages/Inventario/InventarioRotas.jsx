
import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Inventario from "./Inventario";

export default function InventarioRotas() {
    
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

              <Stack.Screen name="Inventario" component={Inventario} options={{ 
                  title: 'Inventario',
                  headerShown: false
              }} />

            </Stack.Navigator>
        </>
  )
}