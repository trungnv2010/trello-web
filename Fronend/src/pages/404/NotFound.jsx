import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PlanetSvg from '~/assets/404/planet.svg?react'
import AstronautSvg from '~/assets/404/astronaut.svg?react'
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {Home} from "@mui/icons-material";


const NotFound = () => {
    return (
        <Box sx={{
            width: '100vw',
            height: '100vh',
            bgcolor: '#25344C',
            color: 'white'
        }}>
            <Box sx={{
                '@keyframes starts': {
                    '0%': {backgroundPosition: '-100% 100%'},
                    '100%': {backgroundPosition: '0 0 '}
                },
                animation: 'starts 12s linear infinite alternate',
                width: '100%',
                height: '100%',
                backgroundImage: 'url("src/assets/404/particles.png")',
                backgroundSize: 'contain',
                backgroundRepeat: 'repeat',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography variant={'h1'} sx={{fontSize: '100px', fontWeight: 800}}>404</Typography>
                <Typography sx={{
                    fontSize: '18px !important',
                    lineHeight: '25px',
                    fontWeight: 400,
                    maxWidth: '350px',
                    textAlign: 'center'
                }}>
                    LOST IN&nbsp;
                    <Typography variant={'span'} sx={{
                        position: 'relative',
                        '&:after': {
                            position: 'absolute',
                            content: '""',
                            borderBottom: '3px solid #fdba26',
                            left: 0,
                            top: '43%',
                            width: '100%'
                        }
                    }}>
                        &nbsp;SPACE&nbsp;
                    </Typography>
                    &nbsp;<Typography variant="span"
                                      sx={{color: '#fdba26', fontWeight: 500}}>Trungnv2010</Typography>?<br/>Hmm,
                    looks like that page doesn&apos;t exist.
                </Typography>
                <Link to={'/'} style={{textDecoration: 'none'}}>
                    <Button
                        variant={'outlined'}
                        startIcon={<Home/>}
                        sx={{
                            marginTop: '25px',
                            display: 'flex',
                            alignItems: 'center',
                            color: 'white',
                            borderColor: 'white',
                            '&:hover': {
                                color: '#fdba26',
                                borderColor: '#fdba26'
                            }
                        }}
                    >
                        Go Home
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}

export default NotFound