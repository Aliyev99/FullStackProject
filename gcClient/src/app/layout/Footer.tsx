import { Facebook, Instagram } from "@mui/icons-material";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {


    const helpRows = [
        { text: '+994-99-739-39-96', path: '/'}, 
        { text: 'jaspejewelery@gmai.com', path: '/'}, 
        { text: 'Returns/Exchanges', path: '/'}, 
        { text: 'FAQ/Contact Us', path: '/'}, 
        { text: 'Afterpay', path: '/'}
    ];

    const shopRows = [
        { text: 'Bracelets', path: '/'}, 
        { text: 'Rings', path: '/'}, 
        { text: 'Earings', path: '/'}, 
        { text: 'Complects', path: '/'}, 
        { text: 'Gift Cards', path: '/'},
        { text: 'Refer a friend', path: '/'}
    ];

    const companyRows = [
        { text: 'Our Stores', path: '/'}, 
        { text: 'Our Story', path: '/'}, 
        { text: 'Our Materials', path: '/'}, 
        { text: 'Sustanability', path: '/'}, 
        { text: 'Investors', path: '/'},
        { text: 'Partnerships', path: '/'},
        { text: 'Careers', path: '/'},
        { text: 'Community Offers', path: '/'},
        { text: 'Product Testing', path: '/'},

    ];
    return (
        <footer className="py-5">
            <Container className="p-0" >
                <Grid container >
                    <Grid item xs={3}>
                        <List>
                            <ListItem sx={{ paddingLeft: '0', marginBottom: '10px' }}>
                                <Typography fontWeight='bold'>HELP</Typography>
                            </ListItem>
                            {helpRows.map((row, index) => (
                                <ListItem sx={{ paddingLeft: '0' }} key={index}><Link style={{textDecoration: 'none', color: 'white'}} to={row.path}>{row.text}</Link></ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={3}>
                        <List>
                            <ListItem sx={{ paddingLeft: '0', marginBottom: '10px' }}>
                                <Typography fontWeight='bold'>SHOP</Typography>
                            </ListItem>
                            {shopRows.map((row, index) => (
                                <ListItem sx={{ paddingLeft: '0' }} key={index}><Link style={{textDecoration: 'none', color: 'white'}} to={row.path}>{row.text}</Link></ListItem>
                            ))}
                        </List>
                    </Grid>

                    <Grid item xs={3}>
                        <List>
                            <ListItem sx={{ paddingLeft: '0', marginBottom: '10px' }}>
                                <Typography fontWeight='bold'>COMPANY</Typography>
                            </ListItem>
                            {companyRows.map((row, index) => (
                                <ListItem sx={{ paddingLeft: '0' }} key={index}><Link style={{textDecoration: 'none', color: 'white'}} to={row.path}>{row.text}</Link></ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>

                <Box className="my-5" display='flex' alignItems='center'>
                    <Typography>Follow Jaspe: </Typography>
                    <List sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}} >
                        <ListItem>
                            <Instagram />
                        </ListItem>
                        <ListItem>
                            <Facebook />
                        </ListItem>
                        <ListItem>
                            
                        </ListItem>

                    </List>
                </Box>

                <Typography textAlign='center' fontSize='small'>© 2024 Allbirds, Inc. All Rights Reserved. <Link className="footerLink" to='/'>Terms</Link>, <Link className="footerLink" to='/'>Privacy</Link> & <Link className="footerLink" to='/'>Accessibility</Link></Typography>

            </Container>
        </footer>


    )
}