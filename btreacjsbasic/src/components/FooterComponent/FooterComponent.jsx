import React from 'react';
import { WrapperFooter, WrapperFooterContent, WrapperFooterSection, WrapperFooterBottom } from './style';

const FooterComponent = () => {
    return (
        <WrapperFooter>
            <WrapperFooterContent>
                <WrapperFooterSection className="about">
                    <h2>HUYPHAM</h2>
                    <p>
                        Chúng tôi cung cấp các sản phẩm điện thoại chất lượng cao với giá cả phải chăng.
                        Đảm bảo sự hài lòng của khách hàng là ưu tiên hàng đầu của chúng tôi.
                    </p>
                </WrapperFooterSection>

                <WrapperFooterSection className="links">
                    <h2>Liên kết nhanh</h2>
                    <ul>
                        <li><a href="#">Trang chủ</a></li>
                        <li><a href="#">Sản phẩm</a></li>
                        <li><a href="#">Giới thiệu</a></li>
                        <li><a href="#">Liên hệ</a></li>
                    </ul>
                </WrapperFooterSection>

                <WrapperFooterSection className="contact">
                    <h2>Liên hệ</h2>
                    <p>Email: huyzxv123@gmail.com</p>
                    <p>Điện thoại: 0349369139</p>
                    <div className="socials">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </WrapperFooterSection>
            </WrapperFooterContent>

            <WrapperFooterBottom>
                &copy; 2024 HUYPHAM. All rights reserved.
            </WrapperFooterBottom>
        </WrapperFooter>
    );
}

export default FooterComponent;
