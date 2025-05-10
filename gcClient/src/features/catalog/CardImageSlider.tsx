import { useState } from "react";

interface Props {
    images: string[]
}

export default function CardImageSlider({ images }: Props) {
    const [slideIndex, setSlideIndex] = useState(0)
    const [slideImageCount, setSlieImageCount] = useState(images.length <= 6 ? images.length : 5);
    // console.log(imgVisiblePart);
    const handdleNext = () => {
        
    }

    const handdleBack = () => {

    }
    return (
        <ul style={{ display: 'flex', justifyContent: 'space-between',  padding: 0, width: '100%' }}>
             { slideIndex > 0 && 
                <li style={{
                    listStyleType: 'none',
                    width: '15%', padding: 0
                }}>
                    <button style={{ width: '100%', height: '100%' }} className="m-slider-img-btn" onClick={handdleBack}>{'<'}</button>
                </li>
            }
            {images.map((image, i) =>  i < slideImageCount ? (
                
                <li key={i} style={{
                    listStyleType: 'none',
                    width: '15%', padding: 0
                }}>
                    <button className="m-slider-img-btn">
                        <img src={image} style={{ width: '100%' }} />
                    </button>
                </li>
            ) : i == slideImageCount ? (
                <li key={i} style={{
                    listStyleType: 'none',
                    width: '15%', padding: 0
                }}>
                    <button style={{ width: '100%', height: '100%' }} className="m-slider-img-btn" onClick={handdleNext}>{'>'}</button>
                </li>

            ) : null)}
        </ul>
    )
}
