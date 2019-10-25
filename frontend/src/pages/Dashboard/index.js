import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { confirmAlert } from 'react-confirm-alert'; // Import

import api from "../../services/api"
import "./styles.css"
import '../../../node_modules/react-confirm-alert/src/react-confirm-alert.css'; // Import css


export default function Dashboard({history}){
    const [spots, setSpots] = useState([])
    
    useEffect(() => {
        async function loadSpots(){
            const user_id = localStorage.getItem("user")
            const response = await api.get("/dashboard", {
                headers: { user_id }
            })
            setSpots(response.data.spots)                        
        }
        loadSpots()
    }, []);

    function removeSpot(spot_id){
        confirmAlert({
            title: 'Confirmação',
            message: 'Tens certeza que queres excluir este spot?',
            buttons: [
                {
                    label: "Sim",
                    onClick: () => {
                        
                        api.delete(`/remove/${spot_id}`).then((response) => {
                                window.location.reload()
                        }, (e) => {
                            console.error(e)
                        })                        
                    }
                },
                {
                    label: "Não",
                    onClick: () => history.push("/dashboard")
                }
            ]
        })
        

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
                        <Link to = {`/edit/${spot._id}`}>
                            <button className="btn-edit"><FontAwesomeIcon icon={faEdit} /></button>
                        </Link>
                        <button className="btn-remove" onClick={() => removeSpot(spot._id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
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
