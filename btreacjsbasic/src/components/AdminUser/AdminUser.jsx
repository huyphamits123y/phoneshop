import React from 'react'
import { PlusCircleFilled } from "@ant-design/icons"
import { Button } from 'antd'
import { WrapperHeader } from './style'
import TableComponent from '../TableComponent/TableComponent'
const AdminUser = () => {

    return (
        <div>
            <WrapperHeader>Quản lí người dùng</WrapperHeader>
            <div>
                <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}><PlusCircleFilled style={{ fontSize: '60px' }} /></Button>
            </div>
            <div style={{ marginTop: '10px' }}>
                <TableComponent />
            </div>
        </div>
    )
}
export default AdminUser