import React, { useEffect, useState } from 'react';
import { Text , View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { initDB } from '../../Database/sqsliteDatabase';
import { getTarefas, delTarefa } from '../../Database/tarefasDatabase';
import Tarefa from '../../class/tarefa';

export default function ListaTarefas({navigation}) {

  const [db, setDb] = useState(SQLite.openDatabase('agenda.db'));
  const [loading, setLoading] = useState(true);
  const [tarefas, setTarefas] = useState([]);

  const handleTarefas = (tarefas) => {
    setTarefas(tarefas);
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
      <SafeAreaView>
        <ScrollView>
          <View style={style.lista}>

              <TouchableOpacity
                style={style.card}
                onPress={(e)=>navigation.navigate('AddTarefa')}
              >
                <Text style={style.cardTitle}> Adicionar Tarefa </Text>
              </TouchableOpacity>

              {tarefas.map((tarefa, index) => (
                <TouchableOpacity 
                style={style.card}
                  key={index}
                  onPress={(e)=>navigation.navigate({
                    name:'ViewTarefa',
                    params: {
                      title: tarefa.titulo,
                      id: tarefa.id
                    }
                    })} 
                >
                  <View style={style.cardInfos}>
                    <View style={style.cardInfo}>
                      <Text style={style.cardText}>{tarefa.hora}</Text>
                    </View>
                    <View style={style.cardInfo}>
                      <Text style={style.cardTitle}>{tarefa.titulo}</Text>
                    </View>
                  </View>

                  <View style={style.cardData}>
                    <Text style={style.cardText}>{tarefa.data}</Text>
                  </View>
                </TouchableOpacity>
              ))}

          </View>
        </ScrollView>
      </SafeAreaView>
    ) 
  )
}

const style = StyleSheet.create({
  lista: {
    flexDirection: 'column',
    gap: 10,
    padding: 15,
  },
  card: {
    height: 100,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#323232',
    justifyContent: 'space-between',
  },
  cardInfos: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardData: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 5,
  },
  cardTitle: {
    color: 'white',
    fontSize: 20,
  },
  cardText: {
    color: 'white',
    fontSize: 14,
  }
});