import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { getAtributos, delAtributo } from "../../Database/atributosDatabase";

export default function ListaAtributos({ navigation }) {
  const [db, setDb] = useState(SQLite.openDatabase("agenda.db"));
  const [loading, setLoading] = useState(true);
  const [atributos, setAtributos] = useState([]);

  const handleAtributos = (atributos) => {
    setAtributos(atributos);
  };

  useEffect(() => {
    getAtributos(handleAtributos);
  }, [db]);

  useEffect(() => {
    // atualiza lista ao voltar
    navigation.addListener("focus", () => {
      getAtributos(handleAtributos);
    });
  }, [navigation]);

  useEffect(() => {
    setLoading(false);
    // console.log(atributos);
  }, [atributos]);

  return loading ? (
    <Text>Loading</Text>
  ) : (
    <SafeAreaView>
      <ScrollView>
        <View style={style.lista}>
          <TouchableOpacity
            style={style.card}
            onPress={(e) => navigation.navigate("AddAtributo")}
          >
            <Text style={style.cardTitle}> Adicionar Atributo </Text>
          </TouchableOpacity>

          {atributos.map((atributo, index) => (
            <TouchableOpacity
              style={style.card}
              key={index}
              onPress={(e) =>
                navigation.navigate({
                  name: "ViewAtributo",
                  params: {
                    title: atributo.titulo,
                    id: atributo.id,
                  },
                })
              }
            >
              <View style={style.cardInfos}>
                <View style={style.cardInfo}>
                  <Text style={style.cardText}>{atributo.nivel}</Text>
                  <Text style={style.cardText}>{atributo.xp}</Text>
                </View>
                <View style={style.cardInfo}>
                  <Text style={style.cardTitle}>{atributo.nome}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  lista: {
    flexDirection: "column",
    gap: 10,
    padding: 15,
  },
  card: {
    height: 100,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#323232",
    justifyContent: "space-between",
  },
  cardInfos: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardData: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 5,
  },
  cardTitle: {
    color: "white",
    fontSize: 20,
  },
  cardText: {
    color: "white",
    fontSize: 14,
  },
});
