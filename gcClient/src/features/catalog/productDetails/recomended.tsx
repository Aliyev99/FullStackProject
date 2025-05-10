import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/store/store";
import { fetchRecomendedProductsAsync } from "../catalogSlice";
import SimpleProductCard from "../../../app/components/SimpleProdoctCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Virtual } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination'
import SlideNextButton from "./SlideNextButton";
import SlidePrevBtn from "./slidePrevBtn";
import { Brightness7Rounded, Circle } from "@mui/icons-material";
import icon from '../../../assets/starİcon.png'


interface Props {
    id: number;
    name: string;
    type: string;
}

export default function Recomended({ id, type, name }: Props) {
    const dispatch = useAppDispatch();
    const [recomendeds, setRecomendeds] = useState<Product[]>();
    console.log(type + name)

    useEffect(() => {
        const fetchData = async () => {
            const data = await dispatch(fetchRecomendedProductsAsync({ id, name, type }));
            setRecomendeds(data.payload as Product[]);
        }

        fetchData();

    }, [dispatch, setRecomendeds])

    let slides = [];
    if (recomendeds?.length! > 4) {
        slides.push(recomendeds?.slice(0, 4));
        slides.push(recomendeds?.slice(4, recomendeds.length))
    }
    else slides.push(recomendeds)


    return (


        <Box pb='150px' pt='80px' bgcolor='#F3F2F3' width='100%'>
            <Box px='40px' pb='60px'
                display='flex' alignItems='center' justifyContent='space-between'>
                <Typography variant="h4" fontWeight='300'>You may also like</Typography>
                <Box display='flex' width='120px' justifyContent='space-between'>
                    <SlidePrevBtn />
                    <SlideNextButton />
                </Box>
            </Box>
            <Swiper slidesPerView={1}
                pagination={{
                    clickable: true,
                    // el: '.swiper-pagination',
                    // type: 'bullets',
                    // bulletActiveClass: '.active-bullet',
                    renderBullet: function(index, className) {
                        console.log(className)
                        return '<span class="' + className + '"><img class="pagination-bullet"/></span>';
                    }
                    // bulletClass: '.swiper-img',
                    // bulletActiveClass: '.swiper-active-img'
                    
                    
                }}

                navigation={{
                    nextEl: '.m-next-btn',

                    prevEl: '.m-prev-btn'
                }}
                virtual={true}
                scrollbar={{ draggable: true }}
                modules={[Navigation, Pagination, Scrollbar, Virtual]} >

                {slides?.map((slide, index) => (

                    <SwiperSlide key={index}>
                        <Grid container >



                            {slide?.map(({ id, images, price }, index) => (
                                <Grid item xs={3}>

                                    <SimpleProductCard id={id} image={images[0]} name={name} price={price} key={index} />
                                </Grid>
                            ))}
                        </Grid>

                    </SwiperSlide>
                    // </Box>
                ))}
            </Swiper>

            {/* <Box className="swiper-pagination" position='relative'>
                <img className="active-bullet" src={icon} alt="" /> 
                <Circle className="swiper-img" />

            </Box> */}


        </Box>

    )
}