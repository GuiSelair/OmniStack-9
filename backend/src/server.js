const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")

const routes = require("./routes.js")

const app = express()

mongoose.connect("mongodb+srv://guiselair:guiselair@omnistack-wg69j.mongodb.net/semana09?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(cors())
app.use(express.json())
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")))
app.use(routes)

app.listen(3333, (event) => console.log("Servidor rodando!"))