import React, { useState } from 'react';
import { Text , View, StyleSheet, SafeAreaView, ScrollView, Button, TouchableOpacity } from 'react-native';
import { TextInput, FAB } from 'react-native-paper';
import { addTarefa } from '../../Database/tarefasDatabase';
import DateTimePicker from '@react-native-community/datetimepicker';
import Tarefa from '../../class/tarefa';

export default function AdicionaTarefa() {

    // const [tarefa, setTarefa] = useState({});
    const [showData, setShowData] = useState(false);
    const [showHora, setShowHora] = useState(false);

    const [XP, setXP] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState(new Date());
    const [hora, setHora] = useState(new Date());

    const adicionarTarefa = (e) => {
        e.preventDefault();

        const novaTarefa = new Tarefa(
            1,
            XP,
            titulo,
            descricao,
            data.toLocaleDateString(),
            hora.toLocaleTimeString(),
            'Ativo',
            []
        );
    
        // let str;
        // str = JSON.stringify(novaTarefa);
        // str = JSON.stringify(novaTarefa, null, 4);
        // console.log(str);
    
        addTarefa(novaTarefa);
    };

    const changeData = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShowData(false);
      setData(currentDate);
    };

    const changeHora = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShowHora(false);
      setHora(currentDate);
    };

  return (
    <SafeAreaView>
        <ScrollView>
            <View>
                <TextInput
                    label="XP"
                    mode="outlined"
                    keyboardType='numeric'
                    value={XP || ''}
                    onChangeText={(e)=>{setXP(e)}}
                    textColor='#fff'
                    outlineColor='#fff'
                    activeOutlineColor='#fff'
                    style={{ marginHorizontal: 10, backgroundColor:"#323232" }}
                    theme={{ colors: { onSurfaceVariant: '#fff'} }}
                />
                <TextInput
                    label="Titulo"
                    mode="outlined"
                    value={titulo || ''}
                    onChangeText={(e)=>{setTitulo(e)}}
                    textColor='#fff'
                    outlineColor='#fff'
                    activeOutlineColor='#fff'
                    style={{ marginHorizontal: 10, backgroundColor:"#323232" }}
                    theme={{ colors: { onSurfaceVariant: '#fff'} }}
                />
                <TextInput
                    label="Descrição"
                    mode="outlined"
                    value={descricao || ''}
                    onChangeText={(e)=>{setDescricao(e)}}
                    textColor='#fff'
                    outlineColor='#fff'
                    activeOutlineColor='#fff'
                    style={{ marginHorizontal: 10, backgroundColor:"#323232" }}
                    theme={{ colors: { onSurfaceVariant: '#fff'} }}
                />

                <TouchableOpacity onPress={()=>setShowData(true)} >
                  <TextInput
                      label="Data"
                      mode="outlined"
                      disabled
                      value={data.toLocaleDateString() || ''}
                      disabledTextColor='white'
                      textColor='#fff'
                      outlineColor='#fff'
                      activeOutlineColor='#fff'
                      style={{ marginHorizontal: 10, backgroundColor:"#323232" }}
                      theme={{ colors: { onSurfaceVariant: '#fff'} }}
                  />
                </TouchableOpacity>
                  { showData && <DateTimePicker
                    testID="dateTimePicker"
                    value={data}
                    mode='date'
                    onChange={changeData}
                  />}
                  <TouchableOpacity onPress={()=>setShowHora(true)} >
                    <TextInput
                        label="Hora"
                        mode="outlined"
                        disabled
                        value={hora.toLocaleTimeString() || ''}
                        disabledTextColor='white'
                        textColor='#fff'
                        outlineColor='#fff'
                        activeOutlineColor='#fff'
                        style={{ marginHorizontal: 10, backgroundColor:"#323232" }}
                        theme={{ colors: { onSurfaceVariant: '#fff'} }}
                    />
                  </TouchableOpacity>
                  { showHora && <DateTimePicker
                    testID="dateTimePicker"
                    value={hora}
                    mode='time'
                    is24Hour={true}
                    onChange={changeHora}
                  />}
                <FAB 
                  style={{backgroundColor:'green'}} 
                  onPress={(e) => {adicionarTarefa(e)}} 
                />
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}
