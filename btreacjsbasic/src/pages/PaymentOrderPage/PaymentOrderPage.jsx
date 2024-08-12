// import React, { useState, useEffect } from 'react';
// import { Table, Checkbox, InputNumber, Button, Row, Col, Modal, Form, Radio, Typography, Divider } from 'antd';
// import { useDispatch, useSelector } from 'react-redux';
// import { decreaseAmount, increaseAmount, removeOrderProduct } from '../../redux/slides/orderSlide';
// import { convertPrice } from '../../utils';
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
// import ModalComponent from '../../components/ModalComponent/ModalComponent';
// import InputComponent from '../../components/InputComponent/InputComponent';
// import { useMutationHooks } from '../../hooks/useMutationHook';
// import * as message from '../../components/Message/Message';
// import * as UserService from '../../services/UserService';
// import * as OrderService from '../../services/OrderService'
// import { useLocation, useNavigate } from 'react-router';
// import { orderContant } from '../../contant';
// const { Title } = Typography;
// const PaymentOrderPage = () => {




//     const order = useSelector(state => state.order);
//     const user = useSelector(state => state.user);
//     const navigate = useNavigate()

//     const dispatch = useDispatch();

//     const fetchGetListOrder = () => {
//         const res = OrderService.getListsOrder(user?.id)
//         return res;
//     }
//     const queryOrder = useQuery({ queryKey: ['order'], queryFn: fetchGetListOrder })
//     const { isLoading: isLoadingOrder, data: paymentorder } = queryOrder
//     console.log('paymentorder', paymentorder)
//     let a = 0;
//     const handlePayment = () => {

//     }

//     const [localQuantities, setLocalQuantities] = useState({})

//     const columns = [
//         {
//             title: 'Tất cả',
//             dataIndex: 'product',
//         },
//         {
//             title: 'Đơn giá',
//             dataIndex: 'price',
//         },
//         {
//             title: 'Số lượng',
//             dataIndex: 'quantity',

//         },
//         {
//             title: 'Thành tiền',
//             dataIndex: 'total',
//             render: (text, record) => <span>{(record.price * record.quantity).toFixed(2)}</span>,
//         },

//     ];
//     const data = // Lọc các item có userId bằng user.id
//         paymentorder.map(item => ({
//             key: item.product,
//             product: (
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                     <img
//                         src={item.image}
//                         alt={item.name}
//                         style={{ marginRight: 10 }}
//                     />
//                     <span>{item.name}</span>
//                 </div>
//             ),
//             price: item.price,
//             quantity: item.amount, // Sử dụng amount từ Redux store
//             total: item.price * item.amount,
//         }));



//     const calculateTotal = () => data.reduce((acc, item) => acc + item.total, 0).toFixed(2);
//     const handlepayment = () => {
//         navigate('/payment-order');

//     }
//     return (
//         <div>
//             <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#f9f9f9' }}>
//                 <div style={{ width: '100%', maxWidth: '1000px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
//                     <Title level={4}>Đơn hàng đặt thành công</Title>

//                     <div style={{ marginBottom: '20px' }}>
//                         <Title level={5}>Phương thức giao hàng</Title>
//                         <h2><span style={{ color: '#FF9933' }}>{paymentorder?.paymentMethod}</span> Giao hàng tiết kiệm</h2>
//                     </div>

//                     <Divider />

//                     <div>
//                         <Title level={5}>Phương thức thanh toán</Title>
//                         <h2><span style={{ color: '#FF9933' }}>{paymentorder?.deliveryMethod}</span> Thanh toán khi nhận hàng</h2>
//                     </div>
//                     <Divider />

//                     <div>
//                         <Title level={5}>Phí thanh toán</Title>
//                         <h2><span style={{ color: '#FF9933' }}>Tổng tiền sản phẩm </span> {calculateTotal()} VND</h2>
//                         <h2><span style={{ color: '#FF9933' }}>Phí vận chuyển </span> {a} VND</h2>
//                         <h2><span style={{ color: '#FF9933' }}>Tổng tiền cần thanh toán </span> {calculateTotal() + a} VND</h2>
//                     </div>

//                     <ButtonComponent
//                         onClick={handlePayment}
//                         size={40}
//                         styleButton={{
//                             background: 'rgb(255,57,69)',
//                             height: '48px',
//                             width: '320px',
//                             border: 'none',
//                             borderRadius: '4px'
//                         }}
//                         textButton={'Thanh toán'}
//                         styleTextButton={{ color: '#fff', fontSize: "15px", fontWeight: '700' }}
//                     />
//                 </div>
//             </div>

//             {paymentorder.map((order, index) => {

//                     .map(item => ({
//                         key: item.product,
//                         product: (
//                             <div style={{ display: 'flex', alignItems: 'center' }}>
//                                 <img
//                                     src={item.image}
//                                     alt={item.name}
//                                     style={{ marginRight: 10 }}
//                                 />
//                                 <span>{item.name}</span>
//                             </div>
//                         ),
//                         price: item.price,
//                         quantity: item.amount,
//                         total: item.price * item.amount,
//                     }));

//                 return (
//                     <div
//                         key={index}
//                         style={{
//                             width: '100%',
//                             maxWidth: '1000px',
//                             padding: '20px',
//                             marginTop: '20px',
//                             backgroundColor: '#fff',
//                             borderRadius: '8px',
//                             boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//                         }}
//                     >
//                         <Title level={5}>Đơn hàng {index + 1}</Title>
//                         {user?.id ? (
//                             <Table columns={columns} dataSource={data} pagination={false} />
//                         ) : (
//                             <Table columns={columns} pagination={false} />
//                         )}
//                     </div>
//                 );
//             })
//         </div>
//     );
// };

// export default PaymentOrderPage








// import React from 'react';
// import { Table, Divider, Typography } from 'antd';
// import { useSelector } from 'react-redux';
// import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from 'react-router';
// import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
// import * as OrderService from '../../services/OrderService';
// import { useMutationHooks } from "../../hooks/useMutationHook";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
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

const { Title } = Typography;

const PaymentOrderPage = () => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const fetchGetListOrder = () => {
        return OrderService.getListsOrder(user?.id);
    };

    const queryOrder = useQuery({
        queryKey: ['order'],
        queryFn: fetchGetListOrder
    });

    const { isLoading: isLoadingOrder, data: paymentOrders } = queryOrder;


    console.log('user', user?.id)
    console.log('orderid', paymentOrders?._id)
    console.log('payment', paymentOrders)

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



    const orders = paymentOrders?.data || [];
    console.log('orders', orders)
    // const handlePayment = () => {
    //     navigate('/payment-order');
    // };

    const mutationDelete = useMutationHooks(

        async (data) => {

            const { id, token } = data;


            const res = await OrderService.deleteOrder(id, token);


            return res;
        }
    );
    const { data: dataDelete, isSuccess: isSuccessDelete, isError: isErrorDelete } = mutationDelete
    useEffect(() => {
        if (isSuccessDelete && dataDelete?.status === 'OK') {
            message.success()

            queryClient.invalidateQueries('orders');
        } else if (isErrorDelete) {
            message.error()
        }
    }, [isSuccessDelete])

    if (isLoadingOrder) return <div>Loading...</div>;

    return (
        <div >

            {orders.map((order, index) => {
                // Use the items from each order to create the table data
                const data = order.orderItems.map(item => ({
                    key: item.product,
                    product: (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{ marginRight: 10, width: '50px', height: '50px' }}
                            />
                            <span>{item.name}</span>
                        </div>
                    ),

                    price: item.price,
                    quantity: item.amount,
                    total: item.price * item.amount,


                }));
                const totalPrice = data.reduce((acc, item) => acc + item.total, 0);
                console.log('userIDddd', order?._id)
                console.log('orderuser', order?.user)
                console.log('useremail', user?.email)

                const checkIsPaid = () => {

                }
                const handlePaymentOrder = async () => {
                    try {
                        console.log('order_id', order?.id)
                        console.log('orderemail', order?.email)
                        const response = await OrderService.paymentorder(order?._id)
                        console.log('responese', response.data)
                        if (response?.data?.return_code === 1) {
                            const link = response.data.order_url
                            console.log('link', link)
                            window.location.href = link



                            // }
                            // const responese = await OrderService.sendEmailOrder(user?.email, order?._id)
                            // if (responese.data) {
                            //     console.log('mail gui thanh cong')
                            // }




                        }


                    } catch (error) {
                        console.log('error', error)
                    }

                }

                const handleDeleteOrder = async () => {
                    try {
                        await mutationDelete.mutate({ id: order?._id, token: user?.access_token }, {
                            onSettled: () => {
                                queryClient.invalidateQueries('orders');
                            }
                        });
                    } catch (error) {
                        console.error("Error deleting order:", error);
                        message.error('Failed to delete order');
                    }
                };



                return (
                    <div
                        key={index}
                        style={{
                            width: '100%',
                            maxWidth: '1300px',
                            margin: '20px auto',
                            height: '400px', // Set height to 400px or any desired height
                            padding: '20px',

                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                            overflowY: 'auto', // Allow vertical scrolling if content exceeds height


                        }}
                    >
                        <Title level={5}>Đơn hàng {index + 1}</Title>
                        <h5>Trạng thái</h5>

                        <h5>Thanh toán: <span style={{ color: order.isPaid ? 'green' : 'red' }}>{order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</span></h5>

                        <h5>Phương thức vận chuyển: <span style={{ color: 'red' }}>{order?.deliveryMethod}</span></h5>
                        <h5>Tổng tiền cần thanh toán <span style={{ color: 'red' }}> {totalPrice.toLocaleString()}</span></h5>

                        <Table columns={columns} dataSource={data} pagination={false} />
                        <div style={{ display: 'flex', padding: '10px', width: '400px' }}>
                            <ButtonComponent

                                onClick={() => handlePaymentOrder()}
                                disable={order?.isPaid}
                                size={40}
                                bordered={false}
                                styleButton={{
                                    background: '#fff',
                                    height: '48px',
                                    width: '220px',
                                    border: '1px solid rgb(13,92,182)',
                                    borderRadius: '4px',
                                    margin: '10px',
                                }}
                                textButton={'Thanh toán'}
                                styleTextButton={{ color: 'rgb(13, 92, 182)', fontSize: '15px', fontWeight: '700' }}
                            ></ButtonComponent>
                            <ButtonComponent
                                onClick={() => handleDeleteOrder()}
                                disable={order?.isPaid}
                                size={40}
                                bordered={false}
                                styleButton={{
                                    background: '#fff',
                                    height: '48px',
                                    width: '220px',
                                    border: '1px solid rgb(13,92,182)',
                                    margin: '10px',
                                    borderRadius: '4px'
                                }}
                                textButton={'Hủy đơn hàng'}
                                styleTextButton={{ color: 'rgb(13, 92, 182)', fontSize: '15px', fontWeight: '700' }}
                            ></ButtonComponent>
                        </div>
                    </div>

                );
            })}
        </div>
    );
};

export default PaymentOrderPage;
