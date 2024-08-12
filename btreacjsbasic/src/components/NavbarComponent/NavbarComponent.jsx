import { useState, React, useEffect } from "react";
import { WrapperContent, WrapperLableText, WrapperTextPrice } from "./style";
import { Checkbox, Rate } from "antd";
import * as ProductService from '../../services/ProductService'

import TypeProduct from '../../components/TypeProduct/TypeProduct'
import SidebarComponent from "../SidebarComponent/SidebarComponent";
const NavbarComponent = () => {
    const [typeProducts, setTypeProducts] = useState([])
    const fetAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
        console.log('res', res)
        return res
    }
    useEffect(() => {
        fetAllTypeProduct()
    }, [])
    const onChange = {};
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option, index) => {
                    return <WrapperLableText key={index}>{option}</WrapperLableText>
                })
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}>
                        {options.map((option, index) => {
                            return (
                                <Checkbox key={index} style={{ marginLeft: 0 }} value={option.value} >{option.lable}</Checkbox>
                            )
                        })}
                        <Checkbox value="A">A</Checkbox>
                        <Checkbox value="B">B</Checkbox>
                    </Checkbox.Group>
                )
            case 'star':
                return (
                    options.map((option, index) => {
                        return (
                            <div key={index} style={{ display: 'flex', gap: '4px' }}>
                                <Rate style={{ fontSize: '15px' }} disable defaultValue={option} />
                                <span> {`tu ${option} sao`}</span>
                            </div>

                        )
                    })
                )
            case 'price':
                return (
                    options.map((option, index) => {
                        return (
                            <WrapperTextPrice key={index}>{option}</WrapperTextPrice>


                        )

                    })
                )

            default:
                return {}
        }
    }
    return (
        <div style={{ backgroundColor: '#fff' }}>
            <WrapperLableText>Danh mục</WrapperLableText>
            <WrapperContent>
                {typeProducts.map((item) => {
                    return (
                        <TypeProduct name={item} key={item} />

                        // <SidebarComponent name={item} key={item} />

                    )
                })}

            </WrapperContent>

        </div>
    )
}
export default NavbarComponent;