import { Box, Container, Typography } from "@mui/material";
import './login.css'
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";



export default function Sign(){

    const location = useLocation();
    const [active, setActive] = useState(location.pathname === '/login')
    

    return(
        <Container>
        <Typography variant="h3" textAlign='center' mb='20px'>Please sign in or register</Typography>
        <Typography fontWeight='200' textAlign='center'>Create your account to be part of the Jaspe world, discover our new collections, receive news from the maison.</Typography>
        <Container maxWidth='sm' sx={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', mt: '6rem'
        }}>
            <Box display='flex' flexDirection='column' width='80%'>
                <Box display='flex'>
                    <Link to={'login'} className={active ? 'accaunt-btn m-active':'accaunt-btn'} onClick={() => setActive(true)}>Login</Link>
                    <div className="m-underline"></div>
                    <Link to={'register'} className={!active ? 'accaunt-btn m-active':'accaunt-btn'} onClick={() => setActive(false)}>Register</Link>
                </Box>
                <>
             <Outlet/>
        </>
            </Box>


        </Container>
    </Container>

        
    )
}