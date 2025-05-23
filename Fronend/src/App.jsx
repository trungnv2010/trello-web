import {useState} from 'react'
import {Typography} from "@mui/material";
import {Routes, Navigate, Route} from 'react-router-dom'
import NotFound from '~/pages/404/NotFound'
import Boards from "~/pages/Boards";
import Auth from "~/pages/Auth/Auth.jsx";

function App() {
    return (
        <Routes>
            <Route path={'/'} element={
                <Navigate to={'/boards'} replace={true}/>
            }/>
            <Route path={'/boards'} element={<Boards />} />
            <Route path={'/login'} element={<Auth />} />
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}

export default App
