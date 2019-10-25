import React, {useState, useMemo, useEffect} from "react"
import camera from "../../assets/camera.svg"
import "./styles.css"
import api from "../../services/api"
import teste from "../../assets/background.jpg"

export default function Edit({match, history}){
    const [company, setCompany] = useState("")
    const [techs, setTechs] = useState("")
    const [price, setPrice] = useState("")
    const [thumbnail, setThumbnail] = useState(null)
    const spot_id = match.params.spot_id

    /*
    useEffect(() => {
        async function loadSpotItems(id){
            const response = await api.get(`/spot/${id}`)
            setThumbnail(response.data.thumbnail)
            setCompany(response.data.company)
            setPrice(response.data.price)
            setTechs(response.data.techs)
        }100
        loadSpotItems(spot_id)
    }, [])
    */
    const preview = useMemo(
        () => {
            console.log(thumbnail);
            console.log(teste);
            
            return thumbnail ? URL.createObjectURL(thumbnail) : teste
        },
        [thumbnail]

    )
    console.log(match.params.spot_id);


    async function handleEdit(event){
        event.preventDefault()
        const data = new FormData()
        const user_id = localStorage.getItem("user")

        data.append("thumbnail", thumbnail)
        data.append("company", company)
        data.append("techs", techs)
        data.append("price", price)
        
        await api.post("/spots", data, {
            headers: {user_id}
        })

        history.push("/dashboard")
    }
    
    return (
        <form onSubmit={handleEdit}>
            <label id="thumbnail" style={{backgroundImage: `url(${preview})`}} className={thumbnail ? "has-thumbnail" : ""}>
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select img"/>
            </label>
            <label htmlFor="company">EMPRESA *</label>
            <input
                id="company"
                placeholder="Sua empresa incrivel"
                value = {company}
                onChange = {event => setCompany(event.target.value)}
            />
            <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por virgulas)</span></label>
            <input
                id="techs"
                placeholder="Quais tecnologias usam?"
                value = {techs}
                onChange = {event => setTechs(event.target.value)}
            />
            <label htmlFor="price">VALOR * <span>(Gratuito não preencher)</span></label>
            <input
                id="price"
                placeholder="Quanto cobra?"
                value = {price}
                onChange = {event => setPrice(event.target.value)}
            />
            <button className="btn">Cadastrar</button>
        </form>
    )
}