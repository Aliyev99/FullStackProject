import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { Grid, Typography } from "@mui/material";
import { fetchProductAsync, productSelectors } from "../catalogSlice";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ProductImages from "./productImages";
import ProductDescription from "./productDescription";
import Details from "./details";
import './productDetails.css'
import DiscoverMore from "./discoverMore";
import Recomended from "./recomended";


// function GetPath() {
//     let arr = window.location.pathname.split('/')[2];
//     arr = arr.substring(0, arr.length - 1)
//     return arr.replace(arr.charAt(0), arr.charAt(0).toUpperCase());
// }



export default function ProductDetails() {
    const { status } = useAppSelector(state => state.catalog)
    const { id } = useParams<string>();
    const product = useAppSelector(state => productSelectors.selectById(state, parseInt(id!)));
    const dispatch = useAppDispatch();
    const pathName = window.location.pathname;
    const path = pathName.substring(1, pathName.lastIndexOf('/'))

    // console.log(path)


    useEffect(() => {

        if (!product && id) dispatch(fetchProductAsync({ id }))

    }, [id, dispatch])
    console.log(product)
    product && console.log(product.type)


    if (status.includes('pending')) return <LoadingComponent />

    if (product)
        // setActiveImg(product?.images[0]);
        return (
            <>

                <Grid container position='relative' minHeight='100vh'>
                    <Grid item xs={9} minHeight='100%' bgcolor='#e7e6e6'>
                        <ProductImages images={product.images} />


                    </Grid>
                    <Grid item xs={3} pt='150px' bgcolor='#e7e6e6' >
                        <ProductDescription product={product} path={path} />
                    </Grid>


                </Grid>

                {/* <DropdownComponent title="Description" content={product.description} /> */}
                <Details product={product} />

                <Grid container>
                    <Grid item xs={6} p='100px' display='flex' flexDirection='column' justifyContent='center'>
                        <Typography> Complimentary Bvlgari signature box with every order</Typography>
                        <Typography>Every creation is carefully handcrafted and delivered in iconic Bvlgari packaging, inspired by the splendour of the Eternal City.
                            Designed to preserve Bvlgari's magnificent creations over time, the packaging contains no harmful chemicals and is made from paper sourced from sustainable forests, wood fibre, 100% pure silk and natural latex from rubber trees.



                            Note that the box size and design may vary slightly depending on the product purchased.</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <video src="/videos/collane.mp4" preload="auto" autoPlay width='100%' height='100%'></video>

                    </Grid>

                    <DiscoverMore />
                    <Recomended id={parseInt(id!)} name={product.name} type={product.type} />
                </Grid>
            </>
        )
}