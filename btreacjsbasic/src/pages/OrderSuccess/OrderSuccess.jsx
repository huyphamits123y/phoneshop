


import React, { useState, useEffect } from 'react';
import { Table, Checkbox, InputNumber, Button, Row, Col, Modal, Form, Radio, Typography, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeOrderProduct } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../utils';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from '../../components/Message/Message';
import * as UserService from '../../services/UserService';
import * as OrderService from '../../services/OrderService'
import { useLocation } from 'react-router';
import { orderContant } from '../../contant';

const { Title } = Typography;
const OrderSuccess = () => {
    const location = useLocation();
    const state = location.state;
    const order = useSelector(state => state.order);
    const user = useSelector(state => state.user);

    const dispatch = useDispatch();
    let a = 0;
    if (state?.deliveryMethod === 'FAST') {
        a = 10;
    } else {
        a = 15;
    }
    const [localQuantities, setLocalQuantities] = useState({})
    console.log('state', state?.paymentMethod, state?.deliveryMethod);
    console.log('cc', orderContant.paymentMethod[state?.paymentMethod])
    useEffect(() => {
        const initialQuantities = {};
        order.orderItems.forEach(item => {
            initialQuantities[item.product] = item.amount;
        });
        setLocalQuantities(initialQuantities);
    }, [order]);
    const columns = [
        {
            title: 'Tất cả',
            dataIndex: 'product',
            // render: (text) => <Checkbox>{text}</Checkbox>,
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h2>{localQuantities[record.key]}</h2>



                </div>
            ),
        },
        {
            title: 'Thành tiền',
            dataIndex: 'total',
            render: (text, record) => <span>{(record.price * localQuantities[record.key]).toFixed(2)}</span>,
        },
        // {
        //     title: '',
        //     dataIndex: 'action',
        //     render: (text, record) => (
        //         <Button type="link" onClick={() => dispatch(removeOrderProduct(record.key))}>🗑</Button>
        //     ),
        // },
    ];

    const data = order.orderItems.map((item) => ({
        key: item.product,
        product: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src={item.image}
                    alt={item.name}
                    style={{ marginRight: 10 }}
                />
                <span>{item.name}</span>
            </div>
        ),
        price: item.price,
        // quantity: item.amount,
        // total: item.price * item.amount,
        quantity: localQuantities[item.product],
        total: item.price * localQuantities[item.product],
    }));
    // const data = order.orderItems
    //     .filter(item => user?.id === item?.userId)
    //     .map((item) => ({
    //         key: item.product,
    //         product: (
    //             <div style={{ display: 'flex', alignItems: 'center' }}>
    //                 <img
    //                     src={item.image}
    //                     alt={item.name}
    //                     style={{ marginRight: 10 }}
    //                 />
    //                 <span>{item.name}</span>
    //             </div>
    //         ),
    //         price: item.price,
    //         quantity: localQuantities[item.product],
    //         total: item.price * localQuantities[item.product],
    //     }));

    const calculateTotal = () => data.reduce((acc, item) => acc + item.total, 0).toFixed(2);
    const handlepayment = () => {

    }


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#f9f9f9' }}>
                <div style={{ width: '100%', maxWidth: '1000px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                    <Title level={4}>Đơn hàng đặt thành công</Title>

                    <div style={{ marginBottom: '20px' }}>
                        <Title level={5}>Phương thức giao hàng</Title>
                        <h2><span style={{ color: '#FF9933' }}>{orderContant.deliveryMethod[state?.deliveryMethod]}</span> Giao hàng tiết kiệm</h2>
                    </div>

                    <Divider />

                    <div>
                        <Title level={5}>Phương thức thanh toán</Title>
                        <h2><span style={{ color: '#FF9933' }}>{orderContant.paymentMethod[state?.paymentMethod]}</span> Thanh toán khi nhận hàng</h2>
                    </div>
                    <Divider />

                    <div>
                        <Title level={5}>Phí thanh toán</Title>
                        <h2><span style={{ color: '#FF9933' }}>Tổng tiền sản phẩm </span> {calculateTotal()} VND</h2>
                        <h2><span style={{ color: '#FF9933' }}>Phí vận chuyển </span> {a} VND</h2>
                        <h2><span style={{ color: '#FF9933' }}>Tổng tiền cần thanh toán </span> {calculateTotal() - a} VND</h2>

                    </div>
                    <div>
                        <ButtonComponent
                            onClick={() => handlepayment()}
                            size={40}
                            styleButton={{
                                background: 'rgb(255,57,69)',
                                height: '48px',
                                width: '320px',
                                border: 'none',
                                borderRadius: '4px'
                            }}
                            textButton={'Thanh toán'}
                            styleTextButton={{ color: '#fff', fontSize: "15px", fontWeight: '700' }}

                        >

                        </ButtonComponent>
                    </div>

                </div>

            </div>
            <div style={{ width: '100%', maxWidth: '1000px', padding: '20px', marginLeft: '260px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <Row>
                    <Col style={{ width: '1000px' }}>
                        {/* {user?.id <Table columns={columns} dataSource={data} pagination={false} />} */}
                        {user?.id ? (
                            <Table columns={columns} dataSource={data} pagination={false} />
                        ) : (
                            // <p>No ID provided</p> // You can customize this message as needed

                            <Table columns={columns} pagination={false} />
                        )}
                        {/* <Table columns={columns} dataSource={data} pagination={false} /> */}
                    </Col>

                </Row>

            </div>
        </div>




    );
};

export default OrderSuccess;