import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function DiscoverMore() {
    return (
        <div className="imgDiv">
            <Box width='50%' p='30px' position='absolute' bottom='20px'>
                <Typography variant="h3" color='white'>Our commitment for a magnificent future</Typography>
                <Typography color='white' my='20px' fontSize='18px'>Bvlgari is committed to advancing its ethical, social and environmental performance through the constant improvement of its activities.</Typography>
                <Link to='/' className="imgDiv-link">Discover more</Link>
            </Box>
        </div>
    )
}