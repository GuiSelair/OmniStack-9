import React, {useState, useEffect} from "react"
import { SafeAreaView, AsyncStorage, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from "react-native"

import logo from "../assets/logo.png"
import SpotList from "../components/SpotList"

export default function List({navigation}){
    const [techs, setTechs] = useState([])  

    useEffect(() => {
        AsyncStorage.getItem("techs").then(storagedTechs => {
            const techsArray = storagedTechs.split(",").map(tech => tech.trim())
            setTechs(techsArray)
        })
    }, [])

    function getClear(){
        AsyncStorage.clear()
        navigation.navigate("Login")
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo}/>
            <TouchableOpacity style={styles.buttonClean} onPress={getClear}>
                <Text style={styles.textClean}>Limpar usuário</Text>
            </TouchableOpacity>
            <ScrollView>
                {techs.map(tech => <SpotList key = {tech} tech = {tech} />)}
            </ScrollView>
        </SafeAreaView>
    )
}

// STYLES
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    logo: {
        height: 32,
        resizeMode: "contain", // CONTAIN: Usado para redimencionamento de imagens para que a imagem seja reduzida proporcionalmente
        alignSelf: "center",
        marginTop: 30
    },

    buttonClean: {
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 2,
        backgroundColor: "#f05a5b",
        justifyContent: "center",
        alignItems: "center"
    },

    textClean: {
        color: "#fff",
        fontSize: 16,
        paddingVertical: 5,
    }
})