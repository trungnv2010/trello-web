import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import {Chip} from "@mui/material";
import {AddToDrive, Bolt, Dashboard, FilterList, VpnLock} from "@mui/icons-material";
import {capitalizeFirstLetter} from "~/utils/formatters.js";
import InviteBoardUser from "~/pages/Boards/BoardBar/InviteBoardUser.jsx";
import BoardUserGroup from "~/pages/Boards/BoardBar/BoardUserGroup.jsx";

const MENU_STYLES = {
    color: 'white',
    bgcolor: 'transparent',
    border: 'none',
    paddingX: '5px',
    borderRadius: '4px',
    '.MuiSvgIcon-root': {
        color: 'white'
    },
    '&:hover': {
        bgcolor: 'primary.50'
    }
}

const BoardBar = ({board}) => {
    return (
        <Box sx={{
            width: '100%',
            height: (theme) => theme.trello.boardBarHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            paddingX: 2,
            overflowX: 'auto',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
        }}>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                <Tooltip title={board?.description}>
                    <Chip
                        sx={MENU_STYLES}
                        icon={<Dashboard/>}
                        label={board?.title}
                        clickable
                    />
                </Tooltip>
                <Chip
                    sx={MENU_STYLES}
                    icon={<VpnLock/>}
                    label={capitalizeFirstLetter(board?.type)}
                    clickable
                />
                <Chip
                    sx={MENU_STYLES}
                    icon={<AddToDrive/>}
                    label="Add To Google Drive"
                    clickable
                />
                <Chip
                    sx={MENU_STYLES}
                    icon={<Bolt/>}
                    label="Automation"
                    clickable
                />
                <Chip
                    sx={MENU_STYLES}
                    icon={<FilterList/>}
                    label="Filters"
                    clickable
                />
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                <InviteBoardUser boardId={board._id}/>
                <BoardUserGroup boardUsers={board?.FE_allUser} />
            </Box>
        </Box>
    )
}

export default BoardBar