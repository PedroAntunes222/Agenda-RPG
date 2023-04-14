import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("agenda.db");

export const addItem = (item) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO Itens(nome, descricao, raridade, tipo, equipamento) VALUES (?, ?, ?, ?, ?)",
      [item.nome, item.descricao, item.raridade, item.tipo, item.equipamento],
      (txObj, resultSet) => {
        console.log(resultSet);
      },
      (txObj, error) => console.log(error)
    );
  });
  console.log("add feito");
};

export const getItens = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM Itens",
      null,
      (txObj, resultSet) => callback(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });
};

export const getItem = (id, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM Itens WHERE id=?",
      [id],
      (txObj, resultSet) => callback(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });
};

export const putItem = (item) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE itens SET nome=?, descricao=?, raridade=?, tipo=?, equipamento=? WHERE id=?",
      [item.nome, item.descricao, item.raridade, item.tipo, item.equipamento],
      (txObj, resultSet) => {
        console.log(resultSet);
      },
      (txObj, error) => console.log(error)
    );
  });
};

export const delItem = (id) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM Itens WHERE id=?",
      [id],
      (txObj, resultSet) => {
        console.log(resultSet);
      },
      (txObj, error) => console.log(error)
    );
  });
};
