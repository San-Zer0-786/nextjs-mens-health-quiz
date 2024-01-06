import React, { ReactNode } from 'react';
import '@/styles/modal.scss';
//  isOpen, onClose etc. can be improved later if we want the modal to be toggled!
interface ModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    children?: ReactNode;
}

const Modal = ({ isOpen = true, onClose = () => {}, children }: ModalProps) => {
    return (
    <>
      {isOpen && (
        <div className="modal_container">
          <div className="container modal_wrapper">
            <a href="/" className='modal_logo'>
              <img src="images/logo.png" alt="Logo" className="icon"/>
            </a>
            <div className="modal_content">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
