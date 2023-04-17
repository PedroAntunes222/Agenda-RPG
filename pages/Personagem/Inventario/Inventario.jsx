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
import { getItens, addItem } from "../../../Database/ItemDatabase";
import Item from "../../../class/item";
import { getMagias, addMagia } from "../../../Database/magiaDatabase";
import Magia from "../../../class/magia";

export default function Inventario({navigation}) {
  const [db, setDb] = useState(SQLite.openDatabase("agenda.db"));
  const [itens, setItens] = useState([]);
  const [magias, setMagias] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleItens = (atributos) => {
    setItens(atributos);
  };

  const handleMagias = (atributos) => {
    setMagias(atributos);
  };

  useEffect(() => {
    getItens(handleItens);
    getMagias(handleMagias);
  }, [db]);
  
  useEffect(() => {
    // atualiza lista ao voltar
    navigation.addListener("focus", () => {
        getItens(handleItens);
        getMagias(handleMagias);
    });
  }, [navigation]);

  useEffect(() => {
    setLoading(false);
    // console.log(itens);
  }, [itens]);

  const adicionaItem = () => {
    let novoItem = new Item(
        1,
        'espada',
        'uma espada',
        'raro',
        'arma',
        ''
    );
    addItem(novoItem);
  };

  const adicionaMagia = () => {
    let novaMagia = new Magia(
        1,
        'magia',
        'uma magia',
        'evocação'
    );
    addMagia(novaMagia);
  };

  return loading ? (
    <Text>Loading</Text>
  ) : (
    <View>
      {itens.map((item, index) => (
        <View key={index}>
            <Text>{item.nome}</Text>
            <Text>{item.descricao}</Text>
            <Text>{item.raridade}</Text>
            <Text>{item.tipo}</Text>
        </View>
      ))}

      <Button onPress={() => adicionaItem()} title="addItem"/>
      
      {magias.map((magia, index) => (
        <View key={index}>
            <Text>{magia.nome}</Text>
            <Text>{magia.descricao}</Text>
            <Text>{magia.tipo}</Text>
        </View>
      ))}

      <Button onPress={() => adicionaMagia()} title="addMagia"/>
    </View>
  );
}
