import {useState} from 'react'
import {Typography} from "@mui/material";
import {Routes, Navigate, Route, Outlet} from 'react-router-dom'
import NotFound from '~/pages/404/NotFound'
import Boards from "~/pages/Boards";
import Auth from "~/pages/Auth/Auth.jsx";
import AccountVerification from "~/pages/Auth/AccountVerification.jsx";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "~/redux/user/userSlice.js";
import Board from "~/pages/Boards/_id.jsx";


const ProtectedRoute = ({user}) => {
    if (!user) return <Navigate to={'/login'} replace={true}/>
    return <Outlet/>
}

function App() {
    const currentUser = useSelector(selectCurrentUser)
    return (
        <Routes>
            <Route path={'/'} element={
                <Navigate to={'/boards'} replace={true}/>
            }/>
            <Route element={<ProtectedRoute user={currentUser}/>}>
                <Route path={'/boards/:boardId'} element={<Board/>} />
                <Route path={'/boards'} element={<Boards/>}/>
            </Route>

            <Route path={'/login'} element={<Auth/>}/>
            <Route path={'/register'} element={<Auth/>}/>
            <Route path={'/account/verification'} element={<AccountVerification/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}

export default App
