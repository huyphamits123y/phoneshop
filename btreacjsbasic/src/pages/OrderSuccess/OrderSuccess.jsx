


import React, { useState, useEffect } from 'react';
import { Table, Checkbox, InputNumber, Button, Row, Col, Modal, Form, Radio, Typography, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { convertPrice } from '../../utils';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from '../../components/Message/Message';
import * as UserService from '../../services/UserService';
import * as OrderService from '../../services/OrderService'
import { useLocation, useNavigate } from 'react-router';
import { orderContant } from '../../contant';
import { decreaseAmount, increaseAmount, removeAllUserProducts, removeOrderProduct } from '../../redux/slides/orderSlide';
const { Title } = Typography;
const OrderSuccess = () => {
    const location = useLocation();

    const queryClient = useQueryClient();
    const [filteredOrderItems, setFilteredOrderItems] = useState([]);
    const state = location.state;
    const order = useSelector(state => state.order);
    const user = useSelector(state => state.user);
    const navigate = useNavigate()

    const dispatch = useDispatch();
    let a = 0;
    const mutationAddOrder = useMutationHooks(

        async (data) => {

            const { id, token, ...rests } = data;


            const res = await OrderService.createOrder(token, { ...rests },);


            return res;
        }
    );

    const filterOrderItemsByUser = (orderItems, userId) => {
        return orderItems.filter(item => item?.userId === userId);
    };

    useEffect(() => {
        if (order?.orderItems && user?.id) {
            const filteredItems = filterOrderItemsByUser(order.orderItems, user.id);
            setFilteredOrderItems(filteredItems);
        }
    }, [order?.orderItems, user?.id]); // Re-run effect when orderItems or user.id changes


    console.log('orderitemfil', filteredOrderItems)




    if (state?.deliveryMethod === 'FAST') {
        a = 40000;
    } else {
        a = 30000;
    }
    const [localQuantities, setLocalQuantities] = useState({})

    const columns = [
        {
            title: 'Tất cả',
            dataIndex: 'product',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            render: (price) => `${price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`

        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',

        },
        {
            title: 'Thành tiền',
            dataIndex: 'total',
            render: (text, record) => `${(record.price * record.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`
        },

    ];
    const data = order.orderItems
        .filter(item => item?.userId === user?.id) // Lọc các item có userId bằng user.id
        .map(item => ({
            key: item.product,
            product: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={item.image}
                        alt={item.name}
                        style={{ marginRight: 10, width: '100px' }}
                    />
                    <span>{item.name}</span>
                </div>
            ),
            price: item.price,
            quantity: item.amount, // Sử dụng amount từ Redux store
            total: item.price * item.amount,
        }));
    const calculateTotal = () => data.reduce((acc, item) => acc + item.total, 0).toFixed(2);
    let total = calculateTotal()
    const handleAddOrder = () => {


        if (user?.access_token && filteredOrderItems.length > 0 && user?.name && user?.address && user?.phone && user?.id) {
            mutationAddOrder.mutate(
                {
                    token: user?.access_token, orderItems: filteredOrderItems, fullName: user?.name, address: user?.address, phone: user?.phone, paymentMethod: state?.paymentMethod, deliveryMethod: state?.deliveryMethod, totalPrice: total, user: user?.id

                }
            )

            dispatch(removeAllUserProducts({ userId: user?.id }))
        }


    }
    const { data: dataAdd, isSuccess: isSuccessAdd, isError: isErrorAdd } = mutationAddOrder
    useEffect(() => {
        if (isSuccessAdd && dataAdd?.status === 'OK') {
            message.success('Đặt hàng thành công')
            navigate('/payment-order')
        } else if (isErrorAdd) {
            message.error()
        }
    }, [isSuccessAdd, isErrorAdd])







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
                        <h2><span style={{ color: '#FF9933' }}>Tổng tiền sản phẩm </span> {Number(calculateTotal()).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h2>
                        <h2><span style={{ color: '#FF9933' }}>Phí vận chuyển </span> {a.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h2>
                        <h2><span style={{ color: '#FF9933' }}>Tổng tiền cần thanh toán </span> {Number(calculateTotal()).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h2>

                    </div>
                    <div>
                        <ButtonComponent
                            onClick={() => handleAddOrder()}
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