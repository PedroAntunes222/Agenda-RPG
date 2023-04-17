import React, { useState } from "react";
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
import { TextInput, FAB } from "react-native-paper";
import { addAtributo } from "../../../Database/atributosDatabase";
import ColorPicker from "react-native-wheel-color-picker";
import Atributo from "../../../class/atributo";

export default function AdicionaAtributo() {

  const [loading, setLoading] = useState(true);
  
  const [nome, setNome] = useState("");
  const [cor, setCor] = useState("");
  const [nivel, setNivel] = useState("");
  const [XP, setXP] = useState("");

  const onColorChange = (color) => {
    setCor(color);
    console.log(color);
  };

  const adicionarAtributo = (e) => {
    e.preventDefault();

    const novoAtributo = new Atributo(1, cor, nome, nivel, XP);

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
            keyboardType="numeric"
            value={XP || ""}
            onChangeText={(e) => {
              setXP(e);
            }}
            textColor="#fff"
            outlineColor="#fff"
            activeOutlineColor="#fff"
            style={{ marginHorizontal: 10, backgroundColor: "#323232" }}
            theme={{ colors: { onSurfaceVariant: "#fff" } }}
          />
          <TextInput
            label="Nivel"
            mode="outlined"
            keyboardType="numeric"
            value={nivel || ""}
            onChangeText={(e) => {
              setNivel(e);
            }}
            textColor="#fff"
            outlineColor="#fff"
            activeOutlineColor="#fff"
            style={{ marginHorizontal: 10, backgroundColor: "#323232" }}
            theme={{ colors: { onSurfaceVariant: "#fff" } }}
          />
          <TextInput
            label="Nome"
            mode="outlined"
            value={nome || ""}
            onChangeText={(e) => {
              setNome(e);
            }}
            textColor="#fff"
            outlineColor="#fff"
            activeOutlineColor="#fff"
            style={{ marginHorizontal: 10, backgroundColor: "#323232" }}
            theme={{ colors: { onSurfaceVariant: "#fff" } }}
          />
          <View style={[]}>
            <ColorPicker
              color={cor}
              onColorChangeComplete={onColorChange}
              swatches={false}
            />
          </View>
          <FAB
            style={{ backgroundColor: "green" }}
            onPress={(e) => {
              adicionarAtributo(e);
            }}
          />
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
    flexDirection: "row",
    backgroundColor: "#323232",
    justifyContent: "space-between",
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
