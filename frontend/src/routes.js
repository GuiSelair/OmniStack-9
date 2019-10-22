import React from "react"
import { BrowserRouter, Switch, Route, useParams } from "react-router-dom"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import New from "./pages/New"
import Remove from "./pages/Remove"
import Edit from "./pages/Edit"

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/new" component={New} />
                <Route path="/edit" component={Edit} />
                <Route path="/remove/:id" component={Remove}  />
            </Switch>
        </BrowserRouter>
    )
}