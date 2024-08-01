import styled from "styled-components";
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
export const WrapperTypeProduct = styled.div`
       display: flex;
       align-items: center;
       gap: 24px;
       justify-content: flex-start;
       border-bottom: 1px solid red;
       height:44px;
`

export const WrapperButtonMore = styled(ButtonComponent)`

&:hover {
       color:#fff;
       background:rgb(13,92,182);
       span {
              color:rgb(13,92,182)
       }
      
       text-align:center
}
`

export const WrapperProducts = styled.div`
       // display:flex;
       // justify-content:center;
       // gap: 15px;
       // margin-top:20px;
       // padding-bottom: 100px;
       // flex-wrap:wrap; 
       //  overflow: hidden;

       display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap; 
  overflow: hidden;
  padding-bottom: 100px; /* Khoảng cách cố định với Footer */
  ${({ visibleProducts, totalProducts }) => visibleProducts >= totalProducts && `
    padding-bottom: 100px;
  `}
`