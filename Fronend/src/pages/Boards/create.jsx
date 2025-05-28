import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {useForm, Controller} from "react-hook-form";
import {useState} from "react";
import {createNewBoardAPI} from "~/apis/index.jsx";
import {Abc, Cancel, DescriptionOutlined, LibraryAdd} from "@mui/icons-material";
import {FormControlLabel, InputAdornment, Modal, Radio, RadioGroup, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FIELD_REQUIRED_MESSAGE} from "~/utils/validators.js";
import FieldErrorAlert from "~/components/Form/FieldErrorAlert.jsx";
import Button from "@mui/material/Button";

const SidebarItem = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: '12px 16px',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300]
    },
    '&.active': {
        color: theme.palette.mode === 'dark' ? '#90caf9' : '#0c66e4'
    }
}))

const BOARD_TYPES = {
    PUBLIC: 'public',
    PRIVATE: 'private'
}

const SideBarCreateBoardModel = ({afterCreateNewBoard}) => {
    const {control, register, handleSubmit, reset, formState: {errors}} = useForm()

    const [isOpen, setIsOpen] = useState(false)
    const handleOpenModal = () => setIsOpen(true)
    const handleCloseModal = () => {
        setIsOpen(false)
        reset()
    }

    const submitCreateNewBoard = (data) => {
        console.log('data', data)
        createNewBoardAPI(data).then(() => {
            handleCloseModal()
            afterCreateNewBoard()
        })
    }
    return (
        <>
            <SidebarItem onClick={handleOpenModal}>
                <LibraryAdd fontSize={'small'}/>
                Create a new board
            </SidebarItem>

            <Modal
                open={isOpen}
                aria-labelledby={"modal-modal-title"}
                aria-describedby={"modal-modal-description"}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'white',
                    boxShadow: 24,
                    borderRadius: '8px',
                    border: 'none',
                    outline: 0,
                    padding: '20px 30px',
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : 'white'
                }}>
                    <Box sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        cursor: 'pointer'
                    }}>
                        <Cancel
                            color={'error'}
                            sx={{'&:hover': {color: 'error.light'}}}
                            onClick={handleCloseModal}/>
                    </Box>
                    <Box id={"modal-modal-title"} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <LibraryAdd/>
                        <Typography variant={'h6'} component={'h2'}>Create a new board</Typography>
                    </Box>
                    <Box id={'modal-modal-description'} sx={{my: 2}}>
                        <form onSubmit={handleSubmit(submitCreateNewBoard)}>
                            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                                <Box>
                                    <TextField
                                        fullWidth
                                        label={'Title'}
                                        type={'text'}
                                        variant={'outlined'}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position={"start"}>
                                                    <Abc fontSize={'small'}/>
                                                </InputAdornment>
                                            )
                                        }}
                                        {...register('title', {
                                            required: FIELD_REQUIRED_MESSAGE,
                                            minLength: {value: 3, message: 'Min Length is 3 characters'},
                                            maxLength: {value: 50, message: 'Max Length is 50 characters'}
                                        })}
                                        error={!!errors['title']}
                                    />
                                    <FieldErrorAlert errors={errors} fieldName={'title'}/>
                                </Box>
                                <Box>
                                    <TextField
                                        fullWidth
                                        label={'Description'}
                                        type={"text"}
                                        variant={'outlined'}
                                        multiline
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position={'start'}>
                                                    <DescriptionOutlined fontSize={'small'}/>
                                                </InputAdornment>
                                            )
                                        }}
                                        {...register('description', {
                                            required: FIELD_REQUIRED_MESSAGE,
                                            minLength: {value: 3, message: 'Min Length is 3 characters'},
                                            maxLength: {value: 255, message: 'Max Length is 255 characters'}
                                        })}
                                        error={!!errors['description']}
                                    />
                                    <FieldErrorAlert errors={errors} fieldName={'description'}/>
                                </Box>
                                <Controller
                                    name={'type'}
                                    defaultValue={BOARD_TYPES.PUBLIC}
                                    control={control}
                                    render={({field}) => (
                                        <RadioGroup
                                            {...field}
                                            row
                                            onChange={(event, value) => field.onChange(value)}
                                            value={field.value}
                                        >
                                            <FormControlLabel
                                                control={<Radio size={"small"}/>}
                                                label={"Public"}
                                                value={BOARD_TYPES.PUBLIC}
                                                labelPlacement={'start'}
                                            />
                                            <FormControlLabel
                                                control={<Radio size={"small"} />}
                                                label={'Private'}
                                                value={BOARD_TYPES.PRIVATE}
                                                labelPlacement={'start'}
                                            />
                                        </RadioGroup>
                                    )}
                                />
                                <Box sx={{alignSelf: 'flex-end'}}>
                                    <Button
                                        className={'interceptor-loading'}
                                        type={'submit'}
                                        variant={'contained'}
                                        color={'primary'}
                                    >
                                        Create
                                    </Button>
                                </Box>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default SideBarCreateBoardModel