import _ from "lodash";

const DiceFaces = [
    {
        number: 1,
        string: '+1',
        type: 'add',
        effect: 'action',
        effectPoint: 2
    },
    {
        number: 2,
        string: '+2',
        type: 'add',
        effect: 'action',
        effectPoint: 3
    },
    {
        number: 3,
        string: '3',
        type: 'main',
        effect: 'action',
        effectPoint: 1
    },
    {
        number: 4,
        string: '4',
        type: 'main',
        effect: 'action',
        effectPoint: 1
    },
    {
        number: 5,
        string: '5',
        type: 'main',
        effect: 'none',
        effectPoint: 0
    },
    {
        number: 6,
        string: '6',
        type: 'main',
        effect: 'health',
        effectPoint: 1
    }
]

class DiceUtil {
    static rollDice = () => {
        return _.sample(DiceFaces);
    };
}

export default DiceUtil;