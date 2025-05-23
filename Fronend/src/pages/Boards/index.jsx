import { Container} from "@mui/material";
import AppBar from '~/components/AppBar/AppBar'
import {styled} from '@mui/material/styles'
import Box from "@mui/material/Box";
import {useState} from "react";
import {useLocation} from "react-router-dom";

const SidebarItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: '12px 16px',
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300]
    },
    '&.active': {
        color: theme.palette.mode === 'dark' ? '#90caf9' : '#0c66e4',
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e9f2ff'
    }
}))

const Boards = () => {
    const [boards, setBoard] = useState(null)
    const [totalBoards, setTotalBoards] = useState(null)
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const page = parseInt(query.get('page') || '1', 10)
    return (
        <Container disableGutters maxWidth={false}>
            <AppBar />
        </Container>
    )
}

export default Boards