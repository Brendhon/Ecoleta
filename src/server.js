const express = require('express')
const server = express()
const db = require('../src/database/db')

//Configurar pasta publica
server.use(express.static("public"))

// Habilitar o uso do body 
server.use(express.urlencoded({ extended: true }))

// Utilizando um template engine
const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


// dirname - Nome do diretorio atual
server.get("/", (req, res) => {
    return res.render("index.html", {
        title: "Um titulo"
    })
})

server.get("/create-point", (req, res) => {
    return res.render("createPoint.html")
})

server.post("/savePoint", (req, res) => {

    //Inserindo dados na tabela
    const query = `
    INSERT INTO places (
        image, 
        name, 
        address, 
        address2, 
        state,
        city,
        items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no Cadastro")
        } else {
            console.log("Cadastrado com sucesso")
            console.log(this)

            return res.render("createPoint.html", { saved: true })
        }
    }

    db.run(query, values, afterInsertData)
})

server.get("/search-results", (req, res) => {

    const search = req.query.search

    if (search == "") {
        return res.send("Pesquisa Vazia")
    }
    else {
        // Pegar os dados do BD
        //Consultar os dados da tabela
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
            if (err) {
                return console.log(err)
            } else {

                const total = rows.length

                return res.render("searchResults.html", { places: rows, total })
                console.log(rows)
            }
        })
    }

})

server.listen(3333)