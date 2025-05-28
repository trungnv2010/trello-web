import {useState} from "react";
import {useForm} from "react-hook-form";
import {inviteUserToBoardAPI} from "~/apis/index.jsx";
import {socketIoInstance} from "~/socketClient.js";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import {PersonAdd} from "@mui/icons-material";
import {Popover} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE} from "~/utils/validators.js";
import FieldErrorAlert from "~/components/Form/FieldErrorAlert.jsx";

const InviteBoardUser = ({boardId}) => {
    const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
    const isOpenPopover = Boolean(anchorPopoverElement)
    const popoverId = isOpenPopover ? 'invite-board-user-popover' : undefined
    const handleTogglePopover = (event) => {
        if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
        else setAnchorPopoverElement(null)
    }
    const {register, handleSubmit, setValue, formState: {errors}} = useForm()
    const submitInviteUserToBoard = (data) => {
        const {inviteeEmail} = data
        inviteUserToBoardAPI({inviteeEmail, boardId}).then(invitation => {
            setValue('inviteeEmail', null)
            setAnchorPopoverElement(null)

            socketIoInstance.emit('FE_USER_INVITED_TO_BOARD', invitation)
        })
    }

    return (
        <Box>
            <Tooltip title={"Invite user to this board!"}>
                <Button
                    aria-describedby={popoverId}
                    onClick={handleTogglePopover}
                    variant={'outlined'}
                    startIcon={<PersonAdd />}
                    sx={{color: 'white', borderColor: 'white', '&:hover': {borderColor: 'white' }}}
                >
                    Invite
                </Button>
            </Tooltip>
            <Popover
                open={isOpenPopover}
                id={popoverId}
                anchorEl={anchorPopoverElement}
                onClose={handleTogglePopover}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <form
                    onSubmit={handleSubmit(submitInviteUserToBoard)}
                    style={{width: '320px'}}
                >
                    <Box sx={{p: '15px 20px 20px 20px', display: 'flex', flexDirection: 'column', gap: 2}}>
                        <Typography variant={'span'} sx={{fontWeight: 'bold', fontSize: '16px'}}>Invite User to this board!</Typography>
                        <Box>
                            <TextField
                                autoFocus
                                fullWidth
                                label={"Enter email to invite..."}
                                type={'text'}
                                variant={'outlined'}
                                {...register('inviteeEmail', {
                                    required: FIELD_REQUIRED_MESSAGE,
                                    pattern: {value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE}
                                })}
                                error={!!errors['inviteeEmail']}
                            />
                            <FieldErrorAlert errors={errors} fieldName={'inviteeEmail'} />
                        </Box>
                        <Box sx={{alignSelf: 'flex-end'}}>
                            <Button
                                className={'interceptor-loading'}
                                type={'submit'}
                                variant={'contained'}
                                color={'info'}
                            >
                                Invite
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Popover>
        </Box>
    )
}

export default InviteBoardUser