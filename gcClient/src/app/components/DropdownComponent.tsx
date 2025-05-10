import { Box, Button, Collapse, Typography } from "@mui/material";
import { ReactElement, useState } from "react";

interface Props {
    title: string;
    children: ReactElement
}



export default function DropdownComponent({ title, children }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
   
    const handdleDropdown = () => {
        // console.log('hi')
        setIsOpen((prev) => !prev);
        setRotate((prev) => !prev);
    }

    const [rotate, setRotate] = useState(false);
    
    return (
        <Box id="mDetailsDropdown"    className="m-details-dropdown"
            sx={{
                borderTop: '1px solid rgb(211, 212, 213)',
                borderBottom: '1px solid rgb(211, 212, 213)',
            }}>
            <Button sx={{
                px: '30px',
                py: '25px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'black', ':hover': {
                backgroundColor: 'transparent'
                }
            }} className="m-drodown-arrow" 
                disableRipple fullWidth onClick={handdleDropdown}>
                
                <Typography fontSize='13px' fontWeight='500'>{title}</Typography>

                <span className={rotate ? 'm-arrow rotate' : 'm-arrow'} id="m-arror-spn" ></span>
            </Button>
            <Collapse in={isOpen}>
                {children}
            </Collapse>

        </Box>
    )
}