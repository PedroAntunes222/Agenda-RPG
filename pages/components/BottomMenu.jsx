import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";

export default function BottomMenu() {
  const navigation = useNavigation();

  return (
    <View style={style.menuList}>
      <TouchableOpacity
        onPress={(e) =>
          navigation.reset({
            index: 0,
            routes: [{ name: "ListaTarefas" }],
          })
        }
      >
        <Text style={style.menuItem}> Quests </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={(e) =>
          navigation.reset({
            index: 0,
            routes: [{ name: "ListaAtributos" }],
          })
        }
      >
        <Text style={style.menuItem}> Personagem </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={(e) => navigation.navigate("ListaAtributos")}>
        <Text style={style.menuItem}> Inventário </Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  menuList: {
    backgroundColor: "#1E1E1E",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  menuItem: {
    color: "white",
    paddingVertical: 15,
  },
});
