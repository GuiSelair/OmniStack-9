import React, {useState, useEffect} from "react"
import { View, KeyboardAvoidingView, Image, AsyncStorage, Platform, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native"

import api from "../services/api"
import logo from "../assets/logo.png"

export default function Login({navigation}){
    const [email, setEmail] = useState("")
    const [techs, setTechs] = useState("")
    
    useEffect(() => {
        AsyncStorage.getItem("user").then(user =>{
            if (user){
                navigation.navigate("List")
            }
        }) 
    }, [])

    // Função assionada quando o usuário clica no button
    async function handleSubmit(){

        // Envia para o backend o email informado
        const response = await api.post("/sessions", {
            email
        })

        // Captura o _id do usuário novo ou já existente
        const {_id} = response.data.user

        // Salva no Banco de Dados do Celular
        await AsyncStorage.setItem("user", _id)
        await AsyncStorage.setItem("techs", techs)
        
        // Encaminha o usuário para outra rota
        navigation.navigate("List")
    }

    return (

    //  <KeyboardAvoidingView></KeyboardAvoidingView> => A propriedade de deslizar é desta tag
    //  behavior="padding" => Define que quando clicado em algum input o teclado não pode cobrir a tela, sempre associado a tag acima
    //  enabled={Platform.OS === "ios"} => Define que as configurações de cima sejam apenas para IOS

    <KeyboardAvoidingView style={styles.container}>
        <Image source={logo}></Image>
        <View style={styles.form}>
            <Text style={styles.text}>Seu E-MAIL*</Text>
            <TextInput
                style={styles.input}
                placeholder = "Seu E-mail"
                placeholderTextColor = "#999"
                keyboardType="email-address"    // Faz aparecer o @ no teclado
                autoCapitalize="none"   // Tira a primeira letra maiuscula, quando digitado alguma coisa
                autoCorrect={false}     // Tira a auto correção do teclado
                value={email}
                onChangeText={setEmail}

            />
            <Text style={styles.text}>Suas Tecnologias*</Text>
            <TextInput
                style={styles.input}
                placeholder = "Tecnologias de interesse"
                placeholderTextColor = "#999"
                autoCorrect={false}     // Tira a auto correção do teclado
                autoCapitalize="words"  // Cada palavra com a primeira letra maiuscula
                value={techs}
                onChangeText={setTechs}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}> 
                <Text style={styles.buttonText}>Encontrar spots</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>)
}

// Estilização da logo
const styles = StyleSheet.create({
    
    // LOGO
    container: {
        flex: 1,
        justifyContent: "center",   // DEIXA CENTRALIZADO
        alignItems: "center"        // DEIXA CENTRALIZADO
    },

    // TEXT
    text: {
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

    // TEXT BUTTON
    buttonText: {
        color: "#FFF",
        fontWeight: "bold", // DEIXA O TEXTO EM NEGRITO
        fontSize: 16
    }

    
})