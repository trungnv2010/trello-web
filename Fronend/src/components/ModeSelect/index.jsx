import {FormControl, InputLabel} from "@mui/material";
import {useColorScheme} from '@mui/material/styles'
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import {DarkMode, LightMode} from "@mui/icons-material";
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import Select from '@mui/material/Select';

const ModeSelect = () => {
    const {mode, setMode} = useColorScheme()
    const handleChange = (event) => {
        setMode(event.target.value);
    }
    return (
        <FormControl size={'small'} sx={{minWidth: '120px'}}>
            <InputLabel
                id={'label-select-dark-light-mode'}
                sx={{
                    color: 'white',
                    '&.Mui-focused': {color: 'white'}
                }}
            >Mode</InputLabel>
            <Select
                labelId={'label-select-dark-light-mode'}
                id={'select-dark-light-mode'}
                value={mode}
                label={'Mode'}
                onChange={handleChange}
                sx={{
                    color: 'white',
                    '.MuiOutlinedInput-notchedOutline': {borderColor: 'white'},
                    '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: 'white'},
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: 'white'},
                    '.MuiSvgIcon-root': {color: 'white'}
                }}
            >
                <MenuItem value={'light'}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <LightMode fontSize={'small'}/> Light
                    </Box>
                </MenuItem>
                <MenuItem value={'dark'}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <DarkMode fontSize={'small'} /> Dark
                    </Box>
                </MenuItem>
                <MenuItem value={'system'}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <SettingsBrightnessIcon fontSize={'small'}/> System
                    </Box>
                </MenuItem>
            </Select>
        </FormControl>
    )
}

export default ModeSelect