import { Box, Grid, Slide, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import NavDropdownList from "./NavDropdownList";
import { Container } from "react-bootstrap";
import CarouselComponent from "./Carousel";

interface Props {
    closeHeader: () => void;
    openDropdown: boolean;
    container: HTMLElement;
}

interface Item {
    logo: string;
    img: string;
    link: string;
}



export default function NavDropdown({ closeHeader, openDropdown, container}: Props) {

    console.log(container)
    const items: Item[] = [
        {logo: '/images/bvlgariLogoLetter.png', img: "/images/bvlgariImg.avif", link: '/brands/bvlgari'},
        {logo: '/images/louisLogoLetter.png', img: "/images/louisImg2.jpg", link: '/brands/bvlgari'}
    ]
    return (
        <Slide in={openDropdown} direction='down' container={container}
            onClick={(event) => event.stopPropagation()}>
            <div className="m-nav-dropdown m-dropdown">
                <Container style={{ height: '100%' }}>
                    <Box width='100%' display='flex' alignItems='center' justifyContent='space-between' height='100%'>
                        <Box display='flex' width='60%' alignItems='center' height='100%'>
                            <Grid item xs={7}>
                                <Box width='180px' display='flex' alignItems='center' justifyContent='space-between'>
                                    <Typography fontSize='16px' fontWeight='bold'>BY CATEGORY</Typography>
                                    <Typography fontSize='16px' fontWeight='bold'>|</Typography>
                                    <Typography component={Link} to='jewelry/all' color='black'>View All</Typography>
                                </Box>

                                <NavDropdownList closeHeader={closeHeader} />
                            </Grid>
                        </Box>
                        <Box display='flex' width='30%' justifyContent='center' alignItems='center' height='100%'>
                            
                            <CarouselComponent items={items} />
                        </Box>

                    </Box>
                </Container>
            </div>
        </Slide>
    )
}