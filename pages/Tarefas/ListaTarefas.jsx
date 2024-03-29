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
import { getEquipamento } from "../../Database/inventarioDatabase";
import { getTarefas, delTarefa } from "../../Database/tarefasDatabase";
import DataTarefa from "./components/DataTarefa/DataTarefa";
import Tarefa from "../../class/tarefa";

export default function ListaTarefas({ navigation }) {
  const [db, setDb] = useState(SQLite.openDatabase("agenda.db"));
  const [tarefas, setTarefas] = useState();
  const [equipamento, setEquipamento] = useState();

  const { loading, setLoading } = useContext(LoadingContext);

  const handleTarefas = (tarefas) => {
    setTarefas(tarefas);
    // console.log(tarefas);
  };

  useEffect(() => {
    // initDB();
    getTarefas(handleTarefas);
    getEquipamento(setEquipamento);
    setLoading(false);
  }, [db]);

  useEffect(() => {
    // atualiza lista ao voltar
    navigation.addListener("focus", () => {
      setLoading(true);
      getTarefas(handleTarefas);
      setLoading(false);
    });
  }, [navigation]);

  const windowHeight = Dimensions.get("window").height;

  return (
    tarefas !== undefined && (
      <SafeAreaView
        style={{ backgroundColor: "#1E1E1E", height: windowHeight, flex: 1}}
      >
        <ScrollView>
          <View style={style.lista}>
            <TouchableOpacity
              style={[
                style.card,
                { alignItems: "center", justifyContent: "center" },
              ]}
              onPress={(e) => {
                navigation.navigate("AddTarefa");
                setLoading(true);
              }}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                Adicionar Tarefa
              </Text>
            </TouchableOpacity>

            {tarefas.map((tarefa, index) => (
              <TouchableOpacity
                style={style.card}
                key={index}
                onPress={(e) => {
                  navigation.navigate({
                    name: "ViewTarefa",
                    params: {
                      title: tarefa.titulo,
                      id: tarefa.id,
                    },
                  });
                  setLoading(true);
                  // delTarefa(tarefa.id);
                }}
              >
                <View style={style.cardInfos}>
                  <View style={style.cardInfo}>
                    <Text style={{ color: "white", fontSize: 18 }}>
                      {tarefa.hora}
                    </Text>
                    <View
                      style={[
                        style.cardAtributo,
                        { backgroundColor: tarefa.atributo_cor },
                      ]}
                    ></View>
                  </View>
                  <View>
                    <Text style={{ color: "white", fontSize: 24 }}>
                      {tarefa.titulo}
                    </Text>
                  </View>
                </View>

                <DataTarefa
                  repeticao={tarefa.repeticao}
                  data={tarefa.data}
                  hora={tarefa.hora}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
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
  cardInfo: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cardAtributo: {
    width: 20,
    height: 20,
    borderRadius: 100,
  },
  cardData: {
    // backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 5,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});
