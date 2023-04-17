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
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Itens(
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        nome TEXT,
        descricao TEXT,
        raridade TEXT,
        tipo TEXT,
        equipamento TEXT,
        id_Atributo INTEGER,
        FOREIGN KEY (id_Atributo) REFERENCES Atributos(id)
      )`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Inventario( 
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        Item INTEGER,
        quantidade INTEGER,
        FOREIGN KEY (Item) REFERENCES Itens(id)
      )`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Recompensa_Item( 
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        id_Tarefa INTEGER,
        id_Item INTEGER,
        FOREIGN KEY (id_Tarefa) REFERENCES Tarefas(id)
        FOREIGN KEY (id_Item) REFERENCES Itens(id)
      )`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Magias( 
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        nome TEXT,
        descricao TEXT,
        tipo TEXT,
        id_Atributo INTEGER,
        FOREIGN KEY (id_Atributo) REFERENCES Atributos(id)
      )`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Recompensa_Magia( 
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        id_Tarefa INTEGER,
        id_Magia INTEGER,
        FOREIGN KEY (id_Tarefa) REFERENCES Tarefas(id)
        FOREIGN KEY (id_Magia) REFERENCES Magias(id)
      )`
    );
  });
  console.log('banco criado');
};