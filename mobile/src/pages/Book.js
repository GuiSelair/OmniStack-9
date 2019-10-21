import React, { useState } from "react"
import { View, Text, SafeAreaView, AsyncStorage, StyleSheet, TextInput, TouchableOpacity, Alert} from "react-native"

import api from "../services/api"

export default function Book({ navigation }){
    const [date, setDate] = useState("")
    const id = navigation.getParam("id")

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem("user")
        
        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: {
                user_id
            }
        })
        Alert.alert("Solicitação de reserva enviado")
        navigation.navigate("List")
    }

    function handleCancel(){
        navigation.navigate("List")
    }

    return (
        <SafeAreaView style = {styles.container}>
            <Text style={styles.text}>Data de interesse*</Text>
            <TextInput
                style={styles.input}
                placeholder = "Qual data você quer reservar?"
                placeholderTextColor = "#999"
                autoCorrect={false}     // Tira a auto correção do teclado
                value={date}
                onChangeText={setDate}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}> 
                <Text style={styles.buttonText}>Solicitar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelbutton]}> 
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        marginHorizontal: 20,
    },

    // TEXT
    text: {
        marginTop: 50,
        marginVertical: 10,
        fontWeight: "bold",
        color: "#444"
    },

    // FORM
    form: {
        alignSelf: "stretch",
        paddingHorizontal: 30,
        marginTop: 30
    },

    // INPUT
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 20,  // PADDING INTERNO 
        fontSize: 16,
        color: "#444",
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    // BUTTON
    button: {
        height: 42,     // ALTURA
        backgroundColor: "#f05a5b",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2     // ADICIONA BORDA ARREDONDADA
    },

    cancelbutton: {
        backgroundColor: "#ccc",
        marginTop: 10,
    },  

    // TEXT BUTTON
    buttonText: {
        color: "#FFF",
        fontWeight: "bold", // DEIXA O TEXTO EM NEGRITO
        fontSize: 16
    }
})