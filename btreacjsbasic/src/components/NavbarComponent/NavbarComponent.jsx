import React from "react";
import { WrapperContent, WrapperLableText, WrapperTextPrice } from "./style";
import { Checkbox, Rate } from "antd";

const NavbarComponent = () => {
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
            <WrapperLableText>label</WrapperLableText>
            <WrapperContent>
                {renderContent('text', ['Tu lanh', 'TV', 'MAYGIAT'])}

            </WrapperContent>
            {/* <WrapperContent>

                {renderContent('checkbox', [
                    { value: 'a', lable: 'A' },
                    { value: 'b', lable: 'B' }
                ])}
            </WrapperContent>
            <WrapperContent>

                {renderContent('checkbox', [
                    { value: 'a', lable: 'A' },
                    { value: 'b', lable: 'B' }
                ])}
            </WrapperContent>
            <WrapperContent>
                {renderContent('star', [3, 4, 5])}
            </WrapperContent>
            <WrapperContent>
                {renderContent('price', ['duoi 40', 'tren 50'])}
            </WrapperContent> */}
        </div>
    )
}
export default NavbarComponent;