const mongoose = require("mongoose")

//  Define o esquema da tabela com os seus respectivos tipos
const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],    // Vetor de String
    user: {
        type: mongoose.Schema.Types.ObjectId,    // ID do usuário
        ref: "user"
    }
}, {
    toJSON: {
        virtuals: true
    }
})

SpotSchema.virtual("thumbnail_url").get(function(){
    return `http://localhost:3333/files/${this.thumbnail}`
})

//  Exporta SpotSchemas para criar uma nova instancia de usuário
module.exports = mongoose.model("Spot", SpotSchema)