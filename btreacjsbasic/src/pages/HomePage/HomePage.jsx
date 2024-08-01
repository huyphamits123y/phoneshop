// import React, { useEffect, useRef, useState } from 'react'
// import TypeProduct from '../../components/TypeProduct/TypeProduct'
// import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
// import SliderComponent from '../../SliderComponent/SliderComponent'
// import slider1 from '../../assets/images/slider1.png';
// import slider2 from '../../assets/images/slider2.png';
// import slider3 from '../../assets/images/slider3.png';
// import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
// import CardComponent from '../../components/CardComponent/CardComponent';
// import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
// import { useQuery } from '@tanstack/react-query';
// import * as ProductService from '../../services/ProductService'
// import { useSelector } from 'react-redux';
// import { useDebounce } from '../../hooks/useDebounce';
// import FooterComponent from '../../components/FooterComponent/FooterComponent';
// const HomePage = () => {
//     const searchProduct = useSelector((state) => state?.product?.search)
//     const refSearch = useRef()

//     const searchDebounce = useDebounce(searchProduct, 500)

//     const [typeProducts, setTypeProducts] = useState([])
//     const [stateProducts, setStateProducts] = useState([])
//     const [visibleProducts, setVisibleProducts] = useState(10);

//     const arrImages = [
//         { src: slider1 },
//         { src: slider2 },
//         { src: slider3 }
//     ];

//     const fetAllTypeProduct = async () => {
//         const res = await ProductService.getAllTypeProduct()
//         if (res?.status === 'OK') {
//             setTypeProducts(res?.data)
//         }
//         console.log('res', res)
//         return res
//     }
//     const fetchProductAll = async (search) => {



//         const res = await ProductService.getAllProductHome(search)
//         if (search?.length > 0 || refSearch.current) {

//             setStateProducts(res?.data)
//             return []

//         } else {

//             return res
//         }


//     }

//     // const { isLoading, data: products } = useQuery(['products'], fetchProductAll, { retry: 3, retryDelay: 1000 })
//     // const { isLoading, data } = useQuery({
//     //     queryKey: ['products'],
//     //     queryFn: fetchProductAll,
//     // });
//     const { isLoading, data: products, error } = useQuery({
//         queryKey: ['products'],
//         queryFn: fetchProductAll,
//         retry: 3,
//         retryDelay: 1000,
//     });
//     console.log("datas", products)
//     console.log('data', searchProduct)
//     useEffect(() => {
//         if (refSearch.current) {
//             console.log('chaychay')

//             fetchProductAll(searchDebounce)

//         }
//         refSearch.current = true

//     }, [searchDebounce])
//     useEffect(() => {
//         if (products?.data?.length > 0) {
//             setStateProducts(products?.data)
//         }

//     }, [products])
//     useEffect(() => {
//         fetAllTypeProduct()
//     }, [])
//     console.log('stateProduct', stateProducts)
//     const handleLoadMore = () => {
//         setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 10); // hiển thị thêm 10 sản phẩm
//     }

//     return (
//         <>
//             <div style={{ width: '1270px', margin: '0 auto' }}>
//                 <WrapperTypeProduct>

//                     {typeProducts.map((item) => {
//                         return (
//                             <TypeProduct name={item} key={item} />

//                         )
//                     })}
//                 </WrapperTypeProduct>
//             </div>


//             <div className='body' style={{ backgroundColor: '#efefef', width: '100%' }}>

//                 <div id="container" style={{ height: '1000px', width: '1270px', margin: '0 auto', paddingBottom: '20px' }}>
//                     <SliderComponent arrImages={arrImages}></SliderComponent>

//                     {/* <WrapperProducts>
//                         {stateProducts?.map((product) => {
//                             return (
//                                 <CardComponent key={product._id}
//                                     countInStock={product.countInStock}
//                                     description={product.description}
//                                     image={product.image}
//                                     name={product.name}
//                                     price={product.price}
//                                     rating={product.rating}
//                                     type={product.type}
//                                     selled={product.selled}
//                                     discount={product.discount}
//                                     id={product._id}
//                                 />
//                             )

//                         })}



//                     </WrapperProducts> */}
//                     <WrapperProducts visibleProducts={visibleProducts} totalProducts={stateProducts.length}>
//                         {stateProducts.slice(0, visibleProducts)?.map((product) => {
//                             return (
//                                 <CardComponent key={product._id}
//                                     countInStock={product.countInStock}
//                                     description={product.description}
//                                     image={product.image}
//                                     name={product.name}
//                                     price={product.price}
//                                     rating={product.rating}
//                                     type={product.type}
//                                     selled={product.selled}
//                                     discount={product.discount}
//                                     id={product._id}
//                                 />
//                             )
//                         })}
//                     </WrapperProducts>

//                     {/* <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
//                         <WrapperButtonMore
//                             size="large"
//                             style={{ backgroundColor: '#fff' }}


//                             textButton="Xem Thêm"
//                             styleTextButton={{ color: 'rgb(0,255,0)', fontWeight: 500 }}

//                         />
//                     </div> */}
//                     {visibleProducts < stateProducts.length && (
//                         <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
//                             <WrapperButtonMore
//                                 size="large"
//                                 style={{ backgroundColor: '#fff' }}
//                                 textButton="Xem Thêm"
//                                 styleTextButton={{ color: 'rgb(0,255,0)', fontWeight: 500 }}
//                                 onClick={handleLoadMore} // thêm sự kiện onClick
//                             />
//                         </div>
//                     )}
//                 </div>

//                 <FooterComponent />

//             </div>




//         </>
//     )
// }
// export default HomePage



import React, { useEffect, useRef, useState } from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style';
import SliderComponent from '../../SliderComponent/SliderComponent';
import slider1 from '../../assets/images/slider1.png';
import slider2 from '../../assets/images/slider2.png';
import slider3 from '../../assets/images/slider3.png';
import CardComponent from '../../components/CardComponent/CardComponent';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';
import FooterComponent from '../../components/FooterComponent/FooterComponent';

const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search);
    const refSearch = useRef();
    const searchDebounce = useDebounce(searchProduct, 500);

    const [typeProducts, setTypeProducts] = useState([]);
    const [stateProducts, setStateProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(10);

    const arrImages = [
        { src: slider1 },
        { src: slider2 },
        { src: slider3 }
    ];

    const fetAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        if (res?.status === 'OK') {
            setTypeProducts(res?.data);
        }
        return res;
    };

    const fetchProductAll = async (search) => {
        const res = await ProductService.getAllProductHome(search);
        if (search?.length > 0 || refSearch.current) {
            setStateProducts(res?.data);
            return [];
        } else {
            return res;
        }
    };

    const { isLoading, data: products, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
    });

    useEffect(() => {
        if (refSearch.current) {
            fetchProductAll(searchDebounce);
        }
        refSearch.current = true;
    }, [searchDebounce]);

    useEffect(() => {
        if (products?.data?.length > 0) {
            setStateProducts(products?.data);
        }
    }, [products]);

    useEffect(() => {
        fetAllTypeProduct();
    }, []);

    const handleLoadMore = () => {
        setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 10); // Hiển thị thêm 10 sản phẩm
    };

    return (
        <>
            <div style={{ width: '1270px', margin: '0 auto' }}>
                <WrapperTypeProduct>
                    {typeProducts.map((item) => (
                        <TypeProduct name={item} key={item} />
                    ))}
                </WrapperTypeProduct>
            </div>

            <div className='body' style={{ backgroundColor: '#efefef', width: '100%' }}>
                <div id="container" style={{ width: '1270px', margin: '0 auto', paddingBottom: '20px' }}>
                    <SliderComponent arrImages={arrImages}></SliderComponent>
                    <WrapperProducts visibleProducts={visibleProducts} totalProducts={stateProducts.length}>
                        {stateProducts.slice(0, visibleProducts)?.map((product) => (
                            <CardComponent
                                key={product._id}
                                countInStock={product.countInStock}
                                description={product.description}
                                image={product.image}
                                name={product.name}
                                price={product.price}
                                rating={product.rating}
                                type={product.type}
                                selled={product.selled}
                                discount={product.discount}
                                id={product._id}
                            />
                        ))}
                    </WrapperProducts>
                    {visibleProducts < stateProducts.length && (
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                            <WrapperButtonMore
                                size="large"
                                style={{ backgroundColor: '#fff' }}
                                textButton="Xem Thêm"
                                styleTextButton={{ color: 'rgb(0,255,0)', fontWeight: 500 }}
                                onClick={handleLoadMore}
                            />
                        </div>
                    )}
                </div>
                <FooterComponent />
            </div>
        </>
    );
};

export default HomePage;

