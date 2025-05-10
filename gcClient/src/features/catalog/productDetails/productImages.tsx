import { Box } from "@mui/material";
import { Link } from 'react-scroll';

interface Props {
    images: Image[];
}

export default function ProductImages({ images }: Props) {


    // const handdleImgChange: any = (index: number) => {
    //     setActiveImg(images[index]);
    // }

    return (
        <Box display='flex' width='100%'>

            <ul className="details-img-list">
                {images.map((image, index) => (
                    image.isCarouselImg &&
                    <li key={index} className="details-img-list-item" >
                        <Link to={'image' + (index + 1)} type="button" className="prodcutDetails-imgBtn" >
                            <img src={image.url} width={'100%'} height={'100%'}
                                style={{ objectFit: 'cover', backgroundColor: '#e7e6e6' }} />
                        </Link>

                    </li>

                ))}


            </ul>
            <Box position='relative' width='90%' mb={5}>

                {images.map((image, index) => (
                    image.isCarouselImg &&
                    <Box key={index} id={'image'+ (index+1)} display='flex' height='100vh' width='100%' alignItems='center' justifyContent='center'>

                        <img src={image.url} className="productDetail-active-img" />
                    </Box>

                ))}



            </Box>
        </Box>
    )
}