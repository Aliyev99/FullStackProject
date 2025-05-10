import { Typography, Box } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxesStacked, faDiamond } from "@fortawesome/free-solid-svg-icons";
import { Diamond } from "@mui/icons-material";
import { AddComma } from "../../../app/util/util";
import { Container } from "react-bootstrap";
interface Props {
    product: Jewelry;
}
export default function Details({ product }: Props) {

    return (
        <Container style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20vh', marginTop: '20vh'}}>
            
            <Box width='45%'>
                <Typography variant="h5" >Description</Typography>
                <Typography fontFamily='sans-serif' fontSize='15px'>{product.description}</Typography>
            </Box>

            <Box width='45%'>
                <Typography variant="h5">Details</Typography>
                <Box display='flex' alignItems='center'>
                    <Typography my='10px' mr='20px' fontSize='15px' fontFamily='sans-serif'>Ref.: {product.ref}</Typography>
                    <FontAwesomeIcon icon={faBoxesStacked} />
                    <Typography fontFamily='sans-serif' ml='10px'>Materials: </Typography>
                    {product.materials.map((color, index) =>
                        <Typography key={index} mr='3px' fontFamily='sans-serif'>{color}{AddComma(index, product.materials.length)}</Typography>
                    )}
                </Box>
                
                <Box display='flex' alignItems='center'>
                    
                    {product.diamondCarat && <>
                        <Diamond />
                        <Typography ml='10px' mr='20px' fontFamily='sans-serif'>Diamond Carat: {product.diamondCarat}</Typography>
                    </>}

                    <FontAwesomeIcon icon={faDiamond} />
                    <Typography mr='5px' ml='10px' fontFamily='sans-serif'>Gemstone: </Typography>
                    {product.gemstones.length ?
                        product.gemstones.map((gemstone, index) => (
                            <Typography key={index} mr='3px' fontFamily='sans-serif'>{gemstone.name}{AddComma(index, product.gemstones.length)}</Typography>
                        )) : <Typography fontFamily='sans-serif'>none</Typography>}

                </Box>
            </Box>


        </Container>
    )
}