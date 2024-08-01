// import React from 'react'
// const OrderPage = ({count = 1}) => {
//     const onChange = (e) => {
//         console.log(`checked = ${e.target.value}`);
//     }
//     const handleChangeCount = () => {

//     }
//     const handleOnChangeCheckAll = (e) => {

//     }
//     return (
//         <div style={{background : '#f5f5fa', width:'100%', heihgt: '100vh'}}>
//             <div style={{height:'100%', width: '1270px', margin: '0px auto'}}>
//                 <h3>Gio Hang</h3>
//                 <div style={{display:'flex', justifyContent:'center'}}>

//                 </div>
//             </div>
//         </div>
//     )
// }
// export default OrderPage

// import React, { useState } from 'react';
// import { Table, Checkbox, InputNumber, Button, Row, Col } from 'antd';
// import { useSelector } from 'react-redux';


// const OrderPage = () => {
//     const [quantity, setQuantity] = useState(3);
//     const order = useSelector((state => state.order))

//     const onChange = (e) => {
//         console.log(`checked = ${e.target.value}`);
//     }
//     const handleChangeCount = () => {

//     }
//     const handleOnChangeCheckAll = (e) => {

//     }
//     const handleQuantityChange = (value) => {
//         // setQuantity(value);
//     };

//     const columns = [
//         {
//             title: `Tất cả`,
//             dataIndex: 'product',
//             render: (text) => <Checkbox>{text}</Checkbox>,
//         },
//         {
//             title: 'Đơn giá',
//             dataIndex: 'price',
//         },
//         {
//             title: 'Số lượng',
//             dataIndex: 'quantity',
//             render: () => (
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                     <Button onClick={() => handleQuantityChange(quantity - 1)}>-</Button>
//                     <InputNumber min={1} value={order?.orderItems?.amount} onChange={handleQuantityChange} />
//                     <Button onClick={() => handleQuantityChange(quantity + 1)}>+</Button>
//                 </div>
//             ),
//         },
//         {
//             title: 'Thành tiền',
//             dataIndex: 'total',
//             render: (text, record) => <span>{record.price * quantity}</span>,
//         },
//         {
//             title: '',
//             dataIndex: 'action',
//             render: () => <Button type="link">🗑</Button>,
//         },
//     ];

//     const data = order.orderItems.map((item, index) => ({
//         key: item.product,
//         product: (
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <img
//                     src={item.image} // Replace with the actual image URL
//                     alt={item.name}
//                     style={{ marginRight: 10 }}
//                 />
//                 <span>{item.name}</span>
//             </div>
//         ),
//         price: item.price,
//         quantity: item.amount || 5,
//         total: item.price * item.amount,
//     }));

//     return (
//         <div style={{ padding: 20 }}>
//             <Row gutter={16}>
//                 <Col span={16}>
//                     <Table columns={columns} dataSource={data} pagination={false} />
//                 </Col>
//                 <Col span={8}>
//                     <div style={{ padding: 20, background: '#f5f5f5' }}>
//                         <Row justify="space-between" style={{ marginBottom: 10 }}>
//                             <Col>Tạm tính</Col>
//                             <Col>0</Col>
//                         </Row>
//                         <Row justify="space-between" style={{ marginBottom: 10 }}>
//                             <Col>Giảm giá</Col>
//                             <Col>0</Col>
//                         </Row>
//                         <Row justify="space-between" style={{ marginBottom: 10 }}>
//                             <Col>Thuế</Col>
//                             <Col>0</Col>
//                         </Row>
//                         <Row justify="space-between" style={{ marginBottom: 10 }}>
//                             <Col>Phí giao hàng</Col>
//                             <Col>0</Col>
//                         </Row>
//                         <Row justify="space-between" style={{ marginBottom: 10, fontWeight: 'bold' }}>
//                             <Col>Tổng tiền</Col>
//                             <Col>0213</Col>
//                         </Row>
//                         <Button type="primary" style={{ width: '100%' }}>
//                             Mua hàng
//                         </Button>
//                     </div>
//                 </Col>
//             </Row>
//         </div>
//     );
// };

// export default OrderPage;

// import React, { useState } from 'react';
// import { Table, Checkbox, InputNumber, Button, Row, Col } from 'antd';
// import { useDispatch, useSelector } from 'react-redux';
// import { decreaseAmount, increaseAmount } from '../../redux/slides/orderSlide';

// const OrderPage = () => {
//     const [quantity, setQuantity] = useState({});
//     const order = useSelector((state => state.order));
//     const dispatch = useDispatch()

//     const handleQuantityChange = (value, key) => {
//         if (value < 1) {
//             value = 1; // Đặt giá trị tối thiểu là 1
//         }
//         setQuantity(prev => ({
//             ...prev,
//             [key]: value
//         }));

//     };
//     // const handleQuantityChange = (type, idProduct) => {
//     //     if (type === 'increase') {

//     //         dispatch(increaseAmount(idProduct))
//     //     } else {
//     //         dispatch(decreaseAmount(idProduct))
//     //     }

//     // };

//     const columns = [
//         {
//             title: 'Tất cả',
//             dataIndex: 'product',
//             render: (text) => <Checkbox>{text}</Checkbox>,
//         },
//         {
//             title: 'Đơn giá',
//             dataIndex: 'price',
//         },
//         {
//             title: 'Số lượng',
//             dataIndex: 'quantity',
//             render: (text, record) => (
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                     <Button onClick={() => handleQuantityChange((quantity[record.key] || record.quantity) - 1, record.key)}>-</Button>
//                     {/* <Button onClick={() => handleQuantityChange('decrease', order?.product)}>-</Button> */}
//                     <InputNumber
//                         min={1}
//                         value={quantity[record.key] || record.quantity}
//                         onChange={(value) => handleQuantityChange(value, record.key)}
//                     />
//                     <Button onClick={() => handleQuantityChange((quantity[record.key] || record.quantity) + 1, record.key)}>+</Button>
//                     {/* <Button onClick={() => handleQuantityChange('increase', order?.product)}>-</Button> */}
//                 </div>
//             ),
//         },
//         {
//             title: 'Thành tiền',
//             dataIndex: 'total',
//             render: (text, record) => <span>{(record.price * (quantity[record.key] || record.quantity)).toFixed(2)}</span>,
//         },
//         {
//             title: '',
//             dataIndex: 'action',
//             render: () => <Button type="link">🗑</Button>,
//         },
//     ];

//     const data = order.orderItems.map((item, index) => ({
//         key: item.product,
//         product: (
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <img
//                     src={item.image} // Replace with the actual image URL
//                     alt={item.name}
//                     style={{ marginRight: 10 }}
//                 />
//                 <span>{item.name}</span>
//             </div>
//         ),
//         price: item.price,
//         quantity: item.amount || 1,
//         total: item.price * (item.amount || 1),
//     }));

//     return (
//         <div style={{ padding: 20 }}>
//             <Row gutter={16}>
//                 <Col span={16}>
//                     <Table columns={columns} dataSource={data} pagination={false} />
//                 </Col>
//                 <Col span={8}>
//                     <div style={{ padding: 20, background: '#f5f5f5' }}>
//                         <Row justify="space-between" style={{ marginBottom: 10 }}>
//                             <Col>Tạm tính</Col>
//                             <Col>{data.reduce((acc, item) => acc + (item.price * (quantity[item.key] || item.quantity)), 0).toFixed(2)}</Col>
//                         </Row>
//                         <Row justify="space-between" style={{ marginBottom: 10 }}>
//                             <Col>Giảm giá</Col>
//                             <Col>0</Col>
//                         </Row>
//                         <Row justify="space-between" style={{ marginBottom: 10 }}>
//                             <Col>Thuế</Col>
//                             <Col>0</Col>
//                         </Row>
//                         <Row justify="space-between" style={{ marginBottom: 10 }}>
//                             <Col>Phí giao hàng</Col>
//                             <Col>0</Col>
//                         </Row>
//                         <Row justify="space-between" style={{ marginBottom: 10, fontWeight: 'bold' }}>
//                             <Col>Tổng tiền</Col>
//                             <Col>{data.reduce((acc, item) => acc + (item.price * (quantity[item.key] || item.quantity)), 0).toFixed(2)}</Col>
//                         </Row>
//                         <Button type="primary" style={{ width: '100%' }}>
//                             Mua hàng
//                         </Button>
//                     </div>
//                 </Col>
//             </Row>
//         </div>
//     );
// };

// export default OrderPage;



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
import { useNavigate } from 'react-router';

const { Title } = Typography;
const PaymentPage = () => {
    const order = useSelector((state => state.order));
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const [localQuantities, setLocalQuantities] = useState({})

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [deliveryMethod, setDeliveryMethod] = useState('FAST');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''


    })
    const handleOnchangeDetails = (e) => {
        console.log('check', e.target.name, e.target.value)
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })
        console.log('e.target.name', e.target.name, e.target.value)

    }
    const [form] = Form.useForm();
    const mutationUpdate = useMutationHooks(

        async (data) => {

            const { id, token, ...rests } = data;


            const res = await UserService.updateUser(id, rests, token);


            return res;
        }
    );
    const mutationAddOrder = useMutationHooks(

        async (data) => {

            const { id, token, ...rests } = data;


            const res = await OrderService.createOrder(token, { ...rests },);


            return res;
        }
    );
    const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    useEffect(() => {
        const initialQuantities = {};
        order.orderItems.forEach(item => {
            initialQuantities[item.product] = item.amount;
        });
        setLocalQuantities(initialQuantities);
    }, [order]);
    useEffect(() => {
        if (isSuccessUpdated) {
            message.success()
            handleCancel();
            queryClient.invalidateQueries('user');
            window.location.reload(); // load lai trang

        } else if (isErrorUpdated) {
            message.error()
        }
    }, [isSuccessUpdated])


    useEffect(() => {
        form.setFieldsValue(stateUserDetails)
    }, [form, stateUserDetails])
    useEffect(() => {
        if (isOpenModalUpdateInfo) {
            setStateUserDetails({
                name: user?.name,
                email: user?.email,
                address: user?.address,
                phone: user?.phone
            })
        }
    }, [isOpenModalUpdateInfo])



    let a = 0;

    if (deliveryMethod === 'FAST') {
        a = 10
    } else {
        a = 15
    }
    console.log('delivery', deliveryMethod)


    // console.log('shipping', shippingMethod)


    const handleCancelUpdate = () => {
        setIsOpenModalUpdateInfo(false)

    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const handleUpdateInfoUser = () => {
        console.log('stateUserDetails', stateUserDetails)
        const { name, email, phone, address } = stateUserDetails
        if (name && address && phone && email) {
            mutationUpdate.mutate({ id: user?.id, ...stateUserDetails, token: user?.access_token })
            setIsOpenModalUpdateInfo(false)
        }

    }
    const handleQuantityChange = (type, idProduct) => {
        const currentQuantity = localQuantities[idProduct];
        if (type === 'increase') {
            dispatch(increaseAmount(idProduct));
            setLocalQuantities({
                ...localQuantities,
                [idProduct]: currentQuantity + 1
            });
        } else if (type === 'decrease' && currentQuantity > 1) {
            dispatch(decreaseAmount(idProduct));
            setLocalQuantities({
                ...localQuantities,
                [idProduct]: currentQuantity - 1
            });
        }
    };

    const handleAddCard = () => {
        if (!user?.phone || !user?.address || !user.name) {

            setIsOpenModalUpdateInfo(true)
        } else {
            setIsModalOpen(true)
        }


    }
    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true)

    }

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
                    <Button onClick={() => handleQuantityChange('decrease', record.key)}>-</Button>
                    <InputNumber
                        min={1}
                        value={localQuantities[record.key]}
                        readOnly
                    />
                    <Button onClick={() => handleQuantityChange('increase', record.key)}>+</Button>
                </div>
            ),
        },
        {
            title: 'Thành tiền',
            dataIndex: 'total',
            render: (text, record) => <span>{(record.price * localQuantities[record.key]).toFixed(2)}</span>,
        },
        {
            title: '',
            dataIndex: 'action',
            render: (text, record) => (
                <Button type="link" onClick={() => dispatch(removeOrderProduct(record.key))}>🗑</Button>
            ),
        },
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

    const calculateTotal = () => data.reduce((acc, item) => acc + item.total, 0).toFixed(2);
    let total = calculateTotal()
    console.log(total)
    const handleAddOrder = () => {


        if (user?.access_token && order?.orderItems && user?.name && user?.address && user?.phone && user?.id) {
            mutationAddOrder.mutate(
                {
                    token: user?.access_token, orderItems: order?.orderItems, fullName: user?.name, address: user?.address, phone: user?.phone, paymentMethod: paymentMethod, deliveryMethod: deliveryMethod, totalPrice: total, user: user?.id

                }
            )
        }


    }
    console.log('order', order, user)
    const { data: dataAdd, isSuccess: isSuccessAdd, isError: isErrorAdd } = mutationAddOrder
    useEffect(() => {
        if (isSuccessAdd && dataAdd?.status === 'OK') {
            message.success('Đặt hàng thành công')
            navigate('/orderSuccess', {
                state: {
                    paymentMethod,
                    deliveryMethod,
                    order: order?.orderItems
                }
            })
        } else if (isErrorAdd) {
            message.error()
        }
    }, [isSuccessAdd, isErrorAdd])





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

                        <Row justify="space-between" style={{ marginBottom: 10 }}>
                            <Col>
                                <span>Địa chỉ :</span>
                                <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>{user?.address}</span>
                                <span onClick={handleChangeAddress} style={{ color: 'blue', marginLeft: '10px', cursor: 'pointer' }}>Thay đổi</span>
                            </Col>
                            {/* <Col>{user?.address}</Col> */}
                        </Row>
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
                            <Col>{calculateTotal()}</Col>
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
                            <Col>{calculateTotal() - a} VND</Col>
                        </Row>
                        {/* <Button type="primary" style={{ width: '100%' }}>
                            Mua hàng
                        </Button> */}
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
                            textButton={'Mua Hang'}
                            styleTextButton={{ color: '#fff', fontSize: "15px", fontWeight: '700' }}

                        >

                        </ButtonComponent>
                        <ModalComponent forceRender title="Tạo sả phẩm" open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInfoUser}>
                            <Form
                                name="basic"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                style={{
                                    maxWidth: 600,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={handleUpdateInfoUser}
                                form={form}

                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your name!',
                                        },
                                    ]}
                                >
                                    <InputComponent value={stateUserDetails.name} onChange={handleOnchangeDetails} name="name" />
                                </Form.Item>



                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your Email!' }]}
                                >
                                    <InputComponent value={stateUserDetails.email} onChange={handleOnchangeDetails} name="email" />
                                </Form.Item>
                                <Form.Item
                                    label="Address"
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Adrress!',
                                        },
                                    ]}
                                >
                                    <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
                                </Form.Item>
                                <Form.Item
                                    label="Phone"
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your phone!',
                                        },
                                    ]}
                                >
                                    <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
                                </Form.Item>






                            </Form>
                        </ModalComponent>
                        <ModalComponent
                            forceRender
                            title="Thanh toán sản phẩm"
                            isOpen={isModalOpen}
                            onCancel={handleCancel}
                            onOk={handleCancel}


                        >
                            <div>Thanh toán sản phẩm thành công</div>
                        </ModalComponent>
                    </div>
                </Col>

            </Row>

        </div>

    );
};

export default PaymentPage;



