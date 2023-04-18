
import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Grimorio from "./Grimorio";

export default function GrimorioRotas() {
    
  const Stack = createNativeStackNavigator();

  return (
            <Stack.Navigator
              screenOptions={{
                contentStyle:{backgroundColor:'#1E1E1E'},
                headerStyle: {backgroundColor: '#1E1E1E'},
                headerTintColor: '#fff',
                headerTitleStyle:{fontSize:20}
              }}
            >

              <Stack.Screen name="listaMagias" component={Grimorio} options={{ 
                  title: 'Grimorio',
                  headerShown: false
              }} />

            </Stack.Navigator>
  )
}