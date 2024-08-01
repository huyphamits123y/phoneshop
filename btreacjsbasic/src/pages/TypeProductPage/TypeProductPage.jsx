import React, { useEffect, useRef, useState } from 'react'
import { Col, Row, Pagination } from 'antd'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { WrapperNavbar, WrapperProducts } from './style'
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService'
import { useLocation } from 'react-router'
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce'
const TypeProductPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const { state } = useLocation()

    const searchDebounce = useDebounce(searchProduct, 500)
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 10,
        total: 1
    })

    const [stateProducts, setStateProducts] = useState([])
    const fetchProductType = async (type, page, limit) => {
        const res = await ProductService.getProductType(type, page, limit)
        if (res?.status === 'OK') {
            setStateProducts(res?.data)
            console.log('res', res)

            setPanigate({ ...panigate, total: res?.totalPage })
        }


        return res;
    }
    console.log('searchProduct', searchProduct)
    useEffect(() => {
        if (state) {
            fetchProductType(state, panigate.page, panigate.limit)
        }
    }, [state, panigate.page, panigate.limit])

    // console.log('productttt', products?.data)
    // console.log('state', stateProducts)
    const onChange = (current, pageSize) => {
        console.log({ current, pageSize })
        setPanigate({ ...panigate, page: current - 1, limit: pageSize })

    }
    return (
        <div style={{ width: '100%', background: "#efefef", height: 'calc(100vh - 64px)' }}>
            <div style={{ width: '1270px', margin: '0 auto', height: '100%' }}>
                <Row style={{ flexWrap: 'nowrap', paddingTop: '10px', height: 'calc(100% - 20px)' }}>
                    <WrapperNavbar span={4}><NavbarComponent /></WrapperNavbar>
                    <Col span={20}>
                        <WrapperProducts>
                            {stateProducts?.filter((pro) => {
                                if (searchDebounce === '') {
                                    return pro
                                } else if (pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                                    return pro
                                }

                            })?.map((product) => {
                                return (
                                    <CardComponent key={product._id}
                                        countInStock={product.countInStock}
                                        description={product.description}
                                        image={product.image}
                                        name={product.name}
                                        price={product.price}
                                        rating={product.rating}
                                        type={product.type}
                                        selled={product.selled}
                                        discount={product.discount}
                                        id={product._id}
                                    />
                                )

                            })}


                        </WrapperProducts>
                        <Pagination defaultCurrent={panigate?.page + 1} total={panigate?.total} onChange={onChange} style={{ textAlign: 'center', marginTop: '10px' }} />
                    </Col>

                </Row>

            </div>
        </div>
    )
}
export default TypeProductPage