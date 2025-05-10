import { Box, Slide, Typography } from "@mui/material";
import DropdownComponent from "../../../app/components/DropdownComponent";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import CheckboxButton from "../../../app/components/CheckboxButtonComponent";
import { setProductParams } from "../catalogSlice";
import CheckBoxWithImgComponent from "../../../app/components/CheckBoxWithImgComponent";
import RadioButtonComponent from "../../../app/components/RadioButtonComponent";
import { Close } from "@mui/icons-material";

interface Props {
    filterOpen: boolean;
    closeFilter: () => void;
}

export default function FilterWindow({ filterOpen, closeFilter }: Props) {

    // const [sortByIsOpen, setSortByIsOpen] = useState(false);
    const { filters, productParams } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    const sortOptions = [
        { label: 'Alphabetical', value: 'name' },
        { label: 'Price - High to low', value: 'price' },
        { label: 'Price - Low to high', value: 'priceDesc' }
    ]

    return (
        <Slide direction='left' in={filterOpen}>
            <Box width='512px' position='fixed' right='0' top={0} bottom={0}
                zIndex='100000' height='100vh' bgcolor='#F3F2F3'>
                <Box width='100%' p='40px' display='flex' alignItems='center' justifyContent='space-between'>
                    <Typography fontSize='25px' fontFamily='sans-serif'>Filter and Sorting</Typography>
                    <div className="m-closeBtn" onClick={closeFilter}><Close sx={{fontSize:'40px'}}/></div>
                </Box>
                <Box>
                    <DropdownComponent title='Sort By' >
                        
                            <RadioButtonComponent options={sortOptions} selectedValue={productParams.orderBy} onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))}/>

                    </DropdownComponent>
                    <DropdownComponent title='Brands' >
                        <Box>
                            {filters?.brands && <CheckboxButton items={filters?.brands} checked={productParams.brands} onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))} />}
                        </Box>
                    </DropdownComponent>

                    <DropdownComponent title='Materials' >
                        <Box>
                            {filters?.materials && <CheckboxButton items={filters?.materials} checked={productParams.materials} onChange={(items: string[]) => dispatch(setProductParams({ materials: items }))} />}
                        </Box>
                    </DropdownComponent>
                    <DropdownComponent title='Gemstones' >
                        <Box p='40px'>
                            {filters?.gemstones && <CheckBoxWithImgComponent
                                items={filters?.gemstones}
                                checked={productParams.gemstones}

                                onChange={(items: string[]) => dispatch(setProductParams({ gemstones: items }))} />}
                        </Box>
                    </DropdownComponent>
                    {/* <DropdownComponent title='Brands' >
                        <Box>
                            {filters?.materials && <CheckboxButton items={filters?.brands} checked={productParams.brands} onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))} />}
                        </Box>
                    </DropdownComponent> */}


                </Box>
            </Box>
        </Slide>
    )
}