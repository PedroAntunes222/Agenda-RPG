import React, { useEffect, useState } from 'react';
import { Text , View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { initDB } from '../../Database/sqsliteDatabase';
import { getTarefa } from '../../Database/tarefasDatabase';
import Tarefa from '../../class/tarefa';

export default function ViewTarefa({navigation, route}) {

    const [db, setDb] = useState(SQLite.openDatabase('agenda.db'));
    const [loading, setLoading] = useState(true);
    const [tarefaLoading, setTarefaLoading] = useState(false);
    const [tarefa, setTarefa] = useState();

    const handleTarefa = () => {
        getTarefa(route.params.id, (livro) => {
          setTarefa(livro);
          console.log(livro);
          setLoading(false);
        });
      }
  
    useEffect(() => {
      initDB();
      handleTarefa();
    }, [db]);

  return (
    loading ? (
      <Text>Loading</Text>
    )
    :(
      <>
        <Text>{tarefa[0].titulo}</Text>
        <Text>{tarefa[0].descricao}</Text>
      </>
    )
  )
}
