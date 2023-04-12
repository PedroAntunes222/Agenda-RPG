// import SQLite from "react-native-sqlite-storage";
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('agenda.db');

export const initDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Tarefas(
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        xp INTEGER,
        titulo TEXT,
        descricao TEXT,
        repeticao TEXT,
        data TEXT,
        hora TEXT,
        status TEXT
      )`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Atributos( 
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
        nome TEXT, 
        cor TEXT,
        nivel INTEGER, 
        xp INTEGER
      )`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Tarefas_Atributos( 
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
        id_Tarefa INTEGER, 
        id_Atributo INTEGER,
        FOREIGN KEY (id_Tarefa) REFERENCES Tarefas(id)
        FOREIGN KEY (id_Atributo) REFERENCES Atributos(id)
      )`
    );
  });
  console.log('banco criado');
};

// export const addTarefa = (tarefa) => {
//   db.transaction(tx => {
//           tx.executeSql('INSERT INTO Tarefas(xp, titulo, descricao, data, hora, status) VALUES (?, ?, ?, ?, ?, ?)', [tarefa.xp, tarefa.titulo, tarefa.descricao, tarefa.data, tarefa.hora, tarefa.status],
//       (txObj, resultSet) => {
//         console.log(resultSet)
//       },
//       (txObj, error) => console.log(error)
//     );
//   })
//   console.log('add feito');
// }