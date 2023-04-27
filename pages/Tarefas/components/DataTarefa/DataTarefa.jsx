import React from "react";
import { Text, View, StyleSheet } from "react-native";
import moment from "moment";
import "moment-timezone";

const momentFormater = (dataHora, formato) => {
  const dataFormatada = moment(dataHora, formato).format(formato);
  return dataFormatada;
};

export default function DataTarefa({ data, hora }) {
  let colorData;

  const dataRecebidaFormat = momentFormater(data, "DD/MM/YYYY");

  const dataAtualFormat = momentFormater(
    moment().tz("America/Sao_Paulo"),
    "DD/MM/YYYY"
  );

  const horaRecebidaFormat = momentFormater(hora, "HH:mm");

  const horaAtualFormat = momentFormater(
    moment().tz("America/Sao_Paulo"),
    "HH:mm"
  );

  if (dataAtualFormat === dataRecebidaFormat) {
    // console.log("o dia é hoje");
    colorData = "green";

    if (horaAtualFormat > horaRecebidaFormat) {
      // console.log("a hora ja passou");
      colorData = "orange";
    }
  } else if (dataAtualFormat < dataRecebidaFormat) {
    // console.log("o dia ainda n chegou");
    colorData = "#134896";
  } else {
    // console.log("o dia já passou");
    colorData = "#990e1f";
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

  const dataRecebida = moment(data, "DD/MM/YYYY");
  const dia = momentFormater(dataRecebida, "DD");
  const mes = momentFormater(dataRecebida, "MM");
  const mesExtenso = meses[mes - 1].slice(0, 3);

  return (
    <View style={style.cardData}>
      <Text style={{ color: colorData, fontSize: 24 }}>{dia}</Text>
      <Text style={{ color: colorData, fontSize: 20 }}>{mesExtenso}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  cardData: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 5,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});
