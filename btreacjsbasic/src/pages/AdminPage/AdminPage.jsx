import React from 'react'
import { Menu } from 'antd'
import { useState } from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import OrderAdmin from '../../components/OrderAdmin/OrderAdmin';
const AdminPage = () => {
    const [openKeys, setOpenKeys] = useState(['user'])
    const [SelectedKeys, SetSelectedKeys] = useState('')
    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return (
                    <AdminUser />
                )
            case 'product':
                return (
                    <AdminProduct />
                )
            case 'order':
                return (
                    <OrderAdmin />
                )
            default:
                return <></>
        }

    }
    const items = [
        {
            key: 'user',
            label: 'Người dùng',
            icon: <UserOutlined />,

        },
        {
            key: 'product',
            label: 'Sản phẩm',
            icon: <AppstoreOutlined />,

        },
        {
            key: 'order',
            label: 'Đơn hàng',
            icon: <ShoppingCartOutlined />,

        },

    ];

    const onClick = (e) => {
        console.log('click ', e);
        SetSelectedKeys(e.key);
        console.log('label', e.key)
    };
    return (
        // <Menu 
        // mode="inline"
        // openKeys={openKeys}
        // onOpenChange={onOpenChange}
        // style={{
        //     width:256,
        // }}
        // items={items}
        // />
        <>
            <HeaderComponent isHiddenSearch isHiddenCart />
            <div style={{ display: 'flex' }}>
                <Menu
                    onClick={onClick}
                    style={{
                        width: 256,
                        boxShadow: '1px 1px 2px #ccc',
                        height: '100vh'
                    }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}

                    mode="inline"
                    items={items}
                />
                <div style={{ flex: 1, padding: '15px' }}>
                    {/* {SelectedKeys === '6' && <span>Key la 6</span>} */}
                    {renderPage(SelectedKeys)}
                    <span>test</span>
                </div>
            </div>
        </>
    )
}
export default AdminPage
// import React from "react";
// const AdminPage = () => {
//     return (
//         <div>ccne</div>
//     )
// }
// export default AdminPage