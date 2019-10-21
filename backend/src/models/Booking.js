const mongoose = require("mongoose")

//  Define o esquema da tabela com os seus respectivos tipos
const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Spot"
    }
})

//  Exporta BookingSchemas para criar uma nova instancia de usuário
module.exports = mongoose.model("Booking", BookingSchema)