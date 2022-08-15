import modalOverlay from './modal-overlay.module.css';

function ModalOverlay({setActive}) {

    return (
        <div onClick={() => setActive(false)} className = {modalOverlay.overlay}/>
    )
}

export default ModalOverlay;