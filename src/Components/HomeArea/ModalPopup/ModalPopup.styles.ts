import styled from 'styled-components'

const ModalContainer = styled.div`
    background-color: black;
    display: flex;
    flex-direction:column;
    align-items: center;
    position: relative;
`
export const FormSpan = styled.span`
    color:rgb(212, 45, 16);
    /* font-weight: bold; */
    font-size: large;
`

export const DesktopModalContainer = styled(ModalContainer)`
    border-radius: 7px;
    box-shadow: 0 0 323px rgba(0,0,0,0.5);
    padding: 40px;
    width: 450px;
    font-size: 26px;
`;

export const Header = styled.h3`
    color:white;
    font-size: 35px;
    line-height: 1em;
    font-weight: 300;
    margin: 5px 0 10px;
    text-align: center;
`


