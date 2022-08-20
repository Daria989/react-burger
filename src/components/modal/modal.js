import {useEffect} from 'react';
import ReactDOM from 'react-dom';
import popup from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import {SetActive} from '../../utils/types';

const modalRoot = document.getElementById("react-modals");

function Modal({children, header, setActive}) {

    useEffect(() => {
        const onEscapeEvent = e => e.key === "Escape" ? setActive(false) : null
        document.body.addEventListener('keydown', onEscapeEvent)
        
        return () => {
            document.body.removeEventListener('keydown', onEscapeEvent)
        }
    }, [])

    return ReactDOM.createPortal(
        <>
            <ModalOverlay setActive={setActive}/>
            <div className = {popup.content} >
                <div className={popup.header}>
                    <h2 className={'text text_type_main-large'}>{header}</h2>
                    <div className={`mt-10  mr-10 ${popup.closeIcon}`}>
                        <CloseIcon type="primary" onClick={() => setActive(false)}/>
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
    header: PropTypes.string.isRequired,
    setActive: SetActive.isRequired
}

export default Modal;