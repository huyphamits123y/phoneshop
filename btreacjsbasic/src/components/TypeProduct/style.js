import styled from "styled-components"
export const WrapperTypeProduct = styled.div`
  background-color: #ffffff;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e6f7ff;
    border-color: #91d5ff;
  }

  &::before {
    content: "+";
    color: #1890ff;
    margin-right: 8px;
  }
`;