import React from 'react'
import Slider from 'react-slick'
import { WrapperSliderStyle } from './style';
const SliderComponent = ({ arrImages }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000
    };
    return (
        <WrapperSliderStyle {...settings}>
            {arrImages.map((image) => {
                return (
                    <img key={image} src={image.src} alt="slider" width="100%" height="274px" />
                )
            })}
        </WrapperSliderStyle>
    )
}
export default SliderComponent