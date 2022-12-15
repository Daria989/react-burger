import modalOverlay from './modal-overlay.module.css';
import {TModalOverlay} from '../../utils/types'

function ModalOverlay({onClose}: TModalOverlay) {

    return (
        <div onClick={() => onClose()} className = {modalOverlay.overlay}/>
    )
}

export default ModalOverlay;
