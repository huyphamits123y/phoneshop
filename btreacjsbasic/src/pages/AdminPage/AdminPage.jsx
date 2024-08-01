import React from 'react'
import { Menu } from 'antd'
import { useState } from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
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
            default:
                return <></>
        }

    }
    const items = [
        {
            key: 'user',
            label: 'Người dùng',
            icon: <UserOutlined />,
            // children: [
            //     {
            //         key: 'g1',

            //         type: 'group',
            //         children: [
            //             {
            //                 key: '1',
            //                 label: 'Option 1',
            //             },
            //             {
            //                 key: '2',
            //                 label: 'Option 2',
            //             },
            //             {
            //                 key: '3',
            //                 label: 'Option 3',
            //             },
            //             {
            //                 key: '4',
            //                 label: 'Option 4',
            //             },
            //         ],
            //     }

            // ],
        },
        {
            key: 'product',
            label: 'Sản phẩm',
            icon: <AppstoreOutlined />,
            // children: [
            //     {
            //         key: '5',
            //         label: 'Option 5',
            //     },
            //     {
            //         key: '6',
            //         label: 'Option 6',
            //     },
            //     {
            //         key: 'sub3',
            //         label: 'Submenu',
            //         children: [
            //             {
            //                 key: '7',
            //                 label: 'Option 7',
            //             },
            //             {
            //                 key: '8',
            //                 label: 'Option 8',
            //             },
            //         ],
            //     },
            // ],
        },
        // {
        //         type: 'divider',
        //     },
        //     {
        //         key: 'sub4',
        //         label: 'Navigation Three',
        //         icon: <SettingOutlined />,
        //         children: [
        //             {
        //                 key: '9',
        //                 label: 'Option 9',
        //             },
        //             {
        //                 key: '10',
        //                 label: 'Option 10',
        //             },
        //             {
        //                 key: '11',
        //                 label: 'Option 11',
        //             },
        //             {
        //                 key: '12',
        //                 label: 'Option 12',
        //             },
        //         ],
        //     },
        //     {
        //         key: 'grp',
        //         label: 'Group',
        //         type: 'group',
        //         children: [
        //             {
        //                 key: '13',
        //                 label: 'Option 13',
        //             },
        //             {
        //                 key: '14',
        //                 label: 'Option 14',
        //             },
        //         ],
        //     },
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