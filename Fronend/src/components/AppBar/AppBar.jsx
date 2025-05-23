import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import {Button, Tooltip, Typography} from "@mui/material";
import AppsIcon from '@mui/icons-material/Apps';
import TrelloIcon from '~/assets/trello.svg?react'
import LibraryAdd from "@mui/icons-material/LibraryAdd";
import Workspaces from "~/components/Menus/Workspaces.jsx";
import Recent from "~/components/Menus/Recent.jsx";
import Starred from "~/components/Menus/Starred.jsx";
import Templates from "~/components/Menus/Templates.jsx";
import AutoCompleteSearchBoard from "~/components/AppBar/SearchBoards/AutoCompleteSearchBoard.jsx";
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import ModeSelect from "~/components/ModeSelect/index.jsx";

const AppBar = () => {
    return (
        <Box sx={{
            width: '100%',
            height: (theme) => (theme.trello.appBarHeight),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            paddingX: 2,
            overflowX: 'auto',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
        }}>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                <Link to={'/boards'}>
                    <Tooltip title={"Board List"}>
                        <AppsIcon sx={{color: 'white', verticalAlign: 'middle'}}/>
                    </Tooltip>
                </Link>

                <Link to="/" >
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 0.5}}>
                        <TrelloIcon width={30} height={30} style={{ fill: 'white', color: 'white' }}/>
                        <Typography variant={'span'} sx={{fontSize: '1.2rem', fontWeight: 'bold', color: 'white'}} >Trello</Typography>
                    </Box>
                </Link>

                <Box sx={{display: {xs: 'none', md: 'flex'}, gap: 1}}>
                    <Workspaces />
                    <Recent />
                    <Starred />
                    <Templates />
                    <Button sx={{
                        color: 'white',
                        border: 'none',
                        '&:hover': {border: 'none'}
                    }}
                            variant={'outlined'}
                            startIcon={<LibraryAdd/>}
                    >
                        Create
                    </Button>
                </Box>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                <AutoCompleteSearchBoard />
                <ModeSelect/>
                <Tooltip title={'Help'}>
                    <HelpOutlinedIcon sx={{cursor: 'pointer', color: 'white'}} />
                </Tooltip>
            </Box>
        </Box>
    )
}

export default AppBar