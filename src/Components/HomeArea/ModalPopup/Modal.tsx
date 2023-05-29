import React, { ReactNode } from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';

interface ModalProps{
    children: ReactNode;
    onClick: () => void;
}

const OverLay = styled.div`
    background-color: rgba(0,0,0, 0.5);
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Modal: React.FC<ModalProps> = ({onClick, children}) =>{
    return ReactDom.createPortal(<OverLay onClick={onClick}>
        <div onClick={e => e.stopPropagation()}>
       {/*  <span>I'm a Modal</span> */}
        {children}
        </div>
    </OverLay>, document.getElementById('modal-root')!);
}

export default Modal;

