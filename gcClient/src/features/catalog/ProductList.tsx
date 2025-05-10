import { Grid } from "@mui/material"
import ProductCard from "./productCard/ProductCard"

interface Props {
    jeweleries: Jewelry[] | null
}

export default function ProductList({ jeweleries }: Props) {
    // console.log(jeweleries)
    return (
        <Grid container>
            {jeweleries?.map((jewelry) => (
                <Grid item xs={3}  key={jewelry.id}  position='relative'>
                    <ProductCard jewelry={jewelry} />
                    
                </Grid>
            ))}
        </Grid>


    )


}