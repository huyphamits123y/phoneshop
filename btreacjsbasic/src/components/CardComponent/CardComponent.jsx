import React from 'react'
import Meta from 'antd/lib/card/Meta'
import { Card, Image } from 'antd'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReporText, WrapperStyleTextSell } from './style'
import imageProduct from '../../assets/images/image1.png';
import { StarFilled } from '@ant-design/icons'
import logo from '../../assets/images/logo.png'
const CardComponent = () => {




    return (
        <WrapperCardStyle
            hoverable
            headStyle={{ width: '200px', height: '200px' }}

            style={{ width: 240 }}
            bodyStyle={{ padding: '10px' }}
            // cover={<img alt="example" src="https://onewaymobile.vn/images/products/2023/09/13/large/iphone-15-15_1694580102.webp" />}
            cover={<Image src={imageProduct} alt="image product" preview={false} />}
        >

            <img src={logo}
                style={{ width: '68px', height: '14px', position: 'absolute', top: -1, left: 0, borderTopLeftRadius: '3px' }} />
            <StyleNameProduct>Iphone</StyleNameProduct>

            <WrapperReporText>
                <span style={{ marginRight: '4px' }}>
                    <span>4.96</span> <StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
                </span>

                <WrapperStyleTextSell>| Da ban 1000+</WrapperStyleTextSell>


            </WrapperReporText>
            <WrapperPriceText>
                <span style={{ marginRight: '8px' }}>1.000.000d</span>
                <WrapperDiscountText>
                    -5%
                </WrapperDiscountText>

            </WrapperPriceText>
        </WrapperCardStyle>
    )
}
export default CardComponent