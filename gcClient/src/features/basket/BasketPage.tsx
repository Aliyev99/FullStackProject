import { Grid, List } from "@mui/material";
import { useAppSelector } from "../../app/store/store"
import BasketItem from "./BasketItem";
import Summary from "./Summary";

export default function BasketPage() {

    const { basket } = useAppSelector(state => state.basket);
    
    if (basket == null || basket?.items == undefined) return <h1>No items!</h1>
    
    const subtotal = basket?.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (

        <Grid container spacing={3}>
            <Grid item xs={9}>
                <List sx={{p: 0}}>
                    {basket?.items.map((item, index) => (
                        <BasketItem key={index} item={item} index={index}/>
                    ))}
                </List>
            </Grid>
            <Grid item xs={3}>
                <Summary subtotal={subtotal} deliveryFee={10}/>
            </Grid>


        </Grid>
    )
}