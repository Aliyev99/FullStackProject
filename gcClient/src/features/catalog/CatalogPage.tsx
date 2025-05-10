import { Backdrop, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { fetchFilters, fetchProductsAsync, productSelectors, setProductParams } from "./catalogSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";
import AppPagination from "../../app/components/AppPagination";
import ProductList from "./ProductList";
import FilterHeader from "./filter/filterHeader";
import FilterWindow from "./filter/filterWindow";

import { Link } from "react-router-dom";

interface Props {
    productType: string;
}

export default function CatalogPage({ productType }: Props) {

    const dispatch = useAppDispatch();
    const { metaData, filters, productsLoaded, filtersLoaded, productParams } = useAppSelector(state => state.catalog)
    const products = useAppSelector(productSelectors.selectAll)

    const [filterOpen, setFilterOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProductsAsync(productType))
    }, [productType]);


    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync(productType))
    }, [dispatch, productsLoaded]);


    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [dispatch, filtersLoaded]);


    if (!filtersLoaded) return <LoadingComponent />

    // var toggleBackdrop = () => {
    //     let element = document.getElementsByClassName('m-menu-backdrop')[0];
    //     element.classList.toggle('show-backdrop');
    // }

    // console.log(products)

    console.log(filterOpen)
    return (

        <Box>
            <Box padding='30px 30px 0 30px' bgcolor='#F4F3F4'>
                <Link to='/jewelry/braceletes'>Jewelry</Link>
            </Box>
            <FilterHeader openFilters={() => {
                setFilterOpen(true);
                // toggleBackdrop();
                document.body.style.overflow = 'hidden';
            }} />
            <Box width='100%'>

                    {/* <div className="m-menu-backdrop" onClick={() => {
                        setFilterOpen(false);
                        toggleBackdrop();
                        document.body.style.overflow = 'visible';
                    }}></div> */}
            <Backdrop open={filterOpen} sx={{zIndex: '2001'}} onClick={() => {
                setFilterOpen(false);
                document.body.style.overflow = 'visible';}}>
            </Backdrop>
                <FilterWindow filterOpen={filterOpen} closeFilter={() => {
                    setFilterOpen(false); 
                    document.body.style.overflow = 'visible';}}/>
            </Box>
            {/* <Backdrop sx={{ top: '75px' }} open={filterOpen}  >
                <FilterWindow />
            </Backdrop> */}
            <Box >
                <ProductList jeweleries={products}/>
                {metaData &&
                    <AppPagination metaData={metaData} onpageChange={(page) => dispatch(setProductParams({ pageNumber: page }))} />
                }
            </Box>
        </Box>
    )

}