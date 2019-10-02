const express = require("express")

const app = express()

app.get("/", (req, res) => {
    return res.send("Hello Usuário")
})

app.listen(3000, (event) => console.log("Servidor rodando!"))