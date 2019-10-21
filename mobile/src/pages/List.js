import React, {useState, useEffect} from "react"
import { SafeAreaView, AsyncStorage, Text, StyleSheet, Image, ScrollView} from "react-native"

import logo from "../assets/logo.png"
import SpotList from "../components/SpotList"

export default function List(){
    const [techs, setTechs] = useState([])  

    useEffect(() => {
        AsyncStorage.getItem("techs").then(storagedTechs => {
            const techsArray = storagedTechs.split(",").map(tech => tech.trim())
            setTechs(techsArray)
        })
    }, [])
    
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo}/>
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
        marginTop: 20
    }
})