// import { Bolt } from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";

interface Props {
    subtotal: number;
    deliveryFee: number;
}


export default function Summary({ subtotal, deliveryFee }: Props) {
    return (
        <Box>
            <Box border='1px solid lightgrey' borderRadius='10px' padding='20px'>
                
                <Typography variant="h5" mb='30px' textAlign='center'>Total Order</Typography>
                <Box display='flex' justifyContent='space-between'>
                    <Typography>Subtotal</Typography>
                    <Typography fontFamily='cursive'>${subtotal}</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between' my='10px'>
                    <Typography>Delivery fee</Typography>
                    <Typography fontFamily='cursive'>${deliveryFee}</Typography>
                </Box>
                <Typography fontSize='13px' mb='11px' color='grey'>*Orders over $10,000 qualify for free delivery</Typography>
                <Divider sx={{ backgroundColor: 'black' }} />
                <Box display='flex' justifyContent='space-between' mt='10px' color='#003334'>
                    <Typography fontWeight={500}>Total</Typography>
                    <Typography fontWeight='bold' fontFamily='cursive'>${subtotal + deliveryFee}</Typography>
                </Box>
            </Box>
            <Button fullWidth sx={{backgroundColor: '#003334', color: 'white', mt: '15px', border: '1px solid #003334',':hover': {
                color: '#003334',
                backgroundColor: 'transparent'
            }}}>Checkout</Button>
        </Box>

    )

}