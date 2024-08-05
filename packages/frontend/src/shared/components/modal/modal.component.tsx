
import React, { ReactElement, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { modal, modalOverlay,modalCloseButton,modalContent,modalHeader } from './modal.styled';
import useModalStore from '~store/modal.store';



export const Modal:React.FC = ({ children }:{children:ReactNode}) => {
    const {show,close,open} = useModalStore();

    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            close();
        }
      };
  
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }, [close]);

    if (!show){
      return null;
    }
  
   
  
    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={close}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
            
              <button className="modal-close-button" onClick={close}>×</button>
            </div>
            <div className="modal-content">{children}</div>
          </div>
        </div>,
        document.body
      );
  }; 
  

