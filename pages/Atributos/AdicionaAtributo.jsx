import React, { useState } from 'react';
import { Text , View, StyleSheet, SafeAreaView, ScrollView, Button, TouchableOpacity } from 'react-native';
import { TextInput, FAB } from 'react-native-paper';
import { addAtributo } from '../../Database/atributosDatabase';
import Atributo from '../../class/atributo';

export default function AdicionaAtributo() {

  const [nome, setNome] = useState('');
  const [nivel, setNivel] = useState('');
  const [XP, setXP] = useState('');

  const adicionarAtributo = (e) => {
    e.preventDefault();

    const novoAtributo = new Atributo(
        1,
        nome,
        nivel,
        XP
    );

    // let str;
    // str = JSON.stringify(novoAtributo);
    // str = JSON.stringify(novoAtributo, null, 4);
    // console.log(str);

    addAtributo(novoAtributo);
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
                    label="Nivel"
                    mode="outlined"
                    keyboardType='numeric'
                    value={nivel || ''}
                    onChangeText={(e)=>{setNivel(e)}}
                    textColor='#fff'
                    outlineColor='#fff'
                    activeOutlineColor='#fff'
                    style={{ marginHorizontal: 10, backgroundColor:"#323232" }}
                    theme={{ colors: { onSurfaceVariant: '#fff'} }}
                />
                <TextInput
                    label="Nome"
                    mode="outlined"
                    value={nome || ''}
                    onChangeText={(e)=>{setNome(e)}}
                    textColor='#fff'
                    outlineColor='#fff'
                    activeOutlineColor='#fff'
                    style={{ marginHorizontal: 10, backgroundColor:"#323232" }}
                    theme={{ colors: { onSurfaceVariant: '#fff'} }}
                />
                <FAB 
                  style={{backgroundColor:'green'}} 
                  onPress={(e) => {adicionarAtributo(e)}} 
                />
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}