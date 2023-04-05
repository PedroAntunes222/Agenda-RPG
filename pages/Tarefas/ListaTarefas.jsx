import React, { useEffect, useState } from 'react';
import { Text , View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { initDB } from '../../Database/sqsliteDatabase';
import { getTarefas } from '../../Database/tarefasDatabase';
import Tarefa from '../../class/tarefa';

export default function ListaTarefas({navigation}) {

  const [db, setDb] = useState(SQLite.openDatabase('agenda.db'));
  const [loading, setLoading] = useState(true);
  const [tarefas, setTarefas] = useState([]);

  const handleTarefas = (tarefas) => {
    setTarefas(tarefas);
    console.log('tarefas');
    console.log(tarefas);
  }

  useEffect(() => {
    initDB();
    getTarefas(handleTarefas);
  }, [db]);

  useEffect(() => { // atualiza lista ao voltar
    navigation.addListener('focus', () => {
      getTarefas(handleTarefas);
    });
  }, [navigation]);

  useEffect(()=> {
    setLoading(false);
    // console.log(tarefas);
  }, [tarefas]);

  return (
    loading ? (<Text>Loading</Text>) : (
      <View>
        <View>
          <TouchableOpacity onPress={(e)=>navigation.navigate('Add')}>
            <Text>
              Adicionar Tarefa
            </Text>
          </TouchableOpacity>
        </View>
          {tarefas.map((tarefa, index) => (
            <TouchableOpacity 
              key={index} 
              style={style.card}
              onPress={(e)=>navigation.navigate({
                name:'View',
                params: {
                  title: tarefa.titulo,
                  id: tarefa.id
                }
                })} 
            >
              <View>
                <Text>{tarefa.titulo}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    ) 
  )
}

const style = StyleSheet.create({
  card: {
    backgroundColor: 'red'
  }
});