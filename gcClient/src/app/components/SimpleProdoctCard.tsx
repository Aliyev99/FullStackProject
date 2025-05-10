import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import './productCard.css'

interface Props {
    id: number;
    image: Image;
    name: string;
    price: number;
}
export default function SimpleProductCard({ id, image, name, price }: Props) {



    return (
        <Link to={`${id}`} className="m-card">
            <Box position='relative'>
                <img src={image.url} alt={name} className="m-card-img" />

            </Box>

            {/* <button className="m-card-back-btn" onClick={handdleBack}>{'<'}</button>
            <button className="m-card-next-btn" onClick={handdleNext}>{'>'}</button> */}
            <Box height='150px' display='flex' flexDirection='column' justifyContent='end'>
                <Typography fontFamily='serif' fontSize='medium' sx={{ my: '5px' }}>{name}</Typography>
                <Typography fontFamily='cursive' fontSize='small'>${price}</Typography>
            </Box>



        </Link>
    )
}