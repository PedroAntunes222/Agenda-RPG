import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("agenda.db");

export const addGrimorio = (MagiaId, quantidade) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO Grimorio(Magia_id) VALUES (?)",
      [MagiaId, quantidade],
      (txObj, resultSet) => {
        console.log(resultSet);
      },
      (txObj, error) => console.log(error)
    );
  });
  console.log("add feito");
};

export const getGrimorio = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM Grimorio
      LEFT JOIN Magias ON Grimorio.Magia_id = Magias.id
      `,
      null,
      (txObj, resultSet) => callback(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });
};

// export const putGrimorio = (MagiaId, quantidade) => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       "UPDATE Grimorio SET quantidade=?, WHERE id=?",
//       [quantidade, MagiaId],
//       (txObj, resultSet) => {
//         console.log(resultSet);
//       },
//       (txObj, error) => console.log(error)
//     );
//   });
// };

export const delGrimorio = (id) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM Grimorio WHERE id=?",
      [id],
      (txObj, resultSet) => {
        console.log(resultSet);
      },
      (txObj, error) => console.log(error)
    );
  });
};
