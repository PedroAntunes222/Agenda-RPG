import React, { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../../context/loading";
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
import { getMagias, addMagia } from "../../../Database/magiaDatabase";
import { getGrimorio } from "../../../Database/grimorioDatabase";
import Magia from "../../../class/magia";

export default function Grimorio({ navigation }) {
  const [db, setDb] = useState(SQLite.openDatabase("agenda.db"));
  const { loading, setLoading } = useContext(LoadingContext);

  const [magias, setMagias] = useState([]);
  const [grimorio, setGrimorio] = useState([]);

  useEffect(() => {
    getMagias(setMagias);
    getGrimorio(setGrimorio);
    setLoading(false);
  }, [db]);

  useEffect(() => {
    // atualiza lista ao voltar
    navigation.addListener("focus", () => {
      getMagias(setMagias);
      getGrimorio(setGrimorio);
      setLoading(false);
    });
  }, [navigation]);

  const adicionaMagia = () => {
    let novaMagia = new Magia(1, "magia", "uma magia", "evocação");
    addMagia(novaMagia);
  };

  return (
    grimorio !== undefined && (
      <View>
        {grimorio.map((magia, index) => (
          <View key={index}>
            <Text>{magia.nome}</Text>
            <Text>{magia.descricao}</Text>
            <Text>{magia.tipo}</Text>
          </View>
        ))}

        <Button onPress={() => adicionaMagia()} title="addMagia" />
      </View>
    )
  );
}
