import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import moment from "moment";

export default function DataTarefa({ data, hora }) {
  let colorData;

  const dataRecebida = moment(data, "DD/MM/YYYY");
  const dataRecebidaFormat = dataRecebida.format("DD/MM/YYYY");
  // console.log(dataRecebidaFormat);

  const dataAtual = moment();
  const dataAtualFormat = dataAtual.format("DD/MM/YYYY");
  // console.log(dataAtualFormat);

  const horaAtual = moment();
  const horaAtualFormat = horaAtual.format("HH:mm");
  // console.log(horaAtualFormat);

  const horaRecebida = moment(hora, "HH:mm");
  const horaRecebidaFormat = horaRecebida.format("HH:mm");
  // console.log(horaRecebidaFormat);

  if (dataAtualFormat < dataRecebidaFormat) {
    // console.log("o dia ainda n chegou");
    colorData = "blue";
  }
  if (dataAtualFormat > dataRecebidaFormat) {
    // console.log("o dia já passou");
    colorData = "#990e1f";
  }

  if (dataAtualFormat === dataRecebidaFormat) {
    // console.log("o dia é hoje");
    colorData = "green";

    if (horaAtualFormat > horaRecebidaFormat) {
      // console.log("a hora ja passou");
      colorData = "#990e1f";
    }
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

  const dia = dataRecebida.format('DD');
  const mes = dataRecebida.format('MM');
  const mesExtenso = meses[mes-1].slice(0, 3);
  console.log(dia)

  return (
    <View style={[style.cardData, { backgroundColor: colorData }]}>
      <Text style={{ color: "white", fontSize: 24 }}>{dia}</Text>
      <Text style={{ color: "white", fontSize: 20 }}>{mesExtenso}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  cardData: {
    // backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 5,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});
