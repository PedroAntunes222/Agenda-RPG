import React, { useEffect, useState } from 'react';
import { Text , View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { getTarefa } from '../../Database/tarefasDatabase';
import Tarefa from '../../class/tarefa';

export default function ViewTarefa({navigation, route}) {

    const [db, setDb] = useState(SQLite.openDatabase('agenda.db'));
    const [loading, setLoading] = useState(true);
    const [tarefaLoading, setTarefaLoading] = useState(false);
    const [tarefa, setTarefa] = useState();

    const handleTarefa = () => {
        getTarefa(route.params.id, (tarefa) => {
          setTarefa(tarefa);
          console.log(tarefa);
          setLoading(false);
        });
      }
  
    useEffect(() => {
      handleTarefa();
    }, [db]);

  return (
    loading ? (
      <Text>Loading</Text>
    )
    :(
      <View>

        <Text>{tarefa[0].descricao}</Text>

        <View style={style.infosTarefa}>

          <View style={style.infoBloco}>
            <Text style={style.text}>Data</Text>
            <Text style={style.text}>{tarefa[0].data}</Text>
          </View>

          <View style={style.infoBloco}>
            <Text style={style.text}>Hora</Text>
            <Text style={style.text}>{tarefa[0].hora}</Text>
          </View>

          <View style={style.infoBloco}>
            <Text style={style.text}>Atributo</Text>
            <Text style={style.text}>{tarefa[0].nome_atributo}</Text>
          </View>
          
        </View>

      </View>
    )
  )
}

const style = StyleSheet.create({
  infosTarefa: {
    width: '100%',
    marginHorizontal: 'auto',
    flexDirection: 'column',
    gap: 10,
    padding: 30,
  },
  infoBloco: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});