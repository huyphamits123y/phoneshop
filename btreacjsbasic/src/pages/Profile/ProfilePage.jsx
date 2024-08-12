import React, { useEffect } from 'react'
import { useState } from 'react'
import { WrapperHeader, WrapperInput, WrapperLable, WrapperUploadFile } from './style'
import InputForm from '../../components/InputForm/InputForm'
import { WrapperContentProfile } from './style'
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useSelector } from 'react-redux'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { message, Button, Upload } from 'antd'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide'
import { UploadOutlined } from '@ant-design/icons';

import { getBase64 } from '../../utils'
const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')
    const dispatch = useDispatch()
    const mutation = useMutationHooks(
        // (data) => {
        //     const { id, access_token, ...rests } = data
        //     UserService.updateUser(id, rests, access_token)
        // }
        // loi undifined  data 45p
        // (id, data) => UserService.updateUser(id, data)
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, rests, access_token);
        }

    )

    const { data, isLoading, isSuccess, isError } = mutation
    console.log('data', data)
    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)

    }, [user])
    const handleOnchangeEmail = (value) => {
        setEmail(value)

    }
    useEffect(() => {
        if (isSuccess) {
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        } else if (isError) {
            message.error()
        }

    }, [isSuccess, isError])
    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
        console.log('res', res)
    }
    const handleOnchangeName = (value) => {

        setName(value)
    }
    const handleOnchangePhone = (value) => {
        setPhone(value)

    }
    const handleOnchangeAddress = (value) => {
        setAddress(value)

    }
    // const handleOnchangeAvatar = async (fileList) => {
    //     const file = fileList[0]
    //     if (!file.url && !file.preview) {
    //         file.preview = await getBase64(file.originFileObj);
    //     }
    //     setAvatar(file.preview)
    // }
    const handleOnchangeAvatar = async (info) => {
        const { file } = info; // Lấy đối tượng file từ thông tin của upload
        if (!file.url && !file.preview) {
            // Nếu không có url và preview, thực hiện chuyển đổi và gán preview
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview); // Lưu preview của file vào state
    };

    const handleupdate = () => {
        // const { access_token, ...rests } = data
        mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token })
        // console.log('update', email, name, phone, address, avatar)
        // console.log(data)
        // mutation.mutate(user?.id, { email, name, phone, address, avatar })
        // console.log('dattaaaa', data);
        // mutation.mutate({ id: user?.id, email, name, phone, address, avatar })


    }

    return (
        <div style={{ width: '1270px', margin: '0 auto' }}>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>
            <WrapperContentProfile>
                <WrapperInput>
                    <WrapperLable htmlFor='name'>name</WrapperLable>
                    <InputForm style={{ width: '300px' }} value={name} onChange={handleOnchangeName} />
                    <ButtonComponent

                        onClick={handleupdate}
                        size={40}


                        styleButton={{


                            width: 'fit-content',
                            height: '30px',
                            padding: '4px 6px 6px',

                            border: '1px solid rgb(26,148,255)',
                            borderRadius: '4px',

                        }}
                        textButton={'Cap nhat'}
                        styleTextButton={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>
                </WrapperInput>
                <WrapperInput>
                    <WrapperLable htmlFor='email'>Email</WrapperLable>
                    <InputForm style={{ width: '300px' }} value={email} onChange={handleOnchangeEmail} />
                    <ButtonComponent

                        onClick={handleupdate}
                        size={40}


                        styleButton={{


                            width: 'fit-content',
                            height: '30px',
                            padding: '4px 6px 6px',

                            border: '1px solid rgb(26,148,255)',
                            borderRadius: '4px',

                        }}
                        textButton={'Cap nhat'}
                        styleTextButton={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>
                </WrapperInput>
                <WrapperInput>
                    <WrapperLable htmlFor='phone'>Phone</WrapperLable>
                    <InputForm style={{ width: '300px' }} value={phone} onChange={handleOnchangePhone} />
                    <ButtonComponent

                        onClick={handleupdate}
                        size={40}


                        styleButton={{


                            width: 'fit-content',
                            height: '30px',
                            padding: '4px 6px 6px',

                            border: '1px solid rgb(26,148,255)',
                            borderRadius: '4px',

                        }}
                        textButton={'Cap nhat'}
                        styleTextButton={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>
                </WrapperInput>
                <WrapperInput>
                    <WrapperLable htmlFor='address'>Address</WrapperLable>
                    <InputForm style={{ width: '300px' }} value={address} onChange={handleOnchangeAddress} />
                    <ButtonComponent

                        onClick={handleupdate}
                        size={40}


                        styleButton={{


                            width: 'fit-content',
                            height: '30px',
                            padding: '4px 6px 6px',

                            border: '1px solid rgb(26,148,255)',
                            borderRadius: '4px',

                        }}
                        textButton={'Cap nhat'}
                        styleTextButton={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>
                </WrapperInput>
                <WrapperInput>
                    <WrapperLable htmlFor='avatar'>Avatar</WrapperLable>
                    {/* <InputForm style={{ width: '300px' }} value={avatar} onChange={handleOnchangeAvatar} /> */}
                    <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </WrapperUploadFile>
                    {avatar && (
                        <img src={avatar} style={{
                            height: '60px',
                            width: '60px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                        }} alt="avatar" />
                    )}
                    <ButtonComponent

                        onClick={handleupdate}
                        size={40}


                        styleButton={{


                            width: 'fit-content',
                            height: '30px',
                            padding: '4px 6px 6px',

                            border: '1px solid rgb(26,148,255)',
                            borderRadius: '4px',

                        }}
                        textButton={'Cap nhat'}
                        styleTextButton={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>
                </WrapperInput>

            </WrapperContentProfile>
        </div>
    )

}
export default ProfilePage