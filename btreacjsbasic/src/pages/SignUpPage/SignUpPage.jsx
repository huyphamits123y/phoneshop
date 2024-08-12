import React, { useEffect } from "react";
import { WrapperTextLight, WrapprerContainerLeft, WrapprerContainerRight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import imageLogo from '../../assets/images/image2.png'
import { Row, Col, Image, InputNumber, Divider } from 'antd'
import { useState } from "react";
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useNavigate } from "react-router";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from '../../services/UserService';
import Pending from "../../components/LoadingComponent/Pending";
import * as message from '../../components/Message/Message';
const SignUppage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleOnchangeEmail = (value) => {
        setEmail(value)

    }
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);

    const handleOnchangePassword = (value) => {
        setPassword(value)

    }
    const handleOnchangeConfirmPassword = (value) => {
        setConfirmPassword(value)

    }
    const handleNavigateSignin = () => {
        navigate('/sign-in');
    }

    const mutation = useMutationHooks(
        data => UserService.createUser(data)
    )
    // const mutation = useMutationHooks(UserService.createUser);

    const { data, isLoading, isSuccess, isError } = mutation
    useEffect(() => {
        if (isSuccess) {
            message.success('Đăng ký thành công')
            handleNavigateSignin()
        } else if (isError) {
            message.error('Tài khoản đã tồn tại vui lòng chọn tài khoản khác')
        }

    }, [isSuccess, isError])
    const handleSignUp = () => {
        console.log('sign-up', email, password, confirmPassword);
        mutation.mutate({

            email,
            password,
            confirmPassword,

        })
        setIsPending(true);
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh' }}>
            <div style={{ width: '920px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
                <WrapprerContainerLeft>
                    <h1>Xin chào</h1>
                    <p>Nhập thông tin tài khoản</p>
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
                    <div style={{ position: 'relative', marginTop: '10px' }}>
                        <span
                            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                            style={{

                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px',

                            }}

                        >{
                                isShowConfirmPassword ? (
                                    <EyeFilled />
                                ) : (
                                    <EyeInvisibleFilled />
                                )
                            }

                        </span>
                        <InputForm placeholder="confirm password" type={isShowConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={handleOnchangeConfirmPassword} />

                    </div>




                    <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                        {data?.status === 'EER' && <span style={{ color: 'red' }}>{data?.message}</span>}
                        {/* <Pending isPending={isPending}> */}
                        <ButtonComponent
                            disable={!email.length || !password.length || !confirmPassword.length}
                            onClick={handleSignUp}

                            size={40}


                            styleButton={{
                                background: 'rgb(255, 57, 69)',
                                width: '500px',
                                height: '48px',

                                border: 'none',
                                borderRadius: '4px',
                                margin: '26px 0 10px'
                            }}
                            textButton={'Đăng Ký'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                        {/* </Pending> */}
                    </div>

                    <p>Bạn đã có tài khoản ?<WrapperTextLight onClick={handleNavigateSignin} >Đăng Nhập</WrapperTextLight></p>
                </WrapprerContainerLeft>

                <WrapprerContainerRight>
                    <Image src={imageLogo} preview={false} alt="image-logo" height="400px" width="300px" />
                    <h4 style={{ textAlign: 'center' }}>Mua sắm tại HUYPHAM</h4>
                </WrapprerContainerRight>
            </div>
        </div>
    )
}
export default SignUppage