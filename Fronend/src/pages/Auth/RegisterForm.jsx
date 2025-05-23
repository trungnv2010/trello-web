import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {Box, CardActions, TextField, Zoom} from "@mui/material";
import {Card as MuiCard} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import LockIcon from '@mui/icons-material/Lock'
import TrelloIcon from '~/assets/trello.svg?react'
import {
    EMAIL_RULE,
    EMAIL_RULE_MESSAGE,
    FIELD_REQUIRED_MESSAGE,
    PASSWORD_RULE,
    PASSWORD_RULE_MESSAGE
} from "~/utils/validators.js";
import FieldErrorAlert from "~/components/Form/FieldErrorAlert.jsx";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {toast} from "react-toastify";
import {registerUserAPI} from "~/apis/index.jsx";


const RegisterForm = () => {
    const {register, handleSubmit, formState: {errors}, watch} = useForm()
    const navigate = useNavigate()

    const submitRegister = (data) => {
        const {email, password} = data
        toast.promise(
            registerUserAPI({email, password}),
            {pending: 'Registration is in progress...'}
        ).then(user => {
            navigate(`/login?registeredEmail=${user.email}`)
        })
    }

    return (
        <form onSubmit={handleSubmit(submitRegister)}>
            <Zoom in={true} style={{transitionDelay: '200ms'}}>
                <MuiCard sx={{minWidth: 380, maxWidth: 380, marginTop: '6em'}}>
                    <Box sx={{
                        margin: '1em',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 1
                    }}>
                        <Avatar sx={{bgcolor: 'primary.main'}}><LockIcon/></Avatar>
                        <Avatar sx={{bgcolor: 'primary.main'}}><TrelloIcon/></Avatar>
                    </Box>
                    <Box sx={{padding: '0 1em 1em 1em'}}>
                        <Box sx={{marginTop: '1em'}}>
                            <TextField
                                autoFocus
                                fullWidth
                                label={"Enter Email..."}
                                type={'text'}
                                variant={'outlined'}
                                error={!!errors['email']}
                                {...register('email', {
                                    required: FIELD_REQUIRED_MESSAGE,
                                    pattern: {
                                        value: EMAIL_RULE,
                                        message: EMAIL_RULE_MESSAGE
                                    }
                                })}
                            />
                            <FieldErrorAlert errors={errors} fieldName={'email'}/>
                        </Box>
                        <Box sx={{marginTop: '1em'}}>
                            <TextField
                                fullWidth
                                label={'Enter Password...'}
                                type={'password'}
                                variant={'outlined'}
                                error={!!errors['password']}
                                {...register('password', {
                                    required: FIELD_REQUIRED_MESSAGE,
                                    pattern: {
                                        value: PASSWORD_RULE,
                                        message: PASSWORD_RULE_MESSAGE
                                    }
                                })}
                            />
                            <FieldErrorAlert errors={errors} fieldName={'password'}/>
                        </Box>
                    </Box>
                    <CardActions sx={{padding: '0 1em 1em 1em'}}>
                        <Button
                            className={"interceptor-loading"}
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                            size={'large'}
                            fullWidth
                        >
                            Register
                        </Button>
                    </CardActions>
                    <Box sx={{padding: '0 1em 1em 1em', textAlign: 'center'}}>
                        <Typography>Already have an account?</Typography>
                        <Link to={'/login'} style={{textDecoration: 'none'}}>
                            <Typography sx={{color: 'primary.main', '&:hover': {color: '#ffbb39'}}}>Login!</Typography>
                        </Link>
                    </Box>
                </MuiCard>
            </Zoom>
        </form>
    )
}

export default RegisterForm