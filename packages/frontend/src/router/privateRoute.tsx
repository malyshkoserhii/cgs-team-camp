import React, { ReactElement } from "react"
import { Navigate, Outlet } from "react-router-dom"


const PrivateRoute = ({auth}:{auth:boolean}):ReactElement =>{
    return auth ? <Outlet/> : <Navigate to={"/login"}/>
}