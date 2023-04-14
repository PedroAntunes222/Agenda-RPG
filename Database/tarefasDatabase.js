import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("agenda.db");

export const addTarefa = (tarefa) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO Tarefas(xp, titulo, repeticao, descricao, data, hora, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        tarefa.xp,
        tarefa.titulo,
        tarefa.descricao,
        tarefa.repeticao,
        tarefa.data,
        tarefa.hora,
        tarefa.status,
      ],
      (_, { insertId }) => {
        const idTarefa = insertId;
        tx.executeSql(
          `INSERT INTO Tarefas_Atributos(id_Tarefa, id_Atributo)
           VALUES (?, ?)`,
          [idTarefa, tarefa.atributo],
          () => {
            console.log("Tarefa e referência inseridas com sucesso");
          },
          (tx, error) => {
            console.log("Erro ao inserir referência:", error);
            return false;
          }
        );
        tx.executeSql(
          `INSERT INTO Recompensa_Item(id_Tarefa, id_Item)
           VALUES (?, ?)`,
          [idTarefa, tarefa.item],
          () => {
            console.log("Tarefa e Item inseridos com sucesso");
          },
          (tx, error) => {
            console.log("Erro ao inserir referência:", error);
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
      `SELECT Tarefas.*, Atributos.nome AS atributo_nome, Atributos.cor AS atributo_cor FROM Tarefas 
      LEFT JOIN Tarefas_Atributos ON Tarefas.id = Tarefas_Atributos.id_Tarefa 
      LEFT JOIN Atributos ON Tarefas_Atributos.id_Atributo = Atributos.id`,
      null,
      (txObj, resultSet) => callback(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });
};

export const getTarefa = (id, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT Tarefas.*, 
      Atributos.nome AS atributo_nome, Atributos.cor AS atributo_cor,
      Itens.nome AS item_nome
      FROM Tarefas
      LEFT JOIN Tarefas_Atributos ON Tarefas.id = Tarefas_Atributos.id_Tarefa 
      LEFT JOIN Atributos ON Tarefas_Atributos.id_Atributo = Atributos.id 
      LEFT JOIN Recompensa_Item ON Tarefas.id = Recompensa_Item.id_Tarefa 
      LEFT JOIN Itens ON Recompensa_Item.id_Item = Itens.id
      WHERE Tarefas.id=?`,
      [id],
      (txObj, resultSet) => callback(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });
};

export const putTarefa = (tarefa) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE Tarefas SET xp=?, titulo=?, descricao=?, repeticao=?, data=?, hora=?, status=? WHERE id=?",
      [
        tarefa.xp,
        tarefa.titulo,
        tarefa.descricao,
        tarefa.repeticao,
        tarefa.data,
        tarefa.hora,
        tarefa.status,
        tarefa.id,
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
