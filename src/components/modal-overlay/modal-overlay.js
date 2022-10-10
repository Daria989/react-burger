import modalOverlay from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({onClose}) {

    return (
        <div onClick={() => onClose()} className = {modalOverlay.overlay}/>
    )
}

ModalOverlay.prototype = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;
