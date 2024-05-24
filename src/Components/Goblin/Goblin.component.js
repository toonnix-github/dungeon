import { useEffect } from "react";
import { useState } from "react";
import roomStore from "../../Store/Room.store";
import "./Goblin.scss";
import { GoblinDetailComponent } from "./GoblinDetail.component";
import { Tooltip } from "react-tooltip";


export default GoblinComponent;

function GoblinComponent({ index, goblin }) {
    const [goblinOffset, setGoblinOffset] = useState({ top: 0, left: 0 });
    const roomData = roomStore(state => state.rooms[goblin.position.y][goblin.position.x]);
    const popupId = `${goblin.id}-${[goblin.position.y]}-${[goblin.position.x]}-${crypto.randomUUID().substring(0, 8)}`;

    useEffect(() => {
        setGoblinOffset({ top: roomData.offset.bottom, left: roomData.offset.right });
    }, [goblin.position]);
    return (
        <div key={index} className="avatar-goblin"
            data-tooltip-id={popupId}
            style={{ top: (goblinOffset.top - 40), left: (goblinOffset.left - 40) }}
        >
            <Tooltip id={popupId}
                opacity={0.9}
                style={{ maxWidth: '500px', padding: '0' }}
            >
                <GoblinDetailComponent goblin={goblin} />
            </Tooltip>
        </div >
    );
}

