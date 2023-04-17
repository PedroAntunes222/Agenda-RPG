import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("agenda.db");

export const addMagia = (magia) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO Magias(nome, descricao, tipo) VALUES (?, ?, ?)",
      [magia.nome, magia.descricao, magia.tipo],
      (txObj, resultSet) => {
        console.log(resultSet);
      },
      (txObj, error) => console.log(error)
    );
  });
  console.log("add feito");
};

export const getMagias = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM Magias",
      null,
      (txObj, resultSet) => callback(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });
};

export const getMagia = (id, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM Magias WHERE id=?",
      [id],
      (txObj, resultSet) => callback(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });
};

export const putMagia = (magia) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE Magias SET nome=?, descricao=?, tipo=? WHERE id=?",
      [magia.nome, magia.descricao, magia.tipo],
      (txObj, resultSet) => {
        console.log(resultSet);
      },
      (txObj, error) => console.log(error)
    );
  });
};

export const delMagia = (id) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM Magias WHERE id=?",
      [id],
      (txObj, resultSet) => {
        console.log(resultSet);
      },
      (txObj, error) => console.log(error)
    );
  });
};
