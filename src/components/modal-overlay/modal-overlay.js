import modalOverlay from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({closeDetails}) {

    return (
        <div onClick={() => closeDetails()} className = {modalOverlay.overlay}/>
    )
}

ModalOverlay.prototype = {
    closeDetails: PropTypes.func.isRequired
}

export default ModalOverlay;
