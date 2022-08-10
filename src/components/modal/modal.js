import React from 'react';
import popup from './modal.module.css';

function Modal({active, setActive, children}) {
    let modalClass = active ? `${popup.modal} ${popup.active}` : popup.modal;
    let contentClass = active ? `${popup.content} ${popup.active}` : popup.content;
    return (
        <div className={modalClass} onClick={() => setActive(false)}>
            <div className={contentClass} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal;