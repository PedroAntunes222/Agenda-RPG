import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function LoadingIcon() {
  return (
    <View style={style.loading}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}

const style = StyleSheet.create({
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "#1E1E1E",
  },
});