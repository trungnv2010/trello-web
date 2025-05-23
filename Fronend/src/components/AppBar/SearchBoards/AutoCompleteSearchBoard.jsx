import {useNavigate} from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import {useState} from "react";
import {CircularProgress, InputAdornment, TextField} from "@mui/material";
import {Search} from "@mui/icons-material";


const AutoCompleteSearchBoard = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [boards, setBoards] = useState(null)
    const [loading, setLoading] = useState(false)
    return (
        <Autocomplete
            sx={{width: 220}}
            id="asynchronous-search-board"
            noOptionsText={!boards ? 'Type to search board...' : 'No board found!'}
            open={open}
            onOpen={() => {setOpen(true)}}
            onClose={() => {setOpen(false)}}
            getOptionLabel={(board) => board.title}
            options={boards || []}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Type to search..."
                    size="small"
                    slotProps={{
                        input: {
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: 'white' }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress sx={{ color: 'white' }} size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            )
                        }
                    }}
                    sx={{
                        '& label': { color: 'white' },
                        '& input': { color: 'white' },
                        '& label.Mui-focused': { color: 'white' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'white' },
                            '&:hover fieldset': { borderColor: 'white' },
                            '&.Mui-focused fieldset': { borderColor: 'white' }
                        },
                        '.MuiSvgIcon-root': { color: 'white' }
                    }}
                />
            )}
        />
    )
}

export default AutoCompleteSearchBoard