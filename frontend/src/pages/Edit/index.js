import React from "react"

import "./styles.css"

export default function Remove({match}){
    
    console.log(match.params.spot_id);
    
    return <div>{match.params.spot_id}</div>
}