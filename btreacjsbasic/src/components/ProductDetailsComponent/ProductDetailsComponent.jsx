import { React, useRef } from "react";
import { Row, Col, Image, InputNumber, Rate } from 'antd'
import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons'
import imageProduct from '../../assets/images/image1.png';
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from "./style";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from '../../services/ProductService';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addOrderProduct } from '../../redux/slides/orderSlide'
import { convertPrice } from "../../utils";
import ReactDOM from 'react-dom';
import { isDraft } from 'immer';
const ProductDetailsComponent = () => {
    const [numProduct, setNumProduct] = useState(1)
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const onChange = (value) => {
        setNumProduct(Number(value))

    }
    const { id } = useParams();
    console.log('hello', id)
    const fetchGetDetailsProduct = async () => {

        const res = await ProductService.getDetailsProduct(id)
        return res.data



    }
    console.log('id', user?.id)
    console.log('location', location)
    // const { isLoading, data: productDetails, error } = useQuery(['product-details', id], fetchGetDetailsProduct, { enabled: !!id })
    // console.log('productdetails', productDetails)
    const queryProduct = useQuery({ queryKey: ['product-details'], queryFn: fetchGetDetailsProduct })
    const { isLoading: isLoadingProduct, data: productdetails } = queryProduct

    // const { isLoading: isLoadingProduct, data: productdetails } = useQuery(['product-details', id], fetchGetDetailsProduct);
    console.log('hello', productdetails)
    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname })
        } else {
            dispatch(addOrderProduct({


                orderItem: {
                    userId: user?.id,
                    name: productdetails?.name,
                    amount: numProduct,
                    image: productdetails?.image,
                    price: productdetails?.price,
                    product: productdetails?._id,

                },


            }))


        }

    }
    // const handleAddOrderProduct = () => {
    //     if (!user?.id) {
    //         navigate('/sign-in', { state: location?.pathname });
    //     } else if (productdetails) {
    //         if (!isDraft(productdetails)) { // Kiểm tra nếu productdetails không bị thu hồi
    //             dispatch(addOrderProduct({
    //                 orderItem: {
    //                     id: user?.id,
    //                     name: productdetails?.name,
    //                     amount: numProduct,
    //                     image: productdetails?.image,
    //                     price: productdetails?.price,
    //                     product: productdetails?._id
    //                 },
    //                 userId: user.id
    //             }));
    //         } else {
    //             console.warn('Đối tượng đã bị thu hồi, không thể thực hiện hành động này.');
    //         }
    //     }
    // };
    const renderRating = (num) => {
        let stars = [];
        for (let i = 0; i < num; i++) {
            stars.push(<StarFilled key={i} style={{ fontSize: '30px', color: 'yellow' }} />);
        }
        return stars;
    };
    const handleChangeCount = (type) => {
        if (type === 'increase') {
            setNumProduct(numProduct + 1)
        } else {
            if (numProduct === 0) {

            } else {
                setNumProduct(numProduct - 1)
            }
        }

    }
    const elementRef = useRef(null);

    const handleClick = () => {
        console.log('cc')
        if (elementRef.current) {
            console.log('ref', elementRef.current); // Truy cập phần tử DOM thông qua refs
        }
    };




    return (
        <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
            <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                <Image src={productdetails?.image} alt="image product" preview={false} style={{ height: '650px', width: '520px' }} />
                <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProduct} alt="image small" preview={false} />
                    </WrapperStyleColImage>

                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProduct} alt="image small" preview={false} />
                    </WrapperStyleColImage>

                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProduct} alt="image small" preview={false} />
                    </WrapperStyleColImage>

                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProduct} alt="image small" preview={false} />
                    </WrapperStyleColImage>

                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProduct} alt="image small" preview={false} />
                    </WrapperStyleColImage>




                </Row>
            </Col>
            <Col span={14} style={{ paddingLeft: '10px' }}>
                <WrapperStyleNameProduct>{productdetails?.name}</WrapperStyleNameProduct>
                <div>
                    {/* <Rate allowHalf defaultValue={productdetails?.rating} /> */}
                    {renderRating(productdetails?.rating)}

                    {/* <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)' }} />
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)' }} />
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)' }} /> */}

                    <WrapperStyleTextSell>| Da ban 1000+</WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>{convertPrice(productdetails?.price)}</WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span>Giao den</span>
                    <span className='address'>{user?.address}</span>
                    <span className='change-address'>-Doi dia chi</span>
                </WrapperAddressProduct>
                <div style={{ margin: '10px 0 20px', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', padding: '10px 0' }}>
                    <div style={{ marginBottom: '10px' }}>
                        So Luong
                    </div>
                    <WrapperQualityProduct>

                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease')}>
                            <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                        </button>



                        <WrapperInputNumber value={numProduct} defaultValue={1} onChange={onChange} size='small' />

                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase')}>
                            <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                        </button>


                    </WrapperQualityProduct>

                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ButtonComponent
                        size={40}
                        bordered={false}
                        styleButton={{
                            background: 'rgb(255, 57, 69)',
                            height: '48px',
                            width: '220px',
                            border: 'none',
                            borderRadius: '4px'
                        }}
                        onClick={handleAddOrderProduct}
                        textButton={'Chon mua'}
                        styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>

                    <ButtonComponent
                        size={40}
                        bordered={false}
                        styleButton={{
                            background: '#fff',
                            height: '48px',
                            width: '220px',
                            border: '1px solid rgb(13,92,182)',
                            borderRadius: '4px'
                        }}
                        textButton={'Mua tra sau'}
                        styleTextButton={{ color: 'rgb(13, 92, 182)', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>

                </div>


            </Col>
        </Row>
    )
}
export default ProductDetailsComponent