import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('agenda.db');

export const addAtributo = (atributo) => {
    db.transaction(tx => {
            tx.executeSql('INSERT INTO Atributos(nome, nivel, xp) VALUES (?, ?, ?)', [atributo.nome, atributo.nivel, atributo.xp],
        (txObj, resultSet) => {
          console.log(resultSet);
        },
        (txObj, error) => console.log(error)
      );
    })
    console.log('add feito');
  }

  export const getAtributos = (callback) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Atributos', null,
        (txObj, resultSet) => callback(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  };
  
  export const getAtributo = (id, callback) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Atributos WHERE id=?', [id],
        (txObj, resultSet) => callback(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  };
  
  export const putAtributo = (atributo) => {
    db.transaction(tx => {
      tx.executeSql('UPDATE Atributos SET nome=?, nivel=?, xp=? WHERE id=?', [atributo.nome, atributo.nivel, atributo.xp],
        (txObj, resultSet) => {
          console.log(resultSet)
        },
        (txObj, error) => console.log(error)
      );
    });
  };
  
  export const delAtributo = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM Atributos WHERE id=?', [id],
        (txObj, resultSet) => {
          console.log(resultSet)
        },
        (txObj, error) => console.log(error)
      );
    });
  };