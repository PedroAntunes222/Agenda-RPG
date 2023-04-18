import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

export default function DataTarefa({ data, hora }) {
  
    let colorData;

    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);

    const dataRecebida = data;
    const dataRepartida = dataRecebida.split("/");
    const dataFinal = new Date(
      `${dataRepartida[2]}-${dataRepartida[1]}-${dataRepartida[0]}`
    );

    // const horaAtual = new Date();
 
    // const horaRecebida = hora;
    // const horaRepartida = horaRecebida.split(":");
    // const horaFinal = new Date(horaAtual.getFullYear(), horaAtual.getMonth(), horaAtual.getDate(), horaRepartida[0], horaRepartida[1], 0, 0);

    if (dataAtual < dataFinal) {
      // console.log("o dia ainda n chegou");
      colorData = 'blue';
    }
    if (dataAtual >= dataFinal) {
      // console.log("o dia é hoje");
      colorData = 'green';
      // if (horaAtual > horaFinal) {
      //   // console.log("a hora ja passou");
      //   colorData = '#990e1f';
      // }
    }
    if (dataAtual > dataFinal) {
      // console.log("o dia já passou");
      colorData = 'green';
    }

    const meses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    let dataSeparada = dataRecebida.split("/");
    let dia = dataSeparada[0];
    let mes = dataSeparada[1];
    let mesExtenso = meses[mes - 1].slice(0, 3);

    return (
      <View style={[style.cardData, {backgroundColor: colorData}]}>
        <Text style={{ color: "white", fontSize: 24 }}>{dia}</Text>
        <Text style={{ color: "white", fontSize: 20 }}>{mesExtenso}</Text>
      </View>
    );
}

const style = StyleSheet.create({
  lista: {
    flexDirection: "column",
    gap: 10,
    padding: 15,
  },
  card: {
    height: 100,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#323232",
    justifyContent: "space-between",
  },
  cardInfos: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardInfo: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardAtributo: {
    width: 20,
    height: 20,
    borderRadius: 100,
  },
  cardData: {
    // backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 5,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});
