import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import {useState} from "react";

const BoardUserGroup = ({boardUsers = [], limit = 6}) => {
    const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
    const isOpenPopover = Boolean(anchorPopoverElement)
    const popoverId = isOpenPopover ? 'board-all-users-popover' : undefined
    const handleTogglePopover = (event) => {
        if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
        else setAnchorPopoverElement(null)
    }

    return (
        <Box sx={{display: 'flex', gap: '4px'}}>
            {boardUsers.map((user, index) => {
                if (index < limit) {
                    return (
                        <Tooltip title={user?.displayName} key={index}>
                            <Avatar
                                sx={{width: 34, height: 34, cursor: 'pointer'}}
                                src={user?.avatar}
                            />
                        </Tooltip>
                    )
                }
            })}

            {boardUsers.length > limit &&
                <Tooltip title={'Show more'}>
                    <Box
                        aria-describedby={popoverId}
                        onClick={handleTogglePopover}
                        sx={{
                            width: 36,
                            height: 36,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            fontWeight: '500',
                            borderRadius: '50%',
                            color: 'white',
                            backgroundColor: '#a4b0be'
                        }}
                    >
                        +{boardUsers.length - limit}

                    </Box>
                </Tooltip>
            }
        </Box>
    )
}

export default BoardUserGroup