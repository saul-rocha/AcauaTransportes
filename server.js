const express = require("express")
const server = express()

const db = require("./db")
//configurando arquivos estaticos

server.use(express.static("public"))

//habilitar uso do req.body
server.use(express.urlencoded({extended: true}))
//configurando o nunjucks

const nunjucks = require("nunjucks")

nunjucks.configure("views", {
    express: server,
    noCache: true,
})



//criando uma rota /
server.get("/", function(req, res){

    db.all(`SELECT * FROM news`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send ("Erro no banco de dados!")
        }
        
        const reversednews = [...rows].reverse()

        let lastnew = []
        for (let neww of reversednews){
            if(lastnew.length < 2) {
                lastnew.push(neww)
            }
        }

        return res.render("index.html", {news: lastnew})
    })
    
})

server.get("/login", function(req, res){


    db.all(`SELECT * FROM news`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send ("Erro no banco de dados!")
        }

        const reversenews = [...rows].reverse()
    
        return res.render("login.html", {news: reversenews})
    })
    
})

server.get("/news", function(req, res){


    db.all(`SELECT * FROM news`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send ("Erro no banco de dados!")
        }

        const reversenews = [...rows].reverse()
    
        return res.render("noticias.html", {news: reversenews})
    })
    
})

server.post("/", function(req, res){
    //inserir dados
    const query = `
        INSERT INTO news(
            image,
            title,
            description
        ) VALUES(?,?,?);
    `

    const values = [
        req.body.image,
        req.body.title,
        req.body.description,
    ]

    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send ("Erro no banco de dados!")
        }

        return res.redirect("/noticias")
    })
    
    //deletar dados

    db.run(`DELETE from news WHERE id = ?`, [1], function(err){
        if (err) return console.log(err)

        console.log("DELETADO", this)
    })
})

server.listen(3000)