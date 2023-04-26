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
  const [inventario, setInventario] = useState();

  useEffect(() => {
    // setLoading(true);
    getInventario(setInventario);
  }, [db]);

  useEffect(() => {
    // atualiza lista ao voltar
    navigation.addListener("focus", () => {
      setLoading(true);
      getInventario(setInventario);
      setLoading(false);
    });
  }, [navigation]);

  const windowHeight = Dimensions.get("window").height;

  return (
    inventario !== undefined && (
      <SafeAreaView
        style={{ backgroundColor: "#1E1E1E", height: windowHeight }}
      >
        <ScrollView>
          {inventario.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={(e) => {
                navigation.navigate({
                  name: "ViewItem",
                  params: {
                    title: item.nome,
                    id: item.id,
                  },
                });
                setLoading(true);
                // delTarefa(tarefa.id);
              }}
            >
              <View>
                <Text>{item.nome}</Text>
                <Text>{item.descricao}</Text>
                <Text>{item.quantidade}</Text>
                <Text>{item.equipamento}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    )
  );
}
