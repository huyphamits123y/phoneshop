import React, { useEffect } from 'react'
import { Col, Row, Badge, Popover, Button } from 'antd'
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import Search from 'antd/es/transfer/search'
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import * as UserService from '../../services/UserService'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../../redux/slides/userSlide'
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

    // console.log("userid", user?.id)
    // console.log("cc", order?.orderItems?.[0]?.id);

    const handleNavigateLogin = () => {
        navigate('/sign-in')

    }

    const handleLogout = async () => {
        await UserService.logoutUser();
        localStorage.removeItem('access_token');
        dispatch(resetUser())
        // setLoading(false)
        // console.log("user", user);



    }
    // useEffect(() => {
    //     if (order?.orderItems) {
    //         console.log('Product IDs:', order.orderItems.map(item => item.id));
    //     }
    // }, [order?.orderItems]);
    useEffect(() => {
        setUserName(user?.name)
        setUserAvatar(user?.avatar)

    }, [user?.name, user?.avatar])
    const onSearch = (e) => {
        setSearch('e', e.target.value)
        dispatch(searchProduct(e.target.value))


    }
    // const userCartItems = order?.orderItems
    //     ?.filter(item => item?.id === user?.id)
    //     .map(item => item);

    // const cartItemCount = userCartItems.length;
    // console.log('sl cart', cartItemCount)

    // console.log('user', user)
    const content = (
        <div>
            <WrapperContentPopup onClick={handleLogout}>Dang Xuat</WrapperContentPopup>
            <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thong tin nguoi dung</WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quan li he thong</WrapperContentPopup>

            )}

        </div>

    );
    return (
        <div style={{ width: '100%', background: 'rgb(26,148,255)', display: 'flex', justifyContent: 'center' }}>
            <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
                <Col span={5}>
                    <WrapperTextHeader> HUYPHAM</WrapperTextHeader>
                </Col>
                {/* !{isHiddenSearch && ( */}
                {isHiddenSearch && (
                    <Col span={13}>
                        <ButtonInputSearch
                            size="large"
                            textButton="Tim kiem"
                            placeholder="input search text"
                            bordered={false}
                            onChange={onSearch}



                        />
                    </Col>
                )}
                <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
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
                            {/* <div>
                                <UserOutlined style={{ fontSize: '30px' }} />
                            </div> */}
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
                    {/* {isHiddenCart && ( */}

                    {isHiddenCart && (

                        <div style={{ marginLeft: '100px', cursor: 'pointer' }} onClick={() => navigate('/order')}>
                            <Badge count={order?.orderItems?.length || 0} size="small">
                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                            </Badge>
                            <WrapperTextHeaderSmall>Cart</WrapperTextHeaderSmall>
                        </div>
                    )}

                    {/* {user?.id ? (
                        <div style={{ marginLeft: '100px', cursor: 'pointer' }} onClick={() => navigate('/order')}>
                            <Badge count={order?.orderItems?.length || 0} size="small">
                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                            </Badge>
                            <WrapperTextHeaderSmall>Cart</WrapperTextHeaderSmall>
                        </div>


                    ) : (
                        <div style={{ marginLeft: '100px', cursor: 'pointer' }} onClick={() => navigate('/order')}>
                            <Badge count={0} size="small">
                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                            </Badge>
                            <WrapperTextHeaderSmall>Cart</WrapperTextHeaderSmall>
                        </div>




                    )} */}
                    {/* {order?.orderItems?.some(item => item.userId === user?.id) ? (
                        <div style={{ marginLeft: '100px', cursor: 'pointer' }} onClick={() => navigate('/order')}>
                            <Badge
                                count={order?.orderItems?.filter(item => item?.userId === user?.id).length}
                                size="small"
                            >
                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                            </Badge>
                            <WrapperTextHeaderSmall>Cart</WrapperTextHeaderSmall>
                        </div>
                    ) : (
                        <div style={{ marginLeft: '100px', cursor: 'pointer' }} onClick={() => navigate('/order')}>
                            <Badge count={0} size="small">
                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                            </Badge>
                            <WrapperTextHeaderSmall>Cart</WrapperTextHeaderSmall>
                        </div>
                    )} */}


                </Col>
            </WrapperHeader>
        </div>
    )
}
export default HeaderComponent