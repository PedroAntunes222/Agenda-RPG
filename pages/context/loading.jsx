import React, { createContext, useState } from "react";
import { View,Text, StyleSheet } from "react-native";

export const LoadingContext = createContext(true);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && <View style={style.loading}><Text style={{color:'white'}}>Loading</Text></View>}
      {children}
    </LoadingContext.Provider>
  );
};


const style = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: '#1E1E1E'
  }
});
