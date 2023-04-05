import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('agenda.db');
import Tarefa from "../class/tarefa";

export const addTarefa = (tarefa) => {
    db.transaction(tx => {
            tx.executeSql('INSERT INTO Tarefas(xp, titulo, descricao, data, hora, status) VALUES (?, ?, ?, ?, ?, ?)', [tarefa.xp, tarefa.titulo, tarefa.descricao, tarefa.data, tarefa.hora, tarefa.status],
        (txObj, resultSet) => {
          console.log(resultSet);
        },
        (txObj, error) => console.log(error)
      );
    })
    console.log('add feito');
  }

  export const getTarefas = (callback) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Tarefas', null,
        (txObj, resultSet) => callback(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  };
  
  export const getTarefa = (id, callback) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Tarefas WHERE id=?', [id],
        (txObj, resultSet) => callback(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  };
  
  export const putTarefa = (tarefa) => {
    db.transaction(tx => {
      tx.executeSql('UPDATE Tarefas SET xp=?, titulo=?, descricao=?, data=?, hora=?, status=? WHERE id=?', [tarefa.xp, tarefa.titulo, tarefa.descricao, tarefa.data, tarefa.hora, tarefa.status],
        (txObj, resultSet) => {
          console.log(resultSet)
        },
        (txObj, error) => console.log(error)
      );
    });
  };
  
  export const delTarefa = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM Tarefas WHERE id=?', [id],
        (txObj, resultSet) => {
          console.log(resultSet)
        },
        (txObj, error) => console.log(error)
      );
    });
  };