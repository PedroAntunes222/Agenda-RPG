import React, { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../context/loading";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { getTarefa } from "../../Database/tarefasDatabase";
import Tarefa from "../../class/tarefa";

export default function ViewTarefa({ navigation, route }) {
  const [db, setDb] = useState(SQLite.openDatabase("agenda.db"));
  const [tarefa, setTarefa] = useState();
  
  const { loading, setLoading } = useContext(LoadingContext);

  const handleTarefa = async () => {
    await getTarefa(route.params.id, (tarefa) => {
      setTarefa(tarefa);
    });
  };

  useEffect(() => {
    handleTarefa();
  }, [db]);

  useEffect(() => {
    console.log(tarefa);
    if (tarefa !== undefined) {
      setLoading(false);
    }
  }, [tarefa]);

  return (
    !loading && (
      <View>
        <Text>{tarefa[0].descricao}</Text>

        <View style={style.infosTarefa}>
          <View style={style.infoBloco}>
            <Text style={style.text}>Data</Text>
            <Text style={style.text}>{tarefa[0].data}</Text>
          </View>

          <View style={style.infoBloco}>
            <Text style={style.text}>Hora</Text>
            <Text style={style.text}>{tarefa[0].hora}</Text>
          </View>

          <View style={style.infoBloco}>
            <Text style={style.text}>Atributo</Text>
            <View
              style={[
                style.atributo,
                { backgroundColor: tarefa[0].atributo_cor },
              ]}
            ></View>
          </View>

          <View style={style.infoBloco}>
            <Text style={style.text}>Item</Text>
            <Text style={style.text}>{tarefa[0].item_nome}</Text>
          </View>

          <View style={style.infoBloco}>
            <Text style={style.text}>Magia</Text>
            <Text style={style.text}>{tarefa[0].magia_nome}</Text>
          </View>
        </View>
      </View>
    )
  );
}

const style = StyleSheet.create({
  infosTarefa: {
    width: "100%",
    marginHorizontal: "auto",
    flexDirection: "column",
    gap: 10,
    padding: 20,
  },
  infoBloco: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    paddingBottom: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  atributo: {
    width: 25,
    height: 25,
    borderRadius: 100,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});
