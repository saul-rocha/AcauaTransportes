const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('.acauatransportes.db')

db.serialize(function(){
    //criar tabela

    db.run(`
        CREATE TABLE IF NOT EXISTS news(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            description TEXT
        );
    `)

    //inserir dados
    //const query = `
    //    INSERT INTO news(
    //        image,
    //        title,
    //        description
    //    ) VALUES(?,?,?);
    //`

    //const values = [
    //    "https://image.flaticon.com/icons/svg/164/164973.svg",
    //    "Site Oficial",
    //    "A Acauã Transportes está com site oficial! Encontre notícias, horário de viagens e conheça-nos."   
    //]

    //db.run(query, values, function(err){
    //    if (err) return console.log(err)

    //    console.log(this)
    //})
    
    //deletar dados

    //db.run(`DELETE from news WHERE id = ?`, [1], function(err){
      //  if (err) return console.log(err)

       // console.log("DELETADO", this)
    //})

    //consultar dados

    //db.all(`SELECT * FROM news`, function(err, rows){
     //   if (err) return console.log(err)

    //    console.log(rows)
    //})

})

module.exports = db