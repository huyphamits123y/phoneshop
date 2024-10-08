// import React from 'react'
// import { useNavigate } from 'react-router'

// const TypeProduct = ({ name }) => {
//     const navigate = useNavigate()
//     const handleNavigateType = (type) => {
//         navigate(`/products/$(type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, { state: type })
//     }
//     return (
//         <div style={{ padding: '0 10px', cursor: 'pointer' }} onClick={() => handleNavigateType(name)}>
//             {name}
//         </div>
//     )
// }
// export default TypeProduct
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Đúng import từ react-router-dom
import { WrapperTypeProduct } from './style';

const TypeProduct = ({ name }) => {
    const navigate = useNavigate();

    const handleNavigateType = (type) => {
        const normalizedType = type.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '_');
        navigate(`/product/${normalizedType}`, { state: type }); // Đúng URL `/product/`
    };

    return (
        // <div style={{ padding: '0 10px', cursor: 'pointer' }} onClick={() => handleNavigateType(name)}>
        //     {name}
        // </div>
        <WrapperTypeProduct onClick={() => handleNavigateType(name)}>

            {name}

        </WrapperTypeProduct>
    );
};

export default TypeProduct;


