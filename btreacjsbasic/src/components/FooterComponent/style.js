import styled from "styled-components";

export const WrapperFooter = styled.footer`
    background-color: #333;
    color: white;
    padding: 40px 0;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
`;

export const WrapperFooterContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const WrapperFooterSection = styled.div`
    flex: 1;
    padding: 0 20px;

    h2 {
        font-size: 1.5em;
        margin-bottom: 15px;
    }

    p, a {
        color: #ccc;
        font-size: 1em;
        line-height: 1.5;
    }

    a {
        text-decoration: none;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        margin-bottom: 10px;
    }

    .socials {
        margin-top: 15px;

        a {
            color: #ccc;
            margin-right: 10px;
            font-size: 1.2em;
            transition: color 0.3s;

            &:hover {
                color: #fff;
            }
        }
    }

    @media (max-width: 768px) {
        text-align: center;
        padding: 20px 0;
    }
`;

export const WrapperFooterBottom = styled.div`
    padding: 20px 0;
    border-top: 1px solid #444;
    font-size: 0.9em;
    color: #ccc;
`;
