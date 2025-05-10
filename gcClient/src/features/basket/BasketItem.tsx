import { Remove, Add, Delete } from "@mui/icons-material";
import { ListItem, Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import { BasketItem } from "../../app/models/Basket";
import { Link } from "react-router-dom";

// import { BasketItem } from "../../app/models/Basket";
interface Props {
    item: BasketItem;
    index: number;
}

export default function BasketItemComponent({ item, index }: Props) {
    const dispatch = useAppDispatch();
    const { status } = useAppSelector(state => state.basket);

    return (
        <ListItem key={index} sx={{
            display: 'flex', justifyContent: 'space-between',
            border: '1px solid lightgrey', borderRadius: '10px',
            p: '20px', marginBottom: '20px'
        }}>
            <Link to={`/jewelry/rings/${item.productId}`} style={{width: '50%', textDecoration: 'none', color: 'black'}}>
                <Box display='flex' alignItems='center' width='100%'>
                    <img style={{ width: '20%', backgroundColor: '#F2F2F2' }} src={item.picture} alt={item.name} />
                    <Box ml='10px'>
                        <Typography fontFamily='serif' fontSize='14px' fontWeight='600'>{item.name}</Typography>
                        <Typography>{item.title}</Typography>
                        <Typography fontFamily='cursive' fontWeight='400' color='#003334'>Size: {item.selectedSize}</Typography>

                    </Box>
                </Box>
            </Link>

            <Box display='flex'>

                <LoadingButton sx={{
                    color: '#003334', backgroundColor: '#F2F2F2',
                    borderTopRightRadius: 0, borderBottomRightRadius: 0
                }} onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, size: item.selectedSize, quantity: 1, name: '' }))}
                    loading={status === ('pendingRemoveItem' + item.productId + item.selectedSize)}>
                    <Remove />
                </LoadingButton>

                <Box display='flex' alignItems='center' p='7px' paddingX='20px' borderBottom='1px solid #F2F2F2' borderTop='1px solid #F2F2F2'>
                    <Typography>{item.quantity}</Typography>
                </Box>

                <LoadingButton sx={{
                    color: '#003334', backgroundColor: '#F2F2F2',
                    borderTopLeftRadius: 0, borderBottomLeftRadius: 0
                }} onClick={() => dispatch(addBasketItemAsync({ productId: item.productId, size: item.selectedSize, quantity: 1 }))}
                    loading={status === ('pendingAddItem' + item.productId + item.selectedSize)}>
                    <Add />
                </LoadingButton>

            </Box>
            {/* <Box display='flex' flexDirection='column'> */}
            {/* <Typography textAlign='center' fontFamily='cursive' fontWeight='400' color='#003334'>Size</Typography> */}
            {/* <SelectComponent items={sizes} selectedValue={item.selectedSize} onChange={(newSize: string) => item.selectedSize = newSize}/> */}
            {/* <Typography textAlign='center' fontFamily='cursive' fontWeight='400' color='#003334'>{item.selectedSize}</Typography> */}

            {/* </Box> */}
            <Typography textAlign='center' fontFamily='cursive' fontWeight='400' color='#003334'>${item.price}</Typography>

            <LoadingButton
                loading={status === ('pendingRemoveItem' + item.productId + item.selectedSize + 'del')} sx={{ color: '#ab1b1b' }}
                onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, size: item.selectedSize, quantity: item.quantity, name: 'del' }))}>
                <Delete />
            </LoadingButton>


        </ListItem>
    )
} 