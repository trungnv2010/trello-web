import {Card, CardContent, Container, Grid, Pagination, PaginationItem, Stack} from "@mui/material";
import AppBar from '~/components/AppBar/AppBar'
import {styled} from '@mui/material/styles'
import Box from "@mui/material/Box";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {fetchBoardsAPI} from "~/apis/index.jsx";
import PageLoadingSpinner from "~/components/Loading/PageLoadingSpinner.jsx";
import {ArrowRight, Home, ListAlt} from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import SideBarCreateBoardModel from "~/pages/Boards/create";
import Typography from "@mui/material/Typography";
import randomColor from 'randomcolor'
import {DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE} from "~/utils/constants.js";

const SidebarItem = styled(Box)(({theme}) => ({
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
    const updateStateData = (res) => {
        setBoard(res.boards || [])
        setTotalBoards(res.totalBoards || 0)
    }

    useEffect(() => {
        fetchBoardsAPI(location.search).then(updateStateData)
    }, [location.search])

    const afterCreateNewBoard = () => {
        fetchBoardsAPI(location.search).then(updateStateData)
    }

    if (!boards) {
        return <PageLoadingSpinner caption={'Loading Boards...'}/>
    }
    return (
        <Container disableGutters maxWidth={false}>
            <AppBar/>
            <Box sx={{paddingX: 2, my: 4}}>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={3}>
                        <Stack direction={'column'} spacing={1}>
                            <SidebarItem className={"active"}>
                                <SpaceDashboardIcon fontSize={'small'}/>
                                Boards
                            </SidebarItem>
                            <SidebarItem>
                                <ListAlt fontSize={'small'}/>
                                Templates
                            </SidebarItem>
                            <SidebarItem>
                                <Home fontSize={'small'}/>
                                Home
                            </SidebarItem>
                        </Stack>
                        <Divider sx={{my: 1}}/>
                        <Stack direction={'column'} spaceing={1}>
                            <SideBarCreateBoardModel afterCreateNewBoard={afterCreateNewBoard}/>
                        </Stack>
                    </Grid>
                    <Grid xs={12} sm={9}>
                        <Typography variant={'h4'} sx={{fontWeight: 'bold', mb: 3}}>Your boards:</Typography>

                        {boards?.length === 0 &&
                            <Typography variant={'span'} sx={{fontWeight: 'bold', mb: 3}}>No result found!</Typography>
                        }

                        {boards?.length > 0 &&
                            <Grid container spacing={2}>
                                {boards.map(b => (
                                    <Grid xs={2} sm={3} md={4} key={b._id}>
                                        <Card sx={{width: '250px'}}>
                                            <Box sx={{height: '50px', backgroundColor: randomColor()}}></Box>

                                            <CardContent sx={{p: 1.5, '&:last-child': {p: 1.5}}}>
                                                <Typography gutterBottom variant={'h6'} component={'div'}>
                                                    {b?.title}
                                                </Typography>

                                                <Typography
                                                    variant={'body2'}
                                                    color={'text.secondary'}
                                                    sx={{
                                                        overflow: 'hidden',
                                                        whiteSpace: 'nowrap',
                                                        textOverflow: 'ellipsis'
                                                    }}
                                                >
                                                    {b?.description}
                                                </Typography>
                                                <Box
                                                    component={Link}
                                                    to={`/boards/${b._id}`}
                                                    sx={{
                                                        mt: 1,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'flex-end',
                                                        color: 'primary.main',
                                                        '&:hover': {color: 'primary.light'}
                                                    }}
                                                >
                                                    Go to board <ArrowRight fontSize={'small'}/>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        }

                        {(totalBoards > 0) &&
                            <Box sx={{my: 3, pr: 5, display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                                <Pagination
                                    size={'large'}
                                    color={'secondary'}
                                    showFirstButton
                                    showLastButton
                                    count={Math.ceil(totalBoards / DEFAULT_ITEMS_PER_PAGE)}
                                    page={page}
                                    renderItem={(item) => (
                                        <PaginationItem
                                            component={Link}
                                            to={`/boards${item.page === DEFAULT_PAGE ? '' : `?page=${item.page}`}`}
                                            {...item}
                                        />
                                    )}
                                />
                            </Box>
                        }
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default Boards