import modalOverlay from './modal-overlay.module.css';

function ModalOverlay({closeDetails}) {

    return (
        <div onClick={() => closeDetails()} className = {modalOverlay.overlay}/>
    )
}

export default ModalOverlay;
