import React from 'react'

import ModalComponent from "../ModalComponent/ModalComponent";
import TableComponent from '../TableComponent/TableComponent'
import { useEffect } from "react"
import { PlusCircleFilled, DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Modal, Form } from 'antd'
import { WrapperHeader, WrapperUploadFile } from './style'
import { useState } from 'react'
import { getBase64 } from '../../utils'
import * as OrderService from '../../services/OrderService';
import { useMutationHooks } from "../../hooks/useMutationHook";
import InputComponent from '../InputComponent/InputComponent';
import * as message from '../Message/Message';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from 'react-redux'
import { orderContant } from '../../contant';
import PieChartComponent from './PieChart';
const OrderAdmin = () => {
    // const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    // const [rowSelected, setRowSelected] = useState('')
    // const user = useSelector((state) => state?.user)
    // const order = useSelector((state) => state?.order)





    // const [form] = Form.useForm();
    // const getAllOrder = async () => {
    //     const res = await OrderService.getAllOrder()
    //     return res;
    // }

    // const { isLoading: isLoadinguser, data: users } = useQuery({ queryKey: ['user'], queryFn: getAllOrder })




    const columns = [
        {
            title: 'Username',
            dataIndex: 'userName',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.userName.length - b.userName.length
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone.length - b.phone.length
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a, b) => a.address.length - b.address.length
        },
        {
            title: 'Paided',
            dataIndex: 'isPaid',
            sorter: (a, b) => a.isPaid.length - b.isPaid.length
        },
        {
            title: 'Shipped',
            dataIndex: 'deliveryMethod',
            sorter: (a, b) => a.deliveryMethod.length - b.deliveryMethod.length
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
            sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            render: (price) => `${price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`,
            sorter: (a, b) => a.totalPrice - b.totalPrice
        },


    ];

    // // const dataTable = user?.data?.length && user?.data?.map((user) => {
    // //     return { ...user, key: user._id }

    // // })
    // const dataTable = order?.data?.length && order?.data?.map((orders) => ({ ...orders, key: user._id, isAdmin: user.isAdmin ? 'TRUE' : 'FALSE' })) || [];

    // console.log('datatable', dataTable)

    const user = useSelector(state => state.user);

    const queryClient = useQueryClient();

    const fetchGetListOrder = () => {
        return OrderService.getListsOrderAll()
    };

    const queryOrder = useQuery({
        queryKey: ['order'],
        queryFn: fetchGetListOrder
    });

    const { isLoading: isLoadingOrder, data: paymentOrders } = queryOrder;


    console.log('user', user?.id)
    console.log('orderid', paymentOrders?._id)
    console.log('payment', paymentOrders)
    const orders = paymentOrders?.data || [];
    console.log('orders', orders)
    const dataTable = orders.length && orders.map((order) => {
        return {
            ...order,
            key: order._id,
            userName: order?.shippingAddress?.fullName,
            phone: order?.shippingAddress?.phone,
            address: order?.shippingAddress?.address,
            paymentMethod: orderContant.paymentMethod[order?.paymentMethod],
            deliveryMethod: orderContant.deliveryMethod[order?.deliveryMethod],
            isPaid: order?.isPaid ? 'TRUE' : 'FALSE',
            isDelivery: order?.isDelivery ? 'TRUE' : 'FALSE'
        };
    });
    console.log('data', dataTable)








    return (
        <div>
            <WrapperHeader>Quản lí đơn hàng</WrapperHeader>
            <div style={{ height: 200, width: 200 }}>
                <PieChartComponent data={orders} />
            </div>

            <div style={{ marginTop: '20px' }}>
                <TableComponent columns={columns} data={dataTable} onRow={(record, rowIndex) => {
                    // return {
                    //     onClick: event => {
                    //         setRowSelected(record._id)
                    //     }
                    // }
                }} />
            </div>


        </div>
    )
}
export default OrderAdmin