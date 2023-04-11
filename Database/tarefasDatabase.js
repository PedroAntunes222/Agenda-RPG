import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("agenda.db");

export const addTarefa = (tarefa, idAtributo) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO Tarefas(xp, titulo, descricao, data, hora, status) VALUES (?, ?, ?, ?, ?, ?)",
      [
        tarefa.xp,
        tarefa.titulo,
        tarefa.descricao,
        tarefa.data,
        tarefa.hora,
        tarefa.status,
      ],(_, { insertId }) => {
        const idTarefa = insertId;
        tx.executeSql(
          `INSERT INTO Tarefas_Atributos (id_Tarefa, id_Atributo)
           VALUES (?, ?)`,
          [idTarefa, idAtributo],
          () => {
            console.log('Tarefa e referência inseridas com sucesso');
          },
          (tx, error) => {
            console.log('Erro ao inserir referência:', error);
            return false;
          }
        );
      },
      (txObj, resultSet) => {
        console.log(resultSet);
      },
      (txObj, error) => console.log(error)
    );
  });
  console.log("add feito");
};

export const getTarefas = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM Tarefas",
      null,
      (txObj, resultSet) => callback(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });
};

export const getTarefa = (id, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT Tarefas.*, Atributos.nome AS nome_atributo FROM Tarefas LEFT JOIN Tarefas_Atributos ON Tarefas.id = Tarefas_Atributos.id_Tarefa LEFT JOIN Atributos ON Tarefas_Atributos.id_Atributo = Atributos.id WHERE Tarefas.id=?",
      [id],
      (txObj, resultSet) => callback(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });
};

export const putTarefa = (tarefa) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE Tarefas SET xp=?, titulo=?, descricao=?, data=?, hora=?, status=? WHERE id=?",
      [
        tarefa.xp,
        tarefa.titulo,
        tarefa.descricao,
        tarefa.data,
        tarefa.hora,
        tarefa.status,
      ],
      (txObj, resultSet) => {
        console.log(resultSet);
      },
      (txObj, error) => console.log(error)
    );
  });
};

export const delTarefa = (id) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM Tarefas WHERE id=?",
      [id],
      (txObj, resultSet) => {
        console.log(resultSet);
      },
      (txObj, error) => console.log(error)
    );
  });
};
