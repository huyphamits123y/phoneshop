import React from 'react'
import { Col, Row, Badge } from 'antd'
import { WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import Search from 'antd/es/transfer/search'
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const HeaderComponent = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user)

    const handleNavigateLogin = () => {
        navigate('/sign-in')

    }
    console.log('user', user)
    return (
        <div style={{ width: '100%', background: 'rgb(26,148,255)', display: 'flex', justifyContent: 'center' }}>
            <WrapperHeader>
                <Col span={5}>
                    <WrapperTextHeader> HUYPHAM</WrapperTextHeader>
                </Col>
                <Col span={13}>
                    <ButtonInputSearch
                        size="large"
                        textButton="Tim kiem"
                        placeholder="input search text"
                        bordered={false}



                    />
                </Col>
                <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
                    <WrapperHeaderAccount>
                        <div>
                            <UserOutlined style={{ fontSize: '30px' }} />
                        </div>
                        {user?.name ? (
                            <div style={{ cursor: 'pointer' }}>{user.name}</div>

                        ) : (
                            <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                <WrapperTextHeaderSmall>Login/Register</WrapperTextHeaderSmall>
                                <div>
                                    <WrapperTextHeaderSmall>Username</WrapperTextHeaderSmall>
                                    <CaretDownOutlined />


                                </div>

                            </div>
                        )
                        }

                    </WrapperHeaderAccount>
                    <div style={{ marginLeft: '100px' }}>
                        <Badge count={4} size="small">
                            <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                        </Badge>
                        <WrapperTextHeaderSmall>Cart</WrapperTextHeaderSmall>
                    </div>
                </Col>
            </WrapperHeader>
        </div>
    )
}
export default HeaderComponent