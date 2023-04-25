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
import * as SQLite from "expo-sqlite";
import { getInventario } from "../../Database/inventarioDatabase";
import { getItens } from "../../Database/ItemDatabase";

export default function Inventario({ navigation }) {
  const [db, setDb] = useState(SQLite.openDatabase("agenda.db"));
  const { loading, setLoading } = useContext(LoadingContext);
  const [inventario, setInventario] = useState([]);

  handleInventario = (itens) => {
    setInventario(itens);
    console.log(inventario);
  };

  useEffect(() => {
    // setLoading(true);
    getInventario(handleInventario);
  }, [db]);

  useEffect(() => {
    // atualiza lista ao voltar
    navigation.addListener("focus", () => {
      setLoading(true);
      getInventario(handleInventario);
      setLoading(false);
    });
  }, [navigation]);

  const windowHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView style={{ backgroundColor: "#1E1E1E", height: windowHeight }}>
      <ScrollView>
        <Text>Inventario</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
