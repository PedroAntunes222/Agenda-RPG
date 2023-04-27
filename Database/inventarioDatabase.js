import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("agenda.db");

export const addInventario = (itemId, quantidade) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO Inventario(item_id, quantidade) VALUES (?, ?)",
      [itemId, quantidade],
      (txObj, resultSet) => {
        console.log(resultSet);
      },
      (txObj, error) => console.log(error)
    );
  });
  console.log("add feito");
};

export const getInventario = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM Inventario
      LEFT JOIN Itens ON Inventario.item_id = Itens.id
      `,
      null,
      (txObj, resultSet) => callback(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });
};

export const putInventario = (itemId, quantidade) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE Inventario SET quantidade=?, WHERE id=?",
      [quantidade, itemId],
      (txObj, resultSet) => {
        console.log(resultSet);
      },
      (txObj, error) => console.log(error)
    );
  });
};

export const delInventario = (id) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM Inventario WHERE id=?",
      [id],
      (txObj, resultSet) => {
        console.log(resultSet);
      },
      (txObj, error) => console.log(error)
    );
  });
};

export const getEquipamento = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM Equipamento",
      null,
      (txObj, resultSet) => callback(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });
};

export const putEquipamento = (itemID, parte) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE Equipamento SET item_id=? WHERE parte=?",
      [itemID, parte],
      (txObj, resultSet) => {
        console.log(resultSet);
      },
      (txObj, error) => console.log(error)
    );
  });
};
