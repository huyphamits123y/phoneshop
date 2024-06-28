import React, { useEffect } from "react";
import { PlusCircleFilled, DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Modal, Form } from 'antd'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../TableComponent/TableComponent'
import { useState } from 'react'
import { getBase64 } from '../../utils'
import * as ProductService from '../../services/ProductService';
import { useMutationHooks } from "../../hooks/useMutationHook";
import InputComponent from '../InputComponent/InputComponent';
import * as message from '../../components/Message/Message';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from 'react-redux'
const AdminProduct = () => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [rowSelected, setRowSelected] = useState('')
    const user = useSelector((state) => state?.user)
    const queryClient = useQueryClient();
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'organe', fontSize: '30px', cursor: 'pointer' }} />
                <EditOutlined style={{ color: 'organe', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
            </div>
        )
    }

    const [stateProduct, setStateProduct] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',

    })
    const [stateProductDetails, setStateProductDetails] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',

    })
    const mutation = useMutationHooks(
        (data) => {
            const {
                name,
                price,
                description,
                rating,
                image,
                type,
                countInStock: countInStock
            } = data
            const res = ProductService.createProduct(
                {
                    name,
                    price,
                    description,
                    rating,
                    image,
                    type,
                    countInStock
                }
            )
            return res;
        }
    )
    // const mutationUpdate = useMutationHooks(
    //     async (data) => {
    //         const {
    //             id,
    //             token,
    //             ...rests
    //         } = data
    //         const res = await ProductService.updatedProduct(
    //             {
    //                 id,
    //                 token,
    //                 rests
    //             }
    //         )

    //         return res;
    //     }
    // )
    const mutationUpdate = useMutationHooks(

        async (data) => {

            const { id, token, ...rests } = data;


            const res = await ProductService.updatedProduct(id, token, rests);


            return res;
        }
    );

    const [form] = Form.useForm();
    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct()
        return res;
    }
    const fetchGetDetailsProduct = async (rowSelected) => {
        console.log('row', rowSelected)
        try {
            const res = await ProductService.getDetailsProduct(rowSelected)

            if (res?.data) {
                setStateProductDetails({
                    name: res?.data?.name,
                    price: res?.data?.price,
                    description: res?.data?.description,
                    rating: res?.data?.rating,
                    image: res?.data?.image,
                    type: res?.data?.type,
                    countInStock: res?.data?.countInStock,
                })
            }
            else {
                console.log('that bai')
            }
            console.log('res', res)
        } catch (e) {
            console.log('error', e)
        }


    }
    useEffect(() => {
        form.setFieldsValue(stateProductDetails)
    }, [form, stateProductDetails])
    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsProduct(rowSelected)
        }

    }, [rowSelected])
    console.log('stateproductDetails', stateProductDetails)
    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    console.log('dataUpdated', dataUpdated)
    const { isLoading: isLoadingProduct, data: products } = useQuery({ queryKey: ['products'], queryFn: getAllProducts })
    console.log('product', products)
    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success()
            handleCancel();
            queryClient.invalidateQueries('products');
        } else if (isError) {
            message.error()
        }
    }, [isSuccess])
    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success()
            handleCloseDrawer()
            queryClient.invalidateQueries('products');
        } else if (isErrorUpdated) {
            message.error()
        }
    }, [isSuccessUpdated])
    const onFinish = () => {
        mutation.mutate(stateProduct)
        console.log('finish', stateProduct);


    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];
    // const data = [];
    // for (let i = 0; i < 46; i++) {
    //     data.push({
    //         key: i,
    //         name: `Edward King ${i}`,
    //         age: 32,
    //         address: `London, Park Lane no. ${i}`,
    //     });
    // }
    const dataTable = products?.data?.length && products?.data?.map((product) => {
        return { ...product, key: product._id }

    })

    const handleOk = () => {
        onFinish()

    }
    console.log('user', user)
    const onUpdateProduct = async () => {

        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateProductDetails })


    }
    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: '',
        })
        form.resetFields();
    };
    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateProductDetails({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: '',
        })
        form.resetFields();
    };


    //   const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    //   };

    const handleOnchangeAvatar = async (info) => {
        const { file } = info; // Lấy đối tượng file từ thông tin của upload
        if (!file.url && !file.preview) {
            // Nếu không có url và preview, thực hiện chuyển đổi và gán preview
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview
        })
        // setAvatar(file.preview); // Lưu preview của file vào state
    };

    const handleOnchangeAvatarDetails = async (info) => {
        const { file } = info; // Lấy đối tượng file từ thông tin của upload
        if (!file.url && !file.preview) {
            // Nếu không có url và preview, thực hiện chuyển đổi và gán preview
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview
        })
        // setAvatar(file.preview); // Lưu preview của file vào state
    };
    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
        console.log('e.target.name', e.target.name, e.target.value)

    }
    const handleOnchangeDetails = (e) => {
        console.log('check', e.target.name, e.target.value)
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value
        })
        console.log('e.target.name', e.target.name, e.target.value)

    }
    const handleDetailsProduct = () => {
        if (rowSelected) {
            fetchGetDetailsProduct()
            console.log('fetdetai', rowSelected)

        }
        setIsOpenDrawer(true)
        console.log('rowSelected', rowSelected)
    }
    return (
        <div>
            <WrapperHeader>Quản lí sản phẩm</WrapperHeader>
            <div>
                <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusCircleFilled style={{ fontSize: '60px' }} /></Button>
            </div>
            <div style={{ marginTop: '10px' }}>
                <TableComponent columns={columns} isLoading={isLoadingProduct} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id)
                        }
                    }
                }} />
            </div>
            <Modal title="Tạo sả phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
                    onFinish={onFinish}
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
                        <InputComponent value={stateProduct.name} onChange={handleOnchange} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your type!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.type} onChange={handleOnchange} name="type" />
                    </Form.Item>
                    <Form.Item
                        label="countInStock"
                        name="countInStock"
                        rules={[{ required: true, message: 'Please input your inStock!' }]}
                    >
                        <InputComponent value={stateProduct.countInstock} onChange={handleOnchange} name="countInStock" />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your price!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price" />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your description!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description" />
                    </Form.Item>
                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your rating!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.rating} onChange={handleOnchange} name="rating" />
                    </Form.Item>

                    <Form.Item
                        label="image"
                        name="image"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your image!',
                            },
                        ]}
                    >
                        <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button>Select File</Button>
                            {stateProduct?.image && (
                                <img src={stateProduct?.image} style={{
                                    height: '60px',
                                    width: '60px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    marginLeft: '10px'
                                }} alt="avatar" />
                            )}
                        </WrapperUploadFile>

                    </Form.Item>




                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <DrawerComponent title='Chi tiet san pham' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">

                <Form
                    name="basic"
                    labelCol={{
                        span: 2,
                    }}
                    wrapperCol={{
                        span: 22,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onUpdateProduct}
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
                        <InputComponent value={setStateProductDetails.name} onChange={handleOnchangeDetails} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your type!',
                            },
                        ]}
                    >
                        <InputComponent value={setStateProductDetails.type} onChange={handleOnchangeDetails} name="type" />
                    </Form.Item>
                    <Form.Item
                        label="countInStock"
                        name="countInStock"
                        rules={[{ required: true, message: 'Please input your inStock!' }]}
                    >
                        <InputComponent value={setStateProductDetails.countInstock} onChange={handleOnchangeDetails} name="countInStock" />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your price!',
                            },
                        ]}
                    >
                        <InputComponent value={setStateProductDetails.price} onChange={handleOnchangeDetails} name="price" />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your description!',
                            },
                        ]}
                    >
                        <InputComponent value={setStateProductDetails.description} onChange={handleOnchangeDetails} name="description" />
                    </Form.Item>
                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your rating!',
                            },
                        ]}
                    >
                        <InputComponent value={setStateProductDetails.rating} onChange={handleOnchangeDetails} name="rating" />
                    </Form.Item>

                    <Form.Item
                        label="image"
                        name="image"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your image!',
                            },
                        ]}
                    >
                        <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                            <Button>Select File</Button>
                            {setStateProductDetails?.image && (
                                <img src={setStateProductDetails?.image} style={{
                                    height: '60px',
                                    width: '60px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    marginLeft: '10px'
                                }} alt="avatar" />
                            )}
                        </WrapperUploadFile>

                    </Form.Item>




                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Apply
                        </Button>
                    </Form.Item>
                </Form>

            </DrawerComponent>
        </div>
    )
}
export default AdminProduct







