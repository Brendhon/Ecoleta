const express = require('express')
const server = express()

//Configurar pasta publica
server.use(express.static("public"))

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

server.get("/search-results", (req, res) => {
    return res.render("searchResults.html")
})

server.listen(3333)