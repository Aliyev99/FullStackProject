import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { GetPath } from "../../../app/util/util";
import './filter.css'
import FilterButton from "./filterButton";
import { setProductParams } from "../catalogSlice";
import { useState } from "react";
interface Props {
    openFilters: () => void;
}

export default function FilterHeader({ openFilters }: Props) {
    const { metaData, productParams } = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch();
    // console.log(metaData)
    const [count, setCount] = useState(false);
    return (

        <Box p='20px' width='100%' zIndex='10000'
            display='flex' alignItems='center' justifyContent='space-between' bgcolor='#F4F3F4'>
            <Box>
                <Box position='relative'>
                    <Typography fontWeight={400} lineHeight='1' fontSize='48px'>{GetPath()}s</Typography>
                    <Box fontSize='14px' fontWeight='300' position='absolute' top='-5px' right='-10px'>
                        {metaData?.totalItems}
                    </Box>


                    <Box display='flex' mt='10px'>
                        {productParams.brands.length > 0 &&
                            <FilterButton deleteFilter={(items: string[]) => dispatch(setProductParams({ brands: items }))}
                                title='Brands' selects={productParams.brands} />}

                        {productParams.gemstones.length > 0 &&
                            <FilterButton deleteFilter={(items: string[]) => dispatch(setProductParams({ gemstones: items }))}
                                title='Gemstones' selects={productParams.gemstones} />}

                        {productParams.materials.length > 0 &&
                            <FilterButton deleteFilter={(items: string[]) => dispatch(setProductParams({ materials: items }))}
                                title='Materials' selects={productParams.materials} />}
                        {/* {productParams.gemstones.length > 0 &&
                        <FilterButton deleteFilter={(items: string[]) => dispatch(setProductParams({ gemstones: items }))}
                            title='Gemstone' selects={productParams.gemstones} />} */}
                    </Box>
                
                </Box>
            </Box>
            <button className="filter-btn" onClick={openFilters}>Filter & Sorting</button>
        </Box>
    )
}