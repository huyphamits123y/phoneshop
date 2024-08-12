
import React, { useState, useEffect } from 'react';
import { Table, Checkbox, InputNumber, Button, Row, Col, Modal, Form, Radio, Typography, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeAllUserProducts, removeOrderProduct } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../utils';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from '../../components/Message/Message';
import * as UserService from '../../services/UserService';
import * as OrderService from '../../services/OrderService'
import { useNavigate } from 'react-router';

const { Title } = Typography;
const PaymentPage = () => {
    const order = useSelector((state => state.order));
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();


    const [deliveryMethod, setDeliveryMethod] = useState('FAST');
    const [paymentMethod, setPaymentMethod] = useState('COD');

    const navigate = useNavigate();

    // const [stateUserDetails, setStateUserDetails] = useState({
    //     name: '',
    //     email: '',
    //     phone: '',
    //     address: ''


    // })
    // const handleOnchangeDetails = (e) => {
    //     console.log('check', e.target.name, e.target.value)
    //     setStateUserDetails({
    //         ...stateUserDetails,
    //         [e.target.name]: e.target.value
    //     })
    //     console.log('e.target.name', e.target.name, e.target.value)

    // }
    // const [form] = Form.useForm();
    // const mutationUpdate = useMutationHooks(

    //     async (data) => {

    //         const { id, token, ...rests } = data;


    //         const res = await UserService.updateUser(id, rests, token);


    //         return res;
    //     }
    // );
    // const mutationAddOrder = useMutationHooks(

    //     async (data) => {

    //         const { id, token, ...rests } = data;


    //         const res = await OrderService.createOrder(token, { ...rests },);


    //         return res;
    //     }
    // );
    // // const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    // const filterOrderItemsByUser = (orderItems, userId) => {
    //     return orderItems.filter(item => item?.userId === userId);
    // };

    // useEffect(() => {
    //     if (order?.orderItems && user?.id) {
    //         const filteredItems = filterOrderItemsByUser(order.orderItems, user.id);
    //         setFilteredOrderItems(filteredItems);
    //     }
    // }, [order?.orderItems, user?.id]); // Re-run effect when orderItems or user.id changes

    // console.log('orderitemfil', filteredOrderItems)
    // useEffect(() => {
    //     const initialQuantities = {};
    //     order.orderItems.forEach(item => {
    //         initialQuantities[item.product] = item.amount;
    //     });
    //     setLocalQuantities(initialQuantities);
    // }, [order]);
    // useEffect(() => {
    //     if (isSuccessUpdated) {
    //         message.success()
    //         handleCancel();
    //         queryClient.invalidateQueries('user');
    //         window.location.reload(); // load lai trang

    //     } else if (isErrorUpdated) {
    //         message.error()
    //     }
    // }, [isSuccessUpdated])


    // useEffect(() => {
    //     form.setFieldsValue(stateUserDetails)
    // }, [form, stateUserDetails])
    // useEffect(() => {
    //     if (isOpenModalUpdateInfo) {
    //         setStateUserDetails({
    //             name: user?.name,
    //             email: user?.email,
    //             address: user?.address,
    //             phone: user?.phone
    //         })
    //     }
    // }, [isOpenModalUpdateInfo])



    let a = 0;

    if (deliveryMethod === 'FAST') {
        a = 40000
    } else {
        a = 30000
    }
    console.log('delivery', deliveryMethod)


    // console.log('shipping', shippingMethod)


    // const handleCancelUpdate = () => {
    //     setIsOpenModalUpdateInfo(false)

    // }
    // const handleCancel = () => {
    //     setIsModalOpen(false)
    // }
    // const handleUpdateInfoUser = () => {
    //     console.log('stateUserDetails', stateUserDetails)
    //     const { name, email, phone, address } = stateUserDetails
    //     if (name && address && phone && email) {
    //         mutationUpdate.mutate({ id: user?.id, ...stateUserDetails, token: user?.access_token })
    //         setIsOpenModalUpdateInfo(false)
    //     }

    // }


    // const handleChangeAddress = () => {
    //     setIsOpenModalUpdateInfo(true)

    // }

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


    let total = calculateTotal()
    console.log(total)
    // const handleAddOrder = () => {


    //     if (user?.access_token && filteredOrderItems.length > 0 && user?.name && user?.address && user?.phone && user?.id) {
    //         mutationAddOrder.mutate(
    //             {
    //                 token: user?.access_token, orderItems: filteredOrderItems, fullName: user?.name, address: user?.address, phone: user?.phone, paymentMethod: paymentMethod, deliveryMethod: deliveryMethod, totalPrice: total, user: user?.id

    //             }
    //         )

    //         dispatch(removeAllUserProducts({ userId: user?.id }))
    //     }


    // }
    const handlepayment = () => {
        navigate('/orderSuccess', {
            state: {
                paymentMethod,
                deliveryMethod,
                // order: order?.orderItems
            }
        })
    }
    // console.log('order', order, user)
    // const { data: dataAdd, isSuccess: isSuccessAdd, isError: isErrorAdd } = mutationAddOrder
    // useEffect(() => {
    //     if (isSuccessAdd && dataAdd?.status === 'OK') {
    //         message.success('Đặt hàng thành công')
    //         navigate('/orderSuccess', {
    //             state: {
    //                 paymentMethod,
    //                 deliveryMethod,
    //                 order: order?.orderItems
    //             }
    //         })
    //     } else if (isErrorAdd) {
    //         message.error()
    //     }
    // }, [isSuccessAdd, isErrorAdd])





    return (
        <div style={{ padding: 20 }}>
            <Row gutter={16}>
                <Col span={16}>


                    {/* {user?.id ? (
                        <Table columns={columns} dataSource={data} pagination={false} />
                    ) : (
                        // <p>No ID provided</p> // You can customize this message as needed

                        <Table columns={columns} pagination={false} />
                    )} */}


                    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                        <Title level={4}>Thanh toán</Title>

                        <div style={{ marginBottom: '20px' }}>
                            <Title level={5}>Chọn phương thức giao hàng</Title>
                            <Radio.Group value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)}>
                                <Radio value="FAST" style={{ padding: '10px' }} ><span style={{ color: '#FF9933' }}>FAST</span> Giao hàng tiết kiệm</Radio>
                                <br />
                                <Radio value="GO_JEK" style={{ padding: '10px' }}><span style={{ color: '#FF9933' }}>GO_JEK</span> Giao hàng tiết kiệm</Radio>
                            </Radio.Group>
                        </div>

                        <Divider />

                        <div>
                            <Title level={5}>Chọn phương thức thanh toán</Title>
                            <Radio.Group value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                <Radio value="COD">Thanh toán tiền mặt khi nhận hàng</Radio>
                            </Radio.Group>
                        </div>
                    </div>



                </Col>

                <Col span={8}>

                    <div style={{ padding: 20, background: '#f5f5f5' }}>

                        {/* <Row justify="space-between" style={{ marginBottom: 10 }}>
                            <Col>
                                <span>Địa chỉ :</span>
                                <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>{user?.address}</span>
                                <span onClick={handleChangeAddress} style={{ color: 'blue', marginLeft: '10px', cursor: 'pointer' }}>Thay đổi</span>
                            </Col>
                          
                        </Row> */}
                        <Row justify="space-between" style={{ marginBottom: 10 }}>
                            <Col>Email :</Col>
                            <Col>{user?.email}</Col>
                        </Row>
                        <Row justify="space-between" style={{ marginBottom: 10 }}>
                            <Col>Phone :</Col>
                            <Col>{user?.phone}</Col>
                        </Row>
                        <Row justify="space-between" style={{ marginBottom: 10 }}>
                            <Col>Tạm tính</Col>
                            <Col>{Number(calculateTotal())}</Col>
                        </Row>
                        {/* <Row justify="space-between" style={{ marginBottom: 10 }}>
                            <Col>Giảm giá</Col>
                            <Col>0</Col>
                        </Row>
                        <Row justify="space-between" style={{ marginBottom: 10 }}>
                            <Col>Thuế</Col>
                            <Col>0</Col>
                        </Row> */}
                        <Row justify="space-between" style={{ marginBottom: 10 }}>
                            <Col>Phí giao hàng</Col>
                            <Col>{a} VND</Col>
                        </Row>
                        <Row justify="space-between" style={{ marginBottom: 10, fontWeight: 'bold' }}>
                            <Col>Tổng tiền</Col>
                            <Col>{Number(calculateTotal()) + a} VND</Col>

                        </Row>
                        {/* <Button type="primary" style={{ width: '100%' }}>
                            Mua hàng
                        </Button> */}
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
                            textButton={'Mua Hàng'}
                            styleTextButton={{ color: '#fff', fontSize: "15px", fontWeight: '700' }}

                        >

                        </ButtonComponent>

                    </div>
                </Col>

            </Row>

        </div>

    );
};

export default PaymentPage;



