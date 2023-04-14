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

export default function Inventario({navigation}) {
  const [db, setDb] = useState(SQLite.openDatabase("agenda.db"));
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAtributos = (atributos) => {
    setItens(atributos);
  };

  useEffect(() => {
    getItens(handleAtributos);
  }, [db]);
  
  useEffect(() => {
    // atualiza lista ao voltar
    navigation.addListener("focus", () => {
        getItens(handleAtributos);
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
    </View>
  );
}
