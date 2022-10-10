import {useEffect} from 'react';
import ReactDOM from 'react-dom';
import popup from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");
function Modal({onClose, children}) {
    useEffect(() => {
        const onEscapeEvent = e => e.key === "Escape" ? onClose() : null
        document.body.addEventListener('keydown', onEscapeEvent)
        
        return () => {
            document.body.removeEventListener('keydown', onEscapeEvent)
        }
    }, [])

        return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose}/>
            <div className = {popup.content} >
                <div className={popup.header}>
                    <div className={`mt-10  mr-10 ${popup.closeIcon}`}>
                        <CloseIcon type="primary" onClick={onClose}/>
                    </div>
                </div>
                {children}
            </div>
        </>,
        modalRoot
    )
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Modal;