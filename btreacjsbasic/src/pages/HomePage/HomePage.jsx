import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import SliderComponent from '../../SliderComponent/SliderComponent'
import slider1 from '../../assets/images/slider1.png';
import slider2 from '../../assets/images/slider2.png';
import slider3 from '../../assets/images/slider3.png';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
const HomePage = () => {
    const arr = ['TV', ' TU LANH', 'LAPTOP']
    const arrImages = [
        { src: slider1 },
        { src: slider2 },
        { src: slider3 }
    ];

    return (
        <>
            <div style={{ width: '1270px', margin: '0 auto' }}>
                <WrapperTypeProduct>

                    {arr.map((item) => {
                        return (
                            <TypeProduct name={item} key={item} />

                        )
                    })}
                </WrapperTypeProduct>
            </div>


            <div className='body' style={{ backgroundColor: '#efefef', width: '100%' }}>

                <div id="container" style={{ height: '1000px', width: '1270px', margin: '0 auto' }}>
                    <SliderComponent arrImages={arrImages}></SliderComponent>

                    <WrapperProducts>
                        <CardComponent />
                        <CardComponent />

                        <CardComponent />

                        <CardComponent />

                        <CardComponent />


                    </WrapperProducts>
                    <NavbarComponent />
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <WrapperButtonMore
                            size="large"
                            style={{ backgroundColor: '#fff' }}


                            textButton="Xem Thêm"
                            styleTextButton={{ color: 'rgb(0,255,0)', fontWeight: 500 }}

                        />
                    </div>
                </div>
            </div>



        </>
    )
}
export default HomePage