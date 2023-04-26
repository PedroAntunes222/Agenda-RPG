import React, { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../context/loading";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { getItem } from "../../Database/ItemDatabase";

export default function ViewItem({ route }) {
  const [db, setDb] = useState(SQLite.openDatabase("agenda.db"));
  const { loading, setLoading } = useContext(LoadingContext);
  const [item, setItem] = useState();

  useEffect(() => {
    getItem(route.params.id, (item) => {
      setItem(item);
    });
    setLoading(false);
  }, [db]);

  return (
    item !== undefined && (
      <SafeAreaView>
        <ScrollView>
          <View>
            <Text>{item[0].nome}</Text>
            <Text>{item[0].descricao}</Text>
            <Text>{item[0].quantidade}</Text>
            <Text>{item[0].equipamento}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  );
}
