import React, { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../context/loading";
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
import DateTimePickerModal from "react-native-modal-datetime-picker";

import ModalSelector from "react-native-modal-selector";
import { TextInput, FAB } from "react-native-paper";
import { addTarefa } from "../../Database/tarefasDatabase";
import { getAtributos } from "../../Database/atributosDatabase";
import { getItens } from "../../Database/ItemDatabase";
import { getMagias } from "../../Database/magiaDatabase";
import Tarefa from "../../class/tarefa";
import moment from "moment";
import "moment-timezone";

export default function AdicionaTarefa() {
  const [db, setDb] = useState(SQLite.openDatabase("agenda.db"));
  const { loading, setLoading } = useContext(LoadingContext);

  const [data, setData] = useState();
  const [hora, setHora] = useState();

  const [showData, setShowData] = useState(false);
  const [showHora, setShowHora] = useState(false);

  const [atributos, setAtributos] = useState();
  const [atributosDisponiveis, setAtributosDisponiveis] = useState([]);
  const [atributoUsado, setatributoUsado] = useState();

  const [itens, setItens] = useState();
  const [itensDisponiveis, setItensDisponiveis] = useState([]);
  const [recompensaItem, setRecompensaItem] = useState();

  const [magias, setMagias] = useState();
  const [magiasDisponiveis, setMagiasDisponiveis] = useState([]);
  const [recompensaMagia, setRecompensaMagia] = useState();

  const [XP, setXP] = useState(0);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [repeticao, setRepeticao] = useState("");

  useEffect(() => {
    getItens(setItens);
    getMagias(setMagias);
    getAtributos(setAtributos);
    // console.log(itens);
  }, [db]);

  useEffect(() => {
    // console.log(atributos);
    if (atributos) {
      let montaAtributos = atributos.map((atributo) => ({
        key: atributo.id,
        label: atributo.nome,
      }));
      setAtributosDisponiveis(montaAtributos);
    }
    if (itens) {
      let montaItens = itens.map((item) => ({
        key: item.id,
        label: item.nome,
      }));
      setItensDisponiveis(montaItens);
      // console.log(itensDisponiveis);
    }
    if (magias) {
      let montaMagias = magias.map((item) => ({
        key: item.id,
        label: item.nome,
      }));
      setMagiasDisponiveis(montaMagias);
      // console.log(montaMagias);
    }

    if (magias && itens && atributos) {
      setLoading(false);
    }

  }, [atributos, itens, magias]);

  const adicionarTarefa = (e) => {

    e.preventDefault();

    let novaTarefa = new Tarefa(
      1,
      XP,
      titulo,
      descricao,
      repeticao,
      data,
      hora,
      "Ativo",
      atributoUsado,
      recompensaItem,
      recompensaMagia
    );

    // let str;
    // str = JSON.stringify(novaTarefa);
    // str = JSON.stringify(novaTarefa, null, 4);
    // console.log(str);

    addTarefa(novaTarefa);
  };

  const handleDateConfirm = (date) => {
    const dateformat = moment(date).format("DD/MM/YYYY");
    setData(dateformat);
    setShowData(false);
    console.log("A date has been picked: ", dateformat);
  };

  const handleTimeConfirm = (time) => {
    const timeformat = moment(time).format("HH:mm");
    setHora(timeformat);
    setShowHora(false);
    console.log("A date has been picked: ", timeformat);
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
              value={data || ""}
              disabledTextColor="white"
              textColor="#fff"
              outlineColor="#fff"
              activeOutlineColor="#fff"
              style={{ marginHorizontal: 10, backgroundColor: "#323232" }}
              theme={{ colors: { onSurfaceVariant: "#fff" } }}
            />
          </TouchableOpacity>

          {showData && (
            <DateTimePickerModal
              isVisible={showData}
              mode="date"
              is24Hour={true}
              onConfirm={handleDateConfirm}
              onCancel={(e) => setShowData(false)}
            />
          )}

          <TouchableOpacity onPress={() => setShowHora(true)}>
            <TextInput
              label="Hora"
              mode="outlined"
              disabled
              value={hora || ""}
              disabledTextColor="white"
              textColor="#fff"
              outlineColor="#fff"
              activeOutlineColor="#fff"
              style={{ marginHorizontal: 10, backgroundColor: "#323232" }}
              theme={{ colors: { onSurfaceVariant: "#fff" } }}
            />
          </TouchableOpacity>

          {showHora && (
            <DateTimePickerModal
              isVisible={showHora}
              mode="time"
              is24Hour={true}
              onConfirm={handleTimeConfirm}
              onCancel={(e) => setHora(false)}
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
                setatributoUsado(option.key);
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <ModalSelector
              style={{ width: "95%" }}
              data={itensDisponiveis}
              initValue="Itens"
              initValueTextStyle={{ color: "white" }} // 'placeholder'
              optionTextStyle={{ color: "black" }} // item nao selecionado na lista
              selectedItemTextStyle={{ color: "green" }} // item selecionado na lista
              selectTextStyle={{ color: "white" }} // texto do input
              selectStyle={{ borderWidth: 1, borderColor: "white" }} // borda do input
              onChange={(option) => {
                setRecompensaItem(option.key);
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <ModalSelector
              style={{ width: "95%" }}
              data={magiasDisponiveis}
              initValue="Magias"
              initValueTextStyle={{ color: "white" }} // 'placeholder'
              optionTextStyle={{ color: "black" }} // item nao selecionado na lista
              selectedItemTextStyle={{ color: "green" }} // item selecionado na lista
              selectTextStyle={{ color: "white" }} // texto do input
              selectStyle={{ borderWidth: 1, borderColor: "white" }} // borda do input
              onChange={(option) => {
                setRecompensaMagia(option.key);
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
