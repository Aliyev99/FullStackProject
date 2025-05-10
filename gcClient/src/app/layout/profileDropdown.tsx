import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './profileDropdown.css'
import { AccountCircle, Login } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logoutAsync } from "../../features/account/accauntSlice";


export default function ProfileDropdown() {
    const navigate = useNavigate();
    const {user} = useAppSelector(state => state.accaunt);
    const dispatch = useAppDispatch();

    async function handleLogout(){
        try {
            await dispatch(logoutAsync())
        } catch (error: any) {
            console.log(error)
        }
        
    }

    return (
        <Box component={Paper}  maxWidth='100%' minWidth='120px' p='10px' 
            position='absolute' right='-39px' top='51px' zIndex='100001' borderRadius='0'
            display='flex' flexDirection='column' alignItems='start'
            onClick={(event) => event.stopPropagation()}>
            <Button fullWidth sx={{ 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                textTransform: 'capitalize', color: 'black'
                }} onClick={() => navigate('/profile')}>
                <Typography>Profile</Typography>
                <AccountCircle />
            </Button>

            <Button fullWidth sx={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                textTransform: 'capitalize', color: 'black'
                }} onClick={() => navigate('/login')}>
                Sign Up
                <Login color='success' />
            </Button>
            {user && <Button sx={{ 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }} fullWidth color='error' 
            onClick={handleLogout}>Logout</Button>}
            
        </Box>
    )
}