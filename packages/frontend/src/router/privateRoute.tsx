import React, { ReactElement } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { ROUTER_KEYS } from "~shared/consts/app-keys.const"


const PrivateRoute = ({auth}:{auth:boolean}):ReactElement =>{
    return auth ? <Outlet/> : <Navigate to={ROUTER_KEYS.LOGIN}/>
}