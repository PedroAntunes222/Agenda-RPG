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
import { getAtributo } from "../../../Database/atributosDatabase";
import Atributo from "../../../class/atributo";

export default function ViewAtributo({ navigation, route }) {
  const [db, setDb] = useState(SQLite.openDatabase("agenda.db"));
  const { loading, setLoading } = useContext(LoadingContext);
  
  const [atributo, setAtributo] = useState();

  const handleAtributo = async () => {
    await getAtributo(route.params.id, (atributo) => {
      setAtributo(atributo);
    });
  };

  useEffect(() => {
    handleAtributo();
    setLoading(false);
  }, [db]);

  return (
    atributo!==undefined && (
      <View>
        <Text>{atributo[0].nome}</Text>
        <Text>{atributo[0].nivel}</Text>
        <Text>{atributo[0].xp}</Text>
      </View>
    )
  );
}
