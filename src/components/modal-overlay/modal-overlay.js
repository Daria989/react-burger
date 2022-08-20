import modalOverlay from './modal-overlay.module.css';
import {SetActive} from '../../utils/types';

function ModalOverlay({setActive}) {

    return (
        <div onClick={() => setActive(false)} className = {modalOverlay.overlay}/>
    )
}

ModalOverlay.propTypes = {
    setActive: SetActive.isRequired
}

export default ModalOverlay;
