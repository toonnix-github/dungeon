import { useEffect, useState } from 'react';
import GoblinStore from '../../Store/Goblin.store';
import Modal from 'react-bootstrap/Modal';

function GoblinDefeatedModal() {
    const [isShowPopup, setIsShowPopup] = useState(false);
    const goblinStore = GoblinStore((state) => state);

    useEffect(() => {
        if (goblinStore.isShowDefeatedPopup) {
            setIsShowPopup(true);
            setTimeout(() => {
                setIsShowPopup(false);
                goblinStore.closeDefeatedPopup();
            }, 3000);
        }
    }, [goblinStore.isShowDefeatedPopup]);

    if (isShowPopup) {
        return (
            <Modal show={isShowPopup} onHide={() => { }} size="lg" centered>
                You have successfully defeated the goblin!
            </Modal>
        );
    }
}

export default GoblinDefeatedModal;

