import { Favorite, Person, ShoppingCart } from "@mui/icons-material";
import { Backdrop, Badge, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../store/store";
import ProfileDropdown from "./profileDropdown";
import { Button } from "react-bootstrap";
import './header.css'





export default function Header() {
    const [showProfile, setShowProfile] = useState(false);

    function useOutsideClickChecker(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: MouseEvent) {

                if (ref.current && !ref.current.contains(event.target) && (showProfile === true)) {
                    setShowProfile(false)
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {

                document.removeEventListener("mousedown", handleClickOutside);
            };

        }, [ref, showProfile, setShowProfile])
    }

    const jewelryOnClicked = () => {

        setOpen(prev => !prev);
        document.body.style.overflow == 'hidden' ? document.body.style.overflow = 'visible' : document.body.style.overflow = 'hidden';
    }



    const wrapperRef = useRef(null);
    useOutsideClickChecker(wrapperRef);


    const { basket } = useAppSelector(state => state.basket);

    const [open, setOpen] = useState(false);

    const navRef = useRef<HTMLElement>(null);

    return (
        // ref={wrapperRef}
        <nav className="px-5 py-4 myNav" >
            <div className="m-nav" >
                <ul className="m-navLeftList">
                    <li>
                        <button className="m-navBtn" onClick={jewelryOnClicked}>LEWELRY</button>
                    </li>
                    <li>
                        <Link to={'/profile'} className="m-navLink">ABOUT US</Link>
                    </li>
                </ul>
                <Link to='/' className="m-navLink">
                    <Typography className="m-logo" fontWeight='bold' fontSize='20px' textTransform="uppercase" color='#003334'>Jaspe</Typography>
                </Link>

                <div className="m-navRightList">
                    <Box position='relative' ref={wrapperRef}>
                        <Box component={Button} sx={{
                            backgroundColor: 'transparent', border: 'none', ':hover': {
                                bgcolor: 'transparent'
                            },
                        }} position='relative' onClick={(event: MouseEvent) => { setShowProfile((prev) => !prev); event.stopPropagation() }}>
                            <Person className="m-navIcons" />

                        </Box>

                        {showProfile && <ProfileDropdown />}
                    </Box>

                    <Link to="/basket">
                        <Favorite className="m-navIcons mx-5" />
                    </Link>
                    <Link to="/basket" onClick={() => setOpen(false)}>
                        {basket && basket?.items.length ?
                            (<Badge
                                badgeContent={basket?.items.reduce((sum, item) => sum + item.quantity, 0)} color="secondary">
                                <ShoppingCart className="m-navIcons" />
                            </Badge>) : <ShoppingCart className="m-navIcons" />
                        }
                    </Link>
                </div>
            </div>
            {/* <Box ></Box> */}
                <Backdrop ref={navRef} sx={{ top: '75px' }} open={open} onClick={() => setOpen(false)}>
                    <NavDropdown container={navRef.current!} openDropdown={open} closeHeader={() => 
                        { setOpen(false); 
                        document.body.style.overflow = 'visible';
                        }} />
                </Backdrop>

        </nav>

    )
}