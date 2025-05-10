import { Box, Typography } from "@mui/material";
import MyLoadingButton from "../../../app/components/MyLoadingButton";
import { EmailOutlined, PersonPinOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface Props {
    product: Product;
    path: string;
}

export default function ProductDescription({ product, path }: Props) {
    const pathes = path.split('/');
    let path1: string = '';
    const linkResult = [];
    for (let index = 0; index < pathes.length; index++) {
        path1 += '/' + pathes[index]; 
        linkResult.push(
            <Link to={path1} key={index} className="m-pathLink">{'/' + pathes[index]}</Link>
        )
    }

    return (
        <Box position='sticky' top='100px' maxWidth='90%' minWidth='50%'>
                
                {/* {pathes.map((path, index) => (
                    <Link to={`/${path}`}>/{path}</Link>
                ))} */}
                <Box mb='20px'>
                    {linkResult}
                </Box>
                <Typography mb='5px' variant="h4" fontFamily='serif'>{product.name}</Typography>
                <Typography fontFamily='cursive' mb='5px'>${(product.price / 100).toFixed(2)}</Typography>
                <Typography fontFamily='serif' fontSize='16px' mb='10px'>Price may vary based on selected size.</Typography>
                <Typography fontFamily='serif' fontSize='20px' mb='25px'>{product.title}</Typography>
                {product.sizes &&

                    <select className="m-selectBox mb-2">
                        {product.sizes.map((item, index) => (
                            <option value={item.size} key={index} style={{ padding: '10px' }}>Size: {item.size}</option>
                        ))}
                    </select>
                }


                {/* <LoadingButton fullWidth sx={{
                        marginTop: '30px', backgroundColor: 'black', color: 'white', border: 1,
                        fontFamily: 'serif', fontWeight: 600, letterSpacing: '2px', p: '10px',
                        ':hover': {
                            backgroundColor: 'white',
                            color: 'black'
                        }
                    }}>Add To Cartggh
                    </LoadingButton> */}

                <MyLoadingButton loading={false} text="Add To Cart" />
                <MyLoadingButton bgColor="transparent" color='black' hoverBg="black" hoverColor="white" loading={false} text='Contact a Client Advisor' />
                <Box display='flex' alignItems='center' mt='20px'>
                    <PersonPinOutlined sx={{ fontSize: '30px', marginRight: '10px' }} />
                    <Typography fontSize='18px'>Contact us</Typography>
                </Box>
                <Box display='flex' alignItems='center' mt='10px'>
                    <EmailOutlined sx={{ fontSize: '30px', marginRight: '10px' }} />
                    <Typography fontSize='18px'>Share with someone special</Typography>
                </Box>
                <Box height='30px'></Box>
        </Box>
    )
}