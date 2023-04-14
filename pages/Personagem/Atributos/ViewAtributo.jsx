import React, { useEffect, useState } from 'react';
import { Text , View, StyleSheet, SafeAreaView, ScrollView, Button, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { getAtributo } from '../../../Database/atributosDatabase';
import Atributo from '../../../class/atributo';

export default function ViewAtributo({navigation, route}) {

  const [db, setDb] = useState(SQLite.openDatabase('agenda.db'));
  const [loading, setLoading] = useState(true);
  const [atributoLoading, setAtributoLoading] = useState(false);
  const [atributo, setAtributo] = useState();

  const handleAtributo = () => {
    getAtributo(route.params.id, (atributo) => {
      setAtributo(atributo);
      // console.log(atributo);
      setLoading(false);
    });
  }

  useEffect(() => {
    handleAtributo();
  }, [db]);

  return (
    loading ? (<Text>Loading</Text>) :
    (
      <View>
        <Text>{atributo[0].nome}</Text>
        <Text>{atributo[0].nivel}</Text>
        <Text>{atributo[0].xp}</Text>
      </View>
    )
  )
}
