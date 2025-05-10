import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import '../../../app/components/productCard.css'

interface Props {
    jewelry: Jewelry
}
export default function ProductCard({ jewelry }: Props) {

    const { id, name, images, price, materials, gemstones, sizes } = jewelry;
    const [activeIndex, setActiveIndex] = useState(0);
    // const [selectedSize, setSelectedSize] = useState('');

    // const { user } = useAppSelector(state => state.accaunt)
    // const dispatch = useAppDispatch();
    // const navigate = useNavigate();
    // const location = useLocation();
    // const [action, setAction] = useState<any>();
    const handdleBack = (e: any) => {
        e.preventDefault();
        setActiveIndex((prev) => prev - 1 < 0 ? images.length - 1 : prev - 1)
    }

    const handdleNext = (e: any) => {
        e.preventDefault();
        setActiveIndex((prev) => prev + 1 >= images.length ? 0 : prev + 1)
    }


    // const handleAdd = () => {
    //     if (!user)
    //         {
    //             navigate('/login', { state: { from: location } });
    //             addEventListener('test', () => {

    //             })
    //         }
    //     else
    //         dispatch(addBasketItemAsync({ productId: id, size: selectedSize, quantity: 1 }));
    // }

    return (
        <Link to={`${id}`} className="m-card">
            <Box position='relative'>
                <img src={images[activeIndex].url} alt={name} className="m-card-img" />

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