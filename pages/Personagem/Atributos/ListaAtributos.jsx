import React, { useEffect, useState, useContext } from "react";
import { LoadingContext } from "../../../context/loading";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { getAtributos, delAtributo } from "../../../Database/atributosDatabase";

export default function ListaAtributos({ navigation }) {
  const [db, setDb] = useState(SQLite.openDatabase("agenda.db"));
  const {loading, setLoading} = useContext(LoadingContext);

  const [atributos, setAtributos] = useState([]);

  const handleAtributos = (atributos) => {
    setAtributos(atributos);
  };

  useEffect(() => {
    getAtributos(handleAtributos);
  }, [db]);

  useEffect(() => {
    // atualiza lista ao voltar
    navigation.addListener("focus", () => {
    setLoading(true);
    getAtributos(handleAtributos);
    });
  }, [navigation]);

  useEffect(() => {
    setLoading(false);
    // console.log(atributos);
  }, [atributos]);

  const ProgressCounter = ({color, progress}) => {
    let calc = progress * 10;
    return (
      <View
        style={[
          style.progressXP,
          {
            backgroundColor: color,
            width: `${calc}%`,
          },
        ]}
      />
    )
  };

  const windowHeight = Dimensions.get('window').height;

  return loading ? (
    <Text>Loading</Text>
  ) : (
    <SafeAreaView style={{backgroundColor:'#1E1E1E', height:windowHeight}}>
      <ScrollView>
        <View style={style.lista}>
          <TouchableOpacity
            style={style.card}
            onPress={(e) => navigation.navigate("AddAtributo")}
          >
            <Text style={style.cardTitle}> Adicionar Atributo </Text>
          </TouchableOpacity>

          {atributos.map((atributo, index) => (
            <TouchableOpacity
              key={index}
              onPress={(e) =>{
                navigation.navigate({
                  name: "ViewAtributo",
                  params: {
                    title: atributo.nome,
                    id: atributo.id,
                  },
                })
                setLoading(true)
              }
              }
            >
              <View style={style.cardInfos}>
                <View style={style.cardHeader}>
                  <View style={style.cardAtributo}>
                    <Text style={{color: 'white', fontSize: 20}}>{atributo.nome}</Text>
                  </View>

                  <View style={style.cardNivel}>
                    <Text style={{color: 'white', fontSize: 26}}>{atributo.nivel}</Text>
                  </View>
                </View>

                <View style={style.cardXP}>
                  <ProgressCounter
                    color={atributo.cor}
                    progress={atributo.xp}
                  />
                  <Text style={{color: 'white', fontSize: 28}}>{atributo.xp} / 10</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  lista: {
    flexDirection: "column",
    gap: 10,
    padding: 15,
  },
  card: {
    height: 120,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#323232',
    justifyContent: 'space-between',
    alignItems: "center",
    justifyContent: "center",
  },
  cardInfos: {
    flexDirection: "column",
    justifyContent: "space-between",
    flexDirection: "column",
    gap: 8,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
  cardAtributo: {
    backgroundColor: "#323232",
    borderRadius: 10,
    width: "80%",
    padding: 10,
  },
  cardNivel: {
    backgroundColor: "#323232",
    borderRadius: 10,
    width: "18%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardXP: {
    backgroundColor: "#323232",
    borderRadius: 10,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  progressXP: {
    position: "absolute",
    // backgroundColor: 'green',
    // width: '60%',
    borderRadius: 10,
    left: 0,
    top: 0,
    bottom: 0,
  },
  cardTitle: {
    color: "white",
    fontSize: 20,
  },
  cardText: {
    color: "white",
    fontSize: 14,
  },
});
