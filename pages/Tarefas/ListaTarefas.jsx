import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { initDB } from "../../Database/sqsliteDatabase";
import { getTarefas, delTarefa } from "../../Database/tarefasDatabase";
import Tarefa from "../../class/tarefa";

export default function ListaTarefas({ navigation }) {
  const [db, setDb] = useState(SQLite.openDatabase("agenda.db"));
  const [loading, setLoading] = useState(true);
  const [tarefas, setTarefas] = useState([]);

  const handleTarefas = (tarefas) => {
    setTarefas(tarefas);
    // console.log(tarefas);
  };

  useEffect(() => {
    initDB();
    getTarefas(handleTarefas);
  }, [db]);

  useEffect(() => {
    // atualiza lista ao voltar
    navigation.addListener("focus", () => {
      getTarefas(handleTarefas);
    });
  }, [navigation]);

  useEffect(() => {
    setLoading(false);
    // console.log(tarefas);
  }, [tarefas]);

  const DataTarefa = ({ data }) => {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    let dataSeparada = data.split('/');
    let dia = dataSeparada[0];
    let mes = dataSeparada[1];
    let mesExtenso = meses[mes - 1].slice(0, 3);

    return (
      <View style={style.cardData}>
        <Text style={{color: "white", fontSize: 24}}>{dia}</Text>
        <Text style={{color: "white", fontSize: 20}}>{mesExtenso}</Text>
      </View>
    );
  };

  return loading ? (
    <Text>Loading</Text>
  ) : (
    <SafeAreaView>
      <ScrollView>
        <View style={style.lista}>
          <TouchableOpacity
            style={[
              style.card,
              { alignItems: "center", justifyContent: "center" },
            ]}
            onPress={(e) => navigation.navigate("AddTarefa")}
          >
            <Text style={{ color: "white", fontSize: 20 }}>
              {" "}
              Adicionar Tarefa{" "}
            </Text>
          </TouchableOpacity>

          {tarefas.map((tarefa, index) => (
            <TouchableOpacity
              style={style.card}
              key={index}
              onPress={(e) =>
                navigation.navigate({
                  name: "ViewTarefa",
                  params: {
                    title: tarefa.titulo,
                    id: tarefa.id,
                  },
                })
              }
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

              <DataTarefa data={tarefa.data} />
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
  cardInfo: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardAtributo: {
    width: 20,
    height: 20,
    borderRadius: 100,
  },
  cardData: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 5,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});
