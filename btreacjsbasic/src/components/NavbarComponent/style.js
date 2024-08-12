import styled from "styled-components"

export const WrapperLableText = styled.h4`
      color: rgb(56,56,61);
      font-size:14px;
      font-weight:500;
      
`
export const WrapperTextValue = styled.span`
      color: rgb(56,56,61);
      font-size:12px;
      font-weight:400;
`
// export const WrapperContent = styled.div`
//        display:flex;
//     //    align-items: center;
//        flex-direction: column;
//        gap: 12px;
// `
export const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const WrapperTextPrice = styled.div`
padding: 4px;
color: rgb(56,56,61);
borderRadius: 10px;
backgroundColor: rgb(238,238,238);
width: fit-content;
`