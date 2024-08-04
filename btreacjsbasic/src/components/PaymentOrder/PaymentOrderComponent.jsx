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
import { useLocation, useNavigate } from 'react-router';
import { orderContant } from '../../contant';
const PaymentOrderComponent = () => {




    const order = useSelector(state => state.order);
    const user = useSelector(state => state.user);
    const navigate = useNavigate()

    const dispatch = useDispatch();

    const fetchGetListOrder = async () => {
        const res = await OrderService.getListsOrder(user?.id)
        return res;
    }
    // useEffect(() => {
    //     if (user?.id){
    //         fetchGetListOrder()
    //     }
    // })
    const queryOrder = useQuery({ queryKey: ['order'], queryFn: fetchGetListOrder })
    const { isLoading: isLoadingOrder, data: paymentorder } = queryOrder
    console.log('paymentorder', paymentorder)
    let a = 0;

    const [localQuantities, setLocalQuantities] = useState({})

    const columns = [
        {
            title: 'Tất cả',
            dataIndex: 'product',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',

        },
        {
            title: 'Thành tiền',
            dataIndex: 'total',
            render: (text, record) => <span>{(record.price * record.quantity).toFixed(2)}</span>,
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
                        style={{ marginRight: 10 }}
                    />
                    <span>{item.name}</span>
                </div>
            ),
            price: item.price,
            quantity: item.amount, // Sử dụng amount từ Redux store
            total: item.price * item.amount,
        }));



    const calculateTotal = () => data.reduce((acc, item) => acc + item.total, 0).toFixed(2);
    const handlepayment = () => {
        navigate('/payment-order');

    }
    return (
        <div>
            <h1>paymentorder</h1>
        </div>
    )
}
export default PaymentOrderComponent