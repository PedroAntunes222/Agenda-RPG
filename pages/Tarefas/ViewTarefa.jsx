import React, { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../context/loading";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { getTarefa, completaTarefa } from "../../Database/tarefasDatabase";
import { uparAtributo, getAtributo } from "../../Database/atributosDatabase";
import Tarefa from "../../class/tarefa";
import Atributo from "../../class/atributo";
import { FAB } from "react-native-paper";
import moment from "moment";
import "moment-timezone";

export default function ViewTarefa({ navigation, route }) {
  const [db, setDb] = useState(SQLite.openDatabase("agenda.db"));
  const [tarefa, setTarefa] = useState();
  const [atributo, setAtributo] = useState();

  const { loading, setLoading } = useContext(LoadingContext);
  const [data, setData] = useState();
  // const [atributoID, setAtributoID] = useState();

  const handleAtributo = async (atributoID) => {
    await getAtributo(atributoID, (atributo) => {
      setAtributo(atributo);
    });
  };

  const handleTarefa = async () => {
    await getTarefa(route.params.id, (tarefa) => {
      setTarefa(tarefa);
      handleAtributo(tarefa[0].atributo_id);
    });
  };

  useEffect(() => {
    handleTarefa();
    setLoading(false);
  }, [db]);

  const completar = async (id, data, repeticao, atributoID) => {
    await getAtributo(atributoID, (atributo) => {
      setAtributo(atributo);
    });

    let status = "";
    let proximaData = "";
    let xpGanho = 0;
    const dataAtual = moment().tz("America/Sao_Paulo").format("DD/MM/YYYY");
    const dataTarefa = moment(data, "DD/MM/YYYY").format("DD/MM/YYYY");

    // se a data atual já tiver passado da data da tarefa
    if (dataAtual > dataTarefa) {
      status = "atrasada";
      xpGanho = 0;
      proximaData = "days";
      console.log("tarefa atrasada");
    } else {
      // cada completagem vem com status, xp e a proxima data
      if (repeticao === "diario") {
        status = "espera";
        xpGanho = 1;
        proximaData = "days";
        console.log("tarefa diaria completa");
      } else if (repeticao === "semanal") {
        status = "espera";
        xpGanho = 2;
        proximaData = "week";
        console.log("tarefa semanal completa");
      } else if (repeticao === "mensal") {
        status = "espera";
        xpGanho = 5;
        proximaData = "month";
        console.log("tarefa mensal completa");
      } else if (repeticao === "anual") {
        status = "espera";
        xpGanho = 10;
        proximaData = "year";
        console.log("tarefa anual completa");
      } else {
        status = "completa";
        xpGanho = 3;
        proximaData = "days";
        console.log("tarefa unica completa");
      }
    }

    const NivelAtual = atributo[0].nivel;
    const XpAtual = atributo[0].xp;

    let novoNivel = NivelAtual;

    const somaXp = XpAtual + xpGanho;

    if (somaXp >= 10) {
      xpGanho = somaXp - 10;
      novoNivel++;
    } else {
      xpGanho = somaXp;
    }
    
    const upAtributo = new Atributo(atributoID, "", "", novoNivel, xpGanho);

    uparAtributo(upAtributo);

    const novaData = moment()
      .tz("America/Sao_Paulo")
      .add(1, proximaData)
      .format("DD/MM/YYYY");

    const proximaTarefa = new Tarefa(
      id, 
      0, 
      'titulo', 
      'descricao', 
      'repeticao', 
      novaData, 
      'hora', 
      status, 
      'atributo', 
      [], 
      []
    );

    // console.log(proximaTarefa)
    completaTarefa(proximaTarefa);
  };

  return (
    tarefa !== undefined && (
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
            <Text style={style.text}>Repetição</Text>
            <Text style={style.text}>{tarefa[0].repeticao}</Text>
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

        <FAB
          style={{ backgroundColor: "green" }}
          onPress={(e) => {
            completar(
              tarefa[0].id,
              tarefa[0].data,
              tarefa[0].repeticao,
              tarefa[0].atributo_id
            );
          }}
        />
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
