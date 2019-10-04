const express = require("express")
const mongoose = require("mongoose")

const routes = require("./routes.js")

const app = express()

mongoose.connect("mongodb+srv://guiselair:guiselair@omnistack-wg69j.mongodb.net/semana09?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(express.json())
app.use(routes)

app.listen(3000, (event) => console.log("Servidor rodando!"))