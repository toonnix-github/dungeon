import "./HeroAction.scss";

function HeroActionComponent() {
    return (
        <div className="action-container">
            <button className="open-chest-action"></button>
            <button className="disarm-trap-action"></button>
            <button className="attack-action"></button>
            <button className="magic-action"></button>
        </div>
    )
}

export default HeroActionComponent;