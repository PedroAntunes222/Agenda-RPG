import React, { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../context/loading";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";


export default function Inventario() {


  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(()=>{
    // setLoading(true);
  },[]);

  const windowHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView style={{ backgroundColor: "#1E1E1E", height: windowHeight }}>
      <ScrollView>
        <Text>Inventario</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
