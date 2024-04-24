import VikingStore from "../Store/Viking.store";
import "./HeroDisplay.scss";
import _ from 'lodash';

function HeroDisplayComponent({ }) {
    const vikingData = VikingStore((state) => state);
    const vikingAction = VikingStore((state) => state.action);

    return (
        <div className="hero-container">
            <div>
                <div>
                    <span className="label">HP</span> {vikingData.health.current} / {vikingData.health.max}
                    <span className="action-token-container">
                        {
                            _.times(vikingAction.max, (i) => {
                                return (
                                    <div key={i} className={'action-token' + ((vikingAction.current - i > 0) ? ' active' : '')}></div>
                                )
                            })
                        }
                    </span>
                </div>

                <hr />
                <div><span className="label">Attack:</span> {vikingData.status.attack}</div>
                <div><span className="label">Defence:</span> {vikingData.status.defence}</div>
                <div><span className="label">Magic:</span> {vikingData.status.magic}</div>
                <div><span className="label">Speed:</span> {vikingData.status.speed}</div>
                <hr />
                <div className="equipment-container">
                    <div className="equipment-item"></div>
                    <div className="equipment-item"></div>
                    <div className="armor-item"></div>
                </div>
                <div className="artifact-container">
                    <div className="artifact-item"></div>
                    <div className="artifact-item"></div>
                    <div className="artifact-item"></div>
                </div>
            </div>
        </div>
    )
}

const style = `
width: 100%;
background-color: gray;
padding: 10px;
border-radius: 5px;
box-sizing: border-box;
border: 6px solid black;
`

export default HeroDisplayComponent;