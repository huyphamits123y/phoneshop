import React, { useEffect } from 'react'
import { Col, Row, Badge, Popover, Button } from 'antd'
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import Search from 'antd/es/transfer/search'
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import * as UserService from '../../services/UserService'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../../redux/slides/userSlide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { searchProduct } from '../../redux/slides/productSlide';
const Loading = ({ isLoading, children }) => (
    isLoading ? <div>Loading...</div> : <>{children}</>
);
const HeaderComponent = (isHiddenSearch = false, isHiddenCart = false) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)
    const dispatch = useDispatch();
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)



    const handleNavigateLogin = () => {
        navigate('/sign-in')

    }

    const handleLogout = async () => {
        await UserService.logoutUser();
        localStorage.removeItem('access_token');
        dispatch(resetUser())



    }

    useEffect(() => {
        setUserName(user?.name)
        setUserAvatar(user?.avatar)

    }, [user?.name, user?.avatar])
    const onSearch = (e) => {
        setSearch('e', e.target.value)
        dispatch(searchProduct(e.target.value))


    }

    const content = (
        <div>
            <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
            <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản lí hệ thống</WrapperContentPopup>

            )}

        </div>

    );
    return (
        <div style={{ width: '100%', background: 'rgb(26,148,255)', display: 'flex', justifyContent: 'center' }}>
            <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
                <Col span={3}>
                    <WrapperTextHeader> HUYPHAM</WrapperTextHeader>
                </Col>
                {/* !{isHiddenSearch && ( */}
                {isHiddenSearch && (
                    <Col span={13}>
                        <ButtonInputSearch
                            size="large"
                            textButton="Tìm kiếm"
                            placeholder="Tìm kiếm"
                            bordered={false}
                            onChange={onSearch}



                        />
                    </Col>
                )}
                <Col span={7} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
                    <Loading isLoading={loading}>
                        <WrapperHeaderAccount>
                            {userAvatar ? (
                                <img src={userAvatar} alt="avatar" style={{
                                    height: '30px',
                                    width: '30px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }} />

                            ) : (
                                <UserOutlined style={{ fontSize: '30px' }} />

                            )}

                            {user?.access_token ? (
                                <>

                                    <Popover content={content} trigger="click">
                                        <div style={{ cursor: 'pointer' }}>{userName?.length ? userName : user?.email}</div>
                                    </Popover>
                                </>

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

                    </Loading>

                    {order?.orderItems?.some(item => item.userId === user?.id) ? (
                        <div style={{ marginLeft: '100px', cursor: 'pointer' }} onClick={() => navigate('/order')}>
                            <Badge
                                count={order?.orderItems?.filter(item => item?.userId === user?.id).length}
                                size="small"
                            >
                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                            </Badge>
                            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>

                        </div>
                    ) : (
                        <div style={{ marginLeft: '100px', cursor: 'pointer' }} onClick={() => navigate('/order')}>
                            <Badge count={0} size="small">
                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                            </Badge>
                            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>

                        </div>
                    )}



                    {/* <div style={{ cursor: 'pointer' }} onClick={() => navigate('/payment-order')}>
                        <Badge count={0} size="small">
                            <FontAwesomeIcon

                                icon={faBagShopping}
                                style={{
                                    fontSize: '30px',

                                    color: '#ffffff',

                                    borderRadius: '5px'
                                }}

                            />
                        </Badge>
                        <WrapperTextHeaderSmall>Đơn hàng</WrapperTextHeaderSmall>
                    </div> */}

                    {user?.access_token && (
                        <div style={{ cursor: 'pointer' }} onClick={() => navigate('/payment-order')}>
                            <Badge count={0} size="small">
                                <FontAwesomeIcon
                                    icon={faBagShopping}
                                    style={{
                                        fontSize: '30px',
                                        color: '#ffffff',
                                        borderRadius: '5px'
                                    }}
                                />
                            </Badge>
                            <WrapperTextHeaderSmall>Đơn hàng</WrapperTextHeaderSmall>
                        </div>
                    )}




                </Col>
            </WrapperHeader>
        </div>
    )
}
export default HeaderComponent