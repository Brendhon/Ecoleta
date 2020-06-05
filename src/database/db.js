//Importar as dependencias do BD
const sqlite = require('sqlite3').verbose()

//Criar objeto que irá fazer operações no BD
const db = new sqlite.Database("./src/database/database.db") //Criando um arquivo BD no local declarado

module.exports = db


// db.serialize(_ => {
//     // Criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     // // Inserindo dados na tabela
//     // const query = `
//     // INSERT INTO places (
//     //     image, 
//     //     name, 
//     //     address, 
//     //     address2, 
//     //     state,
//     //     city,
//     //     items
//     //     ) VALUES (?, ?, ?, ?, ?, ?, ?);
//     // `
//     // const values = [
//     //     "http://www.linhadecodigo.com.br/artigos/img_artigos/JonasChaves/SQLLite/image001.jpg", 
//     //     "name", 
//     //     "address", 
//     //     "address2", 
//     //     "state",
//     //     "city",
//     //     "items"
//     // ]
    
//     // function afterInsertData(err) {
//     //     if (err) {
//     //         return console.log(err)
//     //     } else {
//     //         console.log("Cadastrado com sucesso")
//     //         console.log(this)
//     //     }
//     // }

//     // db.run(query, values, afterInsertData)

//     // //Consultar os dados da tabela
//     // db.all(`SELECT * FROM places`, function(err, rows){
//     //     if (err) {
//     //         return console.log(err)
//     //     } else {
//     //         console.log("Aqui estão seus registros")
//     //         console.log(rows)
//     //     }
//     // })

//     // Deletar um campo da tabela
//     db.run(`DELETE FROM places WHERE id = ?`, [3], function(err){
//         if (err) {
//             return console.log(err)
//         } else {
//             console.log("Registro deletado!")
//         }
//     })
// })