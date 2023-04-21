import React, { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../../../context/loading";
import { Text, View, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { completaTarefa } from "../../../../Database/tarefasDatabase";
import {
  uparAtributo,
  getAtributo,
} from "../../../../Database/atributosDatabase";
import Tarefa from "../../../../class/tarefa";
import Atributo from "../../../../class/atributo";
import moment from "moment";
import "moment-timezone";

export default function BotaoCompletar({
  id,
  data,
  repeticao,
  atributoID,
  atributo,
}) {
  const completar = async () => {
    // await getAtributo(atributoID, (atributo) => {
    //   setAtributo(atributo);
    // });

    let status = "";
    let proximaData = "";
    let xpGanho = 0;
    const dataAtual = moment().tz("America/Sao_Paulo").format("DD/MM/YYYY");
    const dataTarefa = moment(data, "DD/MM/YYYY").format("DD/MM/YYYY");

    // se a data atual já tiver passado da data da tarefa
    if (dataAtual > dataTarefa) {
      status = "atrasada";
      xpGanho = 0;
      proximaData = "days";
      console.log("tarefa atrasada");
    } else {
      // cada completagem vem com status, xp e a proxima data
      if (repeticao === "diario") {
        status = "espera";
        xpGanho = 1;
        proximaData = "days";
        console.log("tarefa diaria completa");
      } else if (repeticao === "semanal") {
        status = "espera";
        xpGanho = 2;
        proximaData = "week";
        console.log("tarefa semanal completa");
      } else if (repeticao === "mensal") {
        status = "espera";
        xpGanho = 5;
        proximaData = "month";
        console.log("tarefa mensal completa");
      } else if (repeticao === "anual") {
        status = "espera";
        xpGanho = 10;
        proximaData = "year";
        console.log("tarefa anual completa");
      } else {
        status = "completa";
        xpGanho = 3;
        proximaData = "days";
        console.log("tarefa unica completa");
      }
    }

    const NivelAtual = atributo[0].nivel;
    const XpAtual = atributo[0].xp;

    let novoNivel = NivelAtual;

    const somaXp = XpAtual + xpGanho;

    if (somaXp >= 10) {
      xpGanho = somaXp - 10;
      novoNivel++;
    } else {
      xpGanho = somaXp;
    }

    const upAtributo = new Atributo(atributoID, "", "", novoNivel, xpGanho);

    uparAtributo(upAtributo);

    const novaData = moment()
      .tz("America/Sao_Paulo")
      .add(1, proximaData)
      .format("DD/MM/YYYY");

    const proximaTarefa = new Tarefa(
      id,
      0,
      "titulo",
      "descricao",
      "repeticao",
      novaData,
      "hora",
      status,
      "atributo",
      [],
      []
    );

    // console.log(proximaTarefa)
    completaTarefa(proximaTarefa);
  };

  return (
    <FAB
      style={{ backgroundColor: "green" }}
      onPress={(e) => {
        completar();
      }}
    />
  );
}
