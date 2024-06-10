// import React from 'react'
// import { Input, Button } from 'antd'
// const ButtonComponent = ({ size, styleButton, styleTextButton, textButton, disable, ...rests }) => {
//     return (
//         <Button

//             style={{
//                 ...styleButton,
//                 background: disable ? '#ccc' : styleButton.background
//             }}
//             size={size}

//             {...rests}

//         >
//             <span style={{ styleTextButton }}>{textButton}</span></Button>
//     )
// }
// export default ButtonComponent


import React from 'react';
import { Button } from 'antd';

const ButtonComponent = ({ size, styleButton = {}, styleTextButton, textButton, disable, ...rests }) => {
    return (
        <Button
            style={{
                ...styleButton,
                background: disable ? '#ccc' : styleButton.background,
                cursor: disable ? 'not-allowed' : 'pointer'
            }}
            size={size}
            disabled={disable} // Sử dụng thuộc tính disabled của Ant Design
            {...rests}
        >
            <span style={styleTextButton}>{textButton}</span>
        </Button>
    );
};

export default ButtonComponent;
