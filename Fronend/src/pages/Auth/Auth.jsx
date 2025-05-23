import {useLocation} from "react-router-dom";
import LoginForm from "~/pages/Auth/LoginForm.jsx";
import {Box} from "@mui/material";
import RegisterForm from "~/pages/Auth/RegisterForm.jsx";


const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === '/login'
    const isRegister = location.pathname === '/register'


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'flex-start',
            background: 'url("src/assets/auth/login-register-bg.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)'
        }}>
            {isLogin && <LoginForm />}
            {isRegister && <RegisterForm />}
        </Box>
    )
}

export default Auth