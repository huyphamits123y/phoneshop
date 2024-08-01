import React from 'react'
import Meta from 'antd/lib/card/Meta'
import { Card, Image } from 'antd'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReporText, WrapperStyleTextSell } from './style'
import imageProduct from '../../assets/images/image1.png';
import { StarFilled } from '@ant-design/icons'
import logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils';
const CardComponent = (props) => {

    const { countInStock, description, image, name, price, rating, type, discount, selled, id } = props

    const navigate = useNavigate()
    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }
    const renderRating = (num) => {
        let stars = [];
        for (let i = 0; i < num; i++) {
            stars.push(<StarFilled key={i} style={{ fontSize: '12px', color: 'yellow' }} />);
        }
        return stars;
    };




    return (
        <WrapperCardStyle
            hoverable
            headStyle={{ width: '200px', height: '200px' }}

            style={{ width: 240 }}
            bodyStyle={{ padding: '10px' }}
            // cover={<img alt="example" src="https://onewaymobile.vn/images/products/2023/09/13/large/iphone-15-15_1694580102.webp" />}
            cover={<Image src={image} alt="image product" preview={false} />}
            onClick={() => handleDetailsProduct(id)}
        >

            <img src={logo}
                style={{ width: '68px', height: '14px', position: 'absolute', top: -1, left: 0, borderTopLeftRadius: '3px' }} />
            <StyleNameProduct>{name}</StyleNameProduct>

            <WrapperReporText>
                <span style={{ marginRight: '4px' }}>
                    {/* <span>{rating}</span> <StarFilled style={{ fontSize: '12px', color: 'yellow' }} /> */}
                    {renderRating(rating)}
                </span>

                <WrapperStyleTextSell>| Da ban {selled || 1000}</WrapperStyleTextSell>


            </WrapperReporText>
            <WrapperPriceText>
                <span style={{ marginRight: '8px' }}>{convertPrice(price)}</span>
                {/* <WrapperDiscountText>
                    - {discount || 5} %
                </WrapperDiscountText> */}

            </WrapperPriceText>
        </WrapperCardStyle>
    )
}
export default CardComponent