import VikingStore from '../Store/Viking.store';

function VikingComponent({ }) {
    const vikingOffset = VikingStore((state) => state.offset);
    return (
        <>
            {vikingOffset[0] !== 0 &&
                <span style={{ top: vikingOffset[0], left: vikingOffset[1] }} className='icon icon-viking'></span>
            }
        </>
    )
}

export default VikingComponent;