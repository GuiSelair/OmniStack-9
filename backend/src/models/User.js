const mongoose = require("mongoose")

//  Define o esquema da tabela com os seus respectivos tipos
const UserSchema = new mongoose.Schema({
    email: String,
})

//  Exporta UserSchemas para criar uma nova instancia de usuário
module.exports = mongoose.model("User", UserSchema)