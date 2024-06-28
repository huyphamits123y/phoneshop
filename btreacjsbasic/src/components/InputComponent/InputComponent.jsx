import React from 'react'
import { Input, Button } from 'antd'
const InputComponent = ({ size, placeholder, bordered, style, ...rests }) => {
    return (
        <Input
            size={size}
            bordered={bordered}
            placeholder={placeholder}
            style={style}
            {...rests}
        />

    )
}
export default InputComponent