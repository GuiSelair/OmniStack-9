import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import api from "../../services/api"
import "./styles.css"

export default function Dashboard({history}){
    const [spots, setSpots] = useState([])
    
    useEffect(() => {
        async function loadSpots(){
            const user_id = localStorage.getItem("user")
            const response = await api.get("/dashboard", {
                headers: { user_id }
            })
            setSpots(response.data.spots)            
            console.log(response.data.spots);
            
        }
        loadSpots()
    }, []);

    function EventClick(spot_id){
        history.push("/remove", {spot_id})
    }

    return (
        <>
            <ul className="spot-list">
               {spots.map(spot => (
                   <li key={spot._id}>
                        <header style={{backgroundImage: `url(${spot.thumbnail_url})`}} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia`: "GRATUITO"}</span>
                        <div className="options">
                        <Link to="/edit">
                            <button className="btn-edit"><FontAwesomeIcon icon={faEdit} /></button>
                        </Link>
                        <Link to ={`/remove/${spot._id}`}>
                            <button className="btn-remove"><FontAwesomeIcon icon={faTrashAlt} /></button>
                        </Link>
                       </div>
                   </li>
               ))} 
            </ul>
            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button>
            </Link>
        </>
    )
}
