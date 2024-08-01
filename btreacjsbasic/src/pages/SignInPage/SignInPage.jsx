import React, { useEffect } from "react";
import { WrapperTextLight, WrapprerContainerLeft, WrapprerContainerRight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import imageLogo from '../../assets/images/image2.png';
import { Row, Col, Image, InputNumber, Divider } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { useState } from "react";
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useLocation, useNavigate } from "react-router";
import { Alert, Button, Input } from 'antd';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from "../../hooks/useMutationHook";
import Pending from "../../components/LoadingComponent/Pending";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from '../../components/Message/Message';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { updateUser } from "../../redux/slides/userSlide";


const SignInpage = () => {
    const [email, setEmail] = useState('')
    const location = useLocation()
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isPending, setIsPending] = useState(false);

    const handleNavigateSignUp = () => {
        navigate('/sign-up')

    }
    // const mutation = useMutationHooks(
    //     data => UserService.loginUser(data)


    // )
    const mutation = useMutationHooks(

        async (data) => {




            const res = UserService.loginUser(data)


            return res;
        }
    );

    console.log('mutation', mutation)
    const { data, isLoading, isSuccess, isError } = mutation;
    useEffect(() => {
        console.log('location', location)

        if (isSuccess && data?.status === 'OK') {
            console.log('isSucess', isSuccess)
            if (location?.state) {
                navigate(location?.state)
            } else {
                navigate('/')
            }
            console.log('data', data)
            localStorage.setItem('access_token', JSON.stringify(data?.access_token))

            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token)
                console.log('decoded', decoded)
                if (decoded?.id) {
                    handleGetDetailsUser(decoded?.id, data?.access_token);
                    console.log(decoded?.id);
                    console.log(decoded?.access_token)


                }
            }
        } else {
            navigate('/sign-in')
            setErrorMessage('Tài khoản hoặc mật khẩu không chính xác');
            setShowAlert(true);
            setShowMessage(true); // 

        }
    }, [isSuccess, isError])
    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        console.log("iddddd", id)
        console.log("tokenddd", token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
        console.log('res', res)
    }
    console.log('mutation', mutation)
    const handleOnchangeEmail = (value) => {
        setEmail(value)

    }
    const handleOnchangePassword = (value) => {
        setPassword(value)

    }
    const handleOnchangeConfirmPassword = (value) => {
        setConfirmPassword(value)

    }
    const handleSignin = () => {
        mutation.mutate({
            email,
            password
        })
        setIsPending(true);
        console.log('sign-in', email, password);
    }
    const [isShowPassword, setIsShowPassword] = useState(false)
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh' }}>
            <div style={{ width: '920px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
                <WrapprerContainerLeft>
                    <h1>Xin chao</h1>
                    <p>Dang nhap vao tai khoan</p>

                    <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px',

                            }}

                        >{
                                isShowPassword ? (
                                    <EyeFilled />
                                ) : (
                                    <EyeInvisibleFilled />
                                )
                            }

                        </span>
                        <InputForm placeholder="password" type={isShowPassword ? "text" : "password"} value={password} onChange={handleOnchangePassword} />

                    </div>
                    {showAlert && <Alert message={errorMessage} type="error" closable onClose={() => setShowAlert(false)} style={{ marginTop: '10px' }} />}


                    <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                        {data?.status === 'EER' && <span style={{ color: 'red' }}>{data?.message}</span>}
                        {/* <Pending isPending={isPending}> */}
                        <ButtonComponent
                            disable={!email.length || !password.length}
                            onClick={handleSignin}
                            size={40}


                            styleButton={{
                                background: 'rgb(255, 57, 69)',
                                width: '500px',
                                height: '48px',

                                border: 'none',
                                borderRadius: '4px',
                                margin: '26px 0 10px'
                            }}
                            textButton={'Dang Nhap'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                        {/* </Pending> */}
                    </div>
                    <p><WrapperTextLight>Quen mat khau</WrapperTextLight></p>
                    <p>Chua co tai khoan ?<WrapperTextLight onClick={handleNavigateSignUp} style={{ cursor: 'pointer' }}>Tao tai khoan</WrapperTextLight></p>
                </WrapprerContainerLeft>

                <WrapprerContainerRight>
                    <Image src={imageLogo} preview={false} alt="image-logo" height="400px" width="300px" />
                    <h4 style={{ textAlign: 'center' }}>Mua sam tai HUYPHAM</h4>
                </WrapprerContainerRight>
            </div>

        </div>
    )
}
export default SignInpage





