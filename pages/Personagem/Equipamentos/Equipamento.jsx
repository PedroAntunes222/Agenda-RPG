import React, { useContext, useEffect, useState } from "react";
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
import { getEquipamento } from "../../../Database/inventarioDatabase";
import { getItens, addItem } from "../../../Database/ItemDatabase";
import Item from "../../../class/item";
import { LoadingContext } from "../../../context/loading";

export default function Equipamento({ navigation }) {
  const [db, setDb] = useState(SQLite.openDatabase("agenda.db"));
  const [itens, setItens] = useState();
  const [equipamento, setEquipamento] = useState();
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    getItens(setItens);
    getEquipamento(setEquipamento);
    setLoading(false);
  }, [db]);

  useEffect(() => {
    // atualiza lista ao voltar
    navigation.addListener("focus", () => {
      getItens(setItens);
      setLoading(false);
    });
  }, [navigation]);

  const adicionaItem = () => {
    let novoItem = new Item(1, "espada", "uma espada", "raro", "arma", "");
    addItem(novoItem);
  };

  return (
    itens !== undefined && (
      <View>
        {itens.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              //funcao para adicionar equipamento

              // setLoading(true);
            }}
          >
            <View>
              <Text>{item.nome}</Text>
              <Text>{item.descricao}</Text>
              <Text>{item.raridade}</Text>
              <Text>{item.tipo}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <Button onPress={() => adicionaItem()} title="addItem" />
      </View>
    )
  );
}
