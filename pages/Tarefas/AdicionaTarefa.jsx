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
import DateTimePicker from "@react-native-community/datetimepicker";
import ModalSelector from "react-native-modal-selector";
import { TextInput, FAB } from "react-native-paper";
import { addTarefa } from "../../Database/tarefasDatabase";
import { getAtributos } from "../../Database/atributosDatabase";
// import { getTarefasAtributos } from "../../Database/tarefasDatabase";
import Tarefa from "../../class/tarefa";

export default function AdicionaTarefa() {
  
  const [showData, setShowData] = useState(false);
  const [showHora, setShowHora] = useState(false);

  const [db, setDb] = useState(SQLite.openDatabase("agenda.db"));
  const [atributos, setAtributos] = useState();
  const [atributosDisponiveis, setAtributosDisponiveis] = useState([]);

  const [XP, setXP] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [atributosUsados, setAtributosUsados] = useState();

  useEffect(()=>{
    getAtributos(setAtributos);
    // getTarefasAtributos(setAtributos)
    // console.log(atributos);
  }, [db]);

  useEffect(()=>{
    // console.log(atributos);
    if(atributos){
      let montaAtributos = atributos.map((atributo, index)=>({key:atributo.id, label: atributo.nome}));
      setAtributosDisponiveis(montaAtributos);
    }
  }, [atributos]);

  const adicionarTarefa = (e) => {
    e.preventDefault();

    let dataTarefa = data.toLocaleDateString("pt-BR");
    let horaTarefa = hora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    let novaTarefa = new Tarefa(
      1,
      XP,
      titulo,
      descricao,
      dataTarefa,
      horaTarefa,
      "Ativo",
      []
    );

    // let str;
    // str = JSON.stringify(novaTarefa);
    // str = JSON.stringify(novaTarefa, null, 4);
    // console.log(str);

    addTarefa(novaTarefa, atributosUsados);
  };

  const changeData = (event, selectedDate) => {
    let currentDate = selectedDate;
    setShowData(false);
    setData(currentDate);
  };

  const changeHora = (event, selectedHora) => {
    let currentHora = selectedHora;
    setShowHora(false);
    setHora(currentHora);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <TextInput
            label="XP"
            mode="outlined"
            keyboardType="numeric"
            value={XP || ""}
            onChangeText={(e) => {
              setXP(e);
            }}
            textColor="#fff"
            outlineColor="#fff"
            activeOutlineColor="#fff"
            style={{ marginHorizontal: 10, backgroundColor: "#323232" }}
            theme={{ colors: { onSurfaceVariant: "#fff" } }}
          />
          <TextInput
            label="Titulo"
            mode="outlined"
            value={titulo || ""}
            onChangeText={(e) => {
              setTitulo(e);
            }}
            textColor="#fff"
            outlineColor="#fff"
            activeOutlineColor="#fff"
            style={{ marginHorizontal: 10, backgroundColor: "#323232" }}
            theme={{ colors: { onSurfaceVariant: "#fff" } }}
          />
          <TextInput
            label="Descrição"
            mode="outlined"
            value={descricao || ""}
            onChangeText={(e) => {
              setDescricao(e);
            }}
            textColor="#fff"
            outlineColor="#fff"
            activeOutlineColor="#fff"
            style={{ marginHorizontal: 10, backgroundColor: "#323232" }}
            theme={{ colors: { onSurfaceVariant: "#fff" } }}
          />

          <TouchableOpacity onPress={() => setShowData(true)}>
            <TextInput
              label="Data"
              mode="outlined"
              disabled
              value={data.toLocaleDateString() || ""}
              disabledTextColor="white"
              textColor="#fff"
              outlineColor="#fff"
              activeOutlineColor="#fff"
              style={{ marginHorizontal: 10, backgroundColor: "#323232" }}
              theme={{ colors: { onSurfaceVariant: "#fff" } }}
            />
          </TouchableOpacity>
          {showData && (
            <DateTimePicker
              testID="dateTimePicker"
              value={data}
              mode="date"
              onChange={changeData}
            />
          )}
          <TouchableOpacity onPress={() => setShowHora(true)}>
            <TextInput
              label="Hora"
              mode="outlined"
              disabled
              value={hora.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }) || ""}
              disabledTextColor="white"
              textColor="#fff"
              outlineColor="#fff"
              activeOutlineColor="#fff"
              style={{ marginHorizontal: 10, backgroundColor: "#323232" }}
              theme={{ colors: { onSurfaceVariant: "#fff" } }}
            />
          </TouchableOpacity>
          {showHora && (
            <DateTimePicker
              testID="dateTimePicker"
              value={hora}
              mode="time"
              is24Hour={true}
              onChange={changeHora}
            />
          )}

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <ModalSelector
              style={{ width: "95%" }}
              data={atributosDisponiveis}
              initValue="Atributos"
              initValueTextStyle={{ color: "white" }} // 'placeholder'
              optionTextStyle={{ color: "black" }} // item nao selecionado na lista
              selectedItemTextStyle={{ color: "green" }} // item selecionado na lista
              selectTextStyle={{ color: "white" }} // texto do input
              selectStyle={{ borderWidth: 1, borderColor: "white" }} // borda do input
              onChange={(option) => {
                setAtributosUsados(option.key);
              }}
            />
          </View>

          <FAB
            style={{ backgroundColor: "green" }}
            onPress={(e) => {
              adicionarTarefa(e);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
