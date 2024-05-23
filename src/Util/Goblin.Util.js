import _ from "lodash";
import { Goblins } from "../Assets/Goblin";

export const getRandomGoblin = () => {
    return _.sample(Goblins);
};