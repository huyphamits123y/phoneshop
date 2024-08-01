
// import React, { useState, useEffect } from 'react';
// import { Table, Checkbox, InputNumber, Button, Row, Col, Modal, Form } from 'antd';
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
// import { useNavigate } from 'react-router';
// const OrderPage = () => {
//     const order = useSelector((state => state.order));
//     const user = useSelector((state) => state.user)
//     const dispatch = useDispatch();
//     const [localQuantities, setLocalQuantities] = useState({})

//     const [isModalOpen, setIsModalOpen] = useState(false)

//     const navigate = useNavigate();
//     const queryClient = useQueryClient();
//     const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
//     const [stateUserDetails, setStateUserDetails] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         address: ''


//     })
//     // order.orderItems.forEach(item => {
//     //     console.log('userIdccc', item?.userId);
//     // });

//     const handleOnchangeDetails = (e) => {
//         console.log('check', e.target.name, e.target.value)
//         setStateUserDetails({
//             ...stateUserDetails,
//             [e.target.name]: e.target.value
//         })
//         console.log('e.target.name', e.target.name, e.target.value)

//     }
//     const [form] = Form.useForm();
//     const mutationUpdate = useMutationHooks(

//         async (data) => {

//             const { id, token, ...rests } = data;


//             const res = await UserService.updateUser(id, rests, token);


//             return res;
//         }
//     );
//     // console.log('userid', user?.id)
//     const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
//     useEffect(() => {
//         const initialQuantities = {};
//         order.orderItems.forEach(item => {
//             initialQuantities[item.product] = item.amount;
//         });
//         setLocalQuantities(initialQuantities);
//     }, [order]);
//     useEffect(() => {
//         if (isSuccessUpdated) {
//             message.success()
//             handleCancel();
//             queryClient.invalidateQueries('user');
//             window.location.reload(); // load lai trang

//         } else if (isErrorUpdated) {
//             message.error()
//         }
//     }, [isSuccessUpdated])


//     useEffect(() => {
//         form.setFieldsValue(stateUserDetails)
//     }, [form, stateUserDetails])
//     useEffect(() => {
//         if (isOpenModalUpdateInfo) {
//             setStateUserDetails({
//                 name: user?.name,
//                 email: user?.email,
//                 address: user?.address,
//                 phone: user?.phone
//             })
//         }
//     }, [isOpenModalUpdateInfo])


//     // const handleQuantityChange = (type, idProduct) => {
//     //     const itemOrder = order.orderItems.find(item => item.product === idProduct);
//     //     if (itemOrder) {
//     //         if (type === 'increase') {
//     //             dispatch(increaseAmount(idProduct));
//     //         } else if (type === 'decrease') {
//     //             dispatch(decreaseAmount(idProduct));
//     //         }
//     //     }
//     // };

//     // console.log("order ? ", order?.orderItems)

//     const handleCancelUpdate = () => {
//         setIsOpenModalUpdateInfo(false)

//     }
//     const handleCancel = () => {
//         setIsModalOpen(false)
//     }
//     const handleUpdateInfoUser = () => {
//         console.log('stateUserDetails', stateUserDetails)
//         const { name, email, phone, address } = stateUserDetails
//         if (name && address && phone && email) {
//             mutationUpdate.mutate({ id: user?.id, ...stateUserDetails, token: user?.access_token })
//             setIsOpenModalUpdateInfo(false)
//         }

//     }
//     const handleQuantityChange = (type, idProduct) => {
//         const currentQuantity = localQuantities[idProduct];
//         console.log('type', type)
//         console.log('idProduct', idProduct)

//         if (type === 'increase') {
//             console.log('increase')
//             dispatch(increaseAmount(idProduct));
//             setLocalQuantities({
//                 ...localQuantities,
//                 [idProduct]: currentQuantity + 1
//             });
//         } else if (type === 'decrease' && currentQuantity > 1) {
//             console.log('decrease')
//             dispatch(decreaseAmount(idProduct));

//             setLocalQuantities({
//                 ...localQuantities,
//                 [idProduct]: currentQuantity - 1
//             });
//         }
//     };
//     const handleAddCard = () => {
//         if (!user?.phone || !user?.address || !user.name) {

//             setIsOpenModalUpdateInfo(true)
//         } else {
//             navigate('/payment')
//         }


//     }
//     const handleChangeAddress = () => {
//         setIsOpenModalUpdateInfo(true)

//     }

//     const columns = [
//         {
//             title: 'Tất cả',
//             dataIndex: 'product',
//             // render: (text) => <Checkbox>{text}</Checkbox>,
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
//                     <Button onClick={() => handleQuantityChange('decrease', record.key)}>-</Button>
//                     <InputNumber
//                         min={1}
//                         value={localQuantities[record.key]}
//                         readOnly
//                     />
//                     <Button onClick={() => handleQuantityChange('increase', record.key)}>+</Button>
//                 </div>
//             ),
//         },
//         {
//             title: 'Thành tiền',
//             dataIndex: 'total',
//             render: (text, record) => <span>{(record.price * localQuantities[record.key]).toFixed(2)}</span>,
//         },
//         {
//             title: '',
//             dataIndex: 'action',
//             render: (text, record) => (
//                 // <Button type="link" onClick={() => dispatch(removeOrderProduct(record.key))}>🗑</Button>
//                 <Button type="link" onClick={() => dispatch(removeOrderProduct({ idProduct: record.key }))}>🗑</Button>
//             ),
//         },
//     ];

//     const data = order.orderItems.map((item) => ({
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
//         // quantity: item.amount,
//         // total: item.price * item.amount,
//         quantity: localQuantities[item.product],
//         total: item.price * localQuantities[item.product],
//     }));
//     // const data = order.orderItems
//     //     .filter(item => user?.id === item?.userId)
//     //     .map((item) => ({
//     //         key: item.product,
//     //         product: (
//     //             <div style={{ display: 'flex', alignItems: 'center' }}>
//     //                 <img
//     //                     src={item.image}
//     //                     alt={item.name}
//     //                     style={{ marginRight: 10 }}
//     //                 />
//     //                 <span>{item.name}</span>
//     //             </div>
//     //         ),
//     //         price: item.price,
//     //         quantity: localQuantities[item.product],
//     //         total: item.price * localQuantities[item.product],
//     //     }));

//     const calculateTotal = () => data.reduce((acc, item) => acc + item.total, 0).toFixed(2);

//     return (
//         <div style={{ padding: 20 }}>
//             <Row gutter={16}>
//                 <Col span={16}>
//                     {/* {user?.id <Table columns={columns} dataSource={data} pagination={false} />} */}
//                     {user?.id ? (
//                         <Table columns={columns} dataSource={data} pagination={false} />
//                     ) : (
//                         // <p>No ID provided</p> // You can customize this message as needed

//                         <Table columns={columns} pagination={false} />
//                     )}
//                     {/* <Table columns={columns} dataSource={data} pagination={false} /> */}
//                 </Col>
//                 <Col span={8}>

//                     <div style={{ padding: 20, background: '#f5f5f5' }}>

//                         <Row justify="space-between" style={{ marginBottom: 10 }}>
//                             <Col>
//                                 <span>Địa chỉ :</span>
//                                 <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>{user?.address}</span>
//                                 <span onClick={handleChangeAddress} style={{ color: 'blue', marginLeft: '10px', cursor: 'pointer' }}>Thay đổi</span>
//                             </Col>
//                             {/* <Col>{user?.address}</Col> */}
//                         </Row>
//                         <Row justify="space-between" style={{ marginBottom: 10 }}>
//                             <Col>Email :</Col>
//                             <Col>{user?.email}</Col>
//                         </Row>
//                         <Row justify="space-between" style={{ marginBottom: 10 }}>
//                             <Col>Phone :</Col>
//                             <Col>{user?.phone}</Col>
//                         </Row>
//                         <Row justify="space-between" style={{ marginBottom: 10 }}>
//                             <Col>Tạm tính</Col>
//                             <Col>{calculateTotal()}</Col>
//                         </Row>
//                         {/* <Row justify="space-between" style={{ marginBottom: 10 }}>
//                             <Col>Giảm giá</Col>
//                             <Col>0</Col>
//                         </Row>
//                         <Row justify="space-between" style={{ marginBottom: 10 }}>
//                             <Col>Thuế</Col>
//                             <Col>0</Col>
//                         </Row> */}
//                         <Row justify="space-between" style={{ marginBottom: 10 }}>
//                             <Col>Phí giao hàng</Col>
//                             <Col>3 VND</Col>
//                         </Row>
//                         <Row justify="space-between" style={{ marginBottom: 10, fontWeight: 'bold' }}>
//                             <Col>Tổng tiền</Col>
//                             <Col>{calculateTotal() - 3} VND</Col>
//                         </Row>
//                         {/* <Button type="primary" style={{ width: '100%' }}>
//                             Mua hàng
//                         </Button> */}
//                         <ButtonComponent
//                             onClick={() => handleAddCard()}
//                             size={40}
//                             styleButton={{
//                                 background: 'rgb(255,57,69)',
//                                 height: '48px',
//                                 width: '320px',
//                                 border: 'none',
//                                 borderRadius: '4px'
//                             }}
//                             textButton={'Mua Hang'}
//                             styleTextButton={{ color: '#fff', fontSize: "15px", fontWeight: '700' }}

//                         >

//                         </ButtonComponent>
//                         <ModalComponent forceRender title="Tạo sả phẩm" open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInfoUser}>
//                             <Form
//                                 name="basic"
//                                 labelCol={{
//                                     span: 8,
//                                 }}
//                                 wrapperCol={{
//                                     span: 16,
//                                 }}
//                                 style={{
//                                     maxWidth: 600,
//                                 }}
//                                 initialValues={{
//                                     remember: true,
//                                 }}
//                                 onFinish={handleUpdateInfoUser}
//                                 form={form}

//                                 autoComplete="off"
//                             >
//                                 <Form.Item
//                                     label="Name"
//                                     name="name"
//                                     rules={[
//                                         {
//                                             required: true,
//                                             message: 'Please input your name!',
//                                         },
//                                     ]}
//                                 >
//                                     <InputComponent value={stateUserDetails.name} onChange={handleOnchangeDetails} name="name" />
//                                 </Form.Item>



//                                 <Form.Item
//                                     label="Email"
//                                     name="email"
//                                     rules={[{ required: true, message: 'Please input your Email!' }]}
//                                 >
//                                     <InputComponent value={stateUserDetails.email} onChange={handleOnchangeDetails} name="email" />
//                                 </Form.Item>
//                                 <Form.Item
//                                     label="Address"
//                                     name="address"
//                                     rules={[
//                                         {
//                                             required: true,
//                                             message: 'Please input your Adrress!',
//                                         },
//                                     ]}
//                                 >
//                                     <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
//                                 </Form.Item>
//                                 <Form.Item
//                                     label="Phone"
//                                     name="phone"
//                                     rules={[
//                                         {
//                                             required: true,
//                                             message: 'Please input your phone!',
//                                         },
//                                     ]}
//                                 >
//                                     <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
//                                 </Form.Item>






//                             </Form>
//                         </ModalComponent>
//                         {/* <ModalComponent
//                             forceRender
//                             title="Thanh toán sản phẩm"
//                             isOpen={isModalOpen}
//                             onCancel={handleCancel}
//                             onOk={handleCancel}


//                         >
//                             <div>Thanh toán sản phẩm thành công</div>
//                         </ModalComponent> */}
//                     </div>
//                 </Col>

//             </Row>

//         </div>

//     );
// };

// export default OrderPage;











import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col, Modal, Form, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeOrderProduct } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../utils';
import { useQueryClient } from "@tanstack/react-query";
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from '../../components/Message/Message';
import * as UserService from '../../services/UserService';
import { useNavigate } from 'react-router';

const OrderPage = () => {
    const order = useSelector(state => state.order);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const [form] = Form.useForm();
    const mutationUpdate = useMutationHooks(
        async (data) => {
            const { id, token, ...rests } = data;
            const res = await UserService.updateUser(id, rests, token);
            return res;
        }
    );

    const { isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;

    useEffect(() => {
        if (isSuccessUpdated) {
            message.success();
            handleCancel();
            queryClient.invalidateQueries('user');
            window.location.reload(); // load lại trang
        } else if (isErrorUpdated) {
            message.error();
        }
    }, [isSuccessUpdated]);

    useEffect(() => {
        form.setFieldsValue(stateUserDetails);
    }, [form, stateUserDetails]);

    useEffect(() => {
        if (isOpenModalUpdateInfo) {
            setStateUserDetails({
                name: user?.name,
                email: user?.email,
                address: user?.address,
                phone: user?.phone
            });
        }
    }, [isOpenModalUpdateInfo]);

    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleCancelUpdate = () => {
        setIsOpenModalUpdateInfo(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleUpdateInfoUser = () => {
        const { name, email, phone, address } = stateUserDetails;
        if (name && address && phone && email) {
            mutationUpdate.mutate({ id: user?.id, ...stateUserDetails, token: user?.access_token });
            setIsOpenModalUpdateInfo(false);
        }
    };

    const handleQuantityChange = (type, idProduct) => {
        if (type === 'increase') {
            dispatch(increaseAmount({ idProduct }));
        } else if (type === 'decrease') {
            dispatch(decreaseAmount({ idProduct }));
        }
    };

    const handleAddCard = () => {
        if (!user?.phone || !user?.address || !user.name) {
            setIsOpenModalUpdateInfo(true);
        } else {
            navigate('/payment');
        }
    };

    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true);
    };

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
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button onClick={() => handleQuantityChange('decrease', record.key)}>-</Button>
                    <InputNumber
                        min={1}
                        value={record.quantity}
                        readOnly
                    />
                    <Button onClick={() => handleQuantityChange('increase', record.key)}>+</Button>
                </div>
            ),
        },
        {
            title: 'Thành tiền',
            dataIndex: 'total',
            render: (text, record) => <span>{(record.price * record.quantity).toFixed(2)}</span>,
        },
        {
            title: '',
            dataIndex: 'action',
            render: (text, record) => (
                <Button type="link" onClick={() => dispatch(removeOrderProduct({ idProduct: record.key }))}>🗑</Button>
                // <Button type="link" onClick={() => dispatch(removeOrderProduct(record.key))}>🗑</Button>
            ),
        },
    ];

    const data = order.orderItems.map(item => ({
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
        quantity: item.amount, // Use amount from Redux store
        total: item.price * item.amount,
    }));

    const calculateTotal = () => data.reduce((acc, item) => acc + item.total, 0).toFixed(2);

    return (
        <div style={{ padding: 20 }}>
            <Row gutter={16}>
                <Col span={16}>
                    <Table columns={columns} dataSource={data} pagination={false} />
                </Col>
                <Col span={8}>
                    <div style={{ padding: 20, background: '#f5f5f5' }}>
                        <Row justify="space-between" style={{ marginBottom: 10 }}>
                            <Col>
                                <span>Địa chỉ :</span>
                                <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>{user?.address}</span>
                                <span onClick={handleChangeAddress} style={{ color: 'blue', marginLeft: '10px', cursor: 'pointer' }}>Thay đổi</span>
                            </Col>
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
                        <Row justify="space-between" style={{ marginBottom: 10 }}>
                            <Col>Phí giao hàng</Col>
                            <Col>3 VND</Col>
                        </Row>
                        <Row justify="space-between" style={{ marginBottom: 10, fontWeight: 'bold' }}>
                            <Col>Tổng tiền</Col>
                            <Col>{calculateTotal() - 3} VND</Col>
                        </Row>
                        <ButtonComponent
                            onClick={() => handleAddCard()}
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
                        />
                        <ModalComponent forceRender title="Tạo sả phẩm" open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInfoUser}>
                            <Form
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                style={{ maxWidth: 600 }}
                                initialValues={{ remember: true }}
                                onFinish={handleUpdateInfoUser}
                                form={form}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[{ required: true, message: 'Please input your name!' }]}
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
                                    rules={[{ required: true, message: 'Please input your Address!' }]}
                                >
                                    <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
                                </Form.Item>
                                <Form.Item
                                    label="Phone"
                                    name="phone"
                                    rules={[{ required: true, message: 'Please input your phone!' }]}
                                >
                                    <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
                                </Form.Item>
                            </Form>
                        </ModalComponent>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default OrderPage;


