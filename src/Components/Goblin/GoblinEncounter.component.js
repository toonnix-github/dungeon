import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import GoblinStore from '../../Store/Goblin.store';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { GoblinDetailComponent } from './GoblinDetail.component';
import VikingStore from '../../Store/Viking.store';


export default GoblinEncounterComponent;

function GoblinEncounterComponent({ index }) {
    const goblin = GoblinStore((state) => state.gang[index]);
    const [isShowPopup, setIsShowPopup] = useState(false);

    const heroData = VikingStore((state) => state);

    useEffect(() => {
        if (_.isNumber(index)) {
            setIsShowPopup(true);
        }
    }, [index]);


    if (isShowPopup) {
        return (
            <Modal show={isShowPopup} onHide={() => { }} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <div className='goblin-encounter-container'>
                    <GoblinDetailComponent goblin={goblin} />
                </div>
                <div className='hero-container hero-encounter-container'>
                    <div className='profile-container'>
                        <div className='portrait'>
                            <div className='dice-power-container'>
                                <div className='power-row'><i className='icon fist-icon' /></div>
                                <div className='power-row'><i className='icon magic-icon' /></div>
                                <div className='power-row'><i className='icon speed-icon' /></div>
                            </div>
                            <div className='defend-power'>{heroData.defend}</div>
                        </div>
                    </div>
                    <div className='hero-card-name'>{heroData.name}</div>
                </div>
                <Button onClick={() => { setIsShowPopup(false); }}>Close</Button>
            </Modal>
        );
    }

}