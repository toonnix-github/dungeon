export const Goblins = [
    {
        name: "Shooty Goblin",
        id: "shooty-goblin",
        position: { x: 0, y: 0 },
        description: "A cowardly creature that peppers its foes with projectiles as it retreats.",
        move: 4,
        attack: {
            damage: 1,
            type: ["range"],
            range: 2
        },
        counterAttack: {
            damage: 1,
            bonusPerGoblin: 1,
            type: ["range", "magic"],
            range: 2
        },
        defense: 2,
        health: 1,
        rewards: [
            { get: "item", amount: 1 },
            { get: "health", amount: 1 }
        ]
    },
    {
        name: "Stabby Goblin",
        id: 'stabby-goblin',
        position: { x: 0, y: 0 },
        description: "A frenzied goblin that charges at heroes with its crude dagger.",
        move: 4,
        attack: {
            damage: 1,
            bonusPerGoblin: 1,
            type: ["melee"],
            range: 0
        },
        counterAttack: {
            damage: 1,
            bonusPerGoblin: 1,
            type: ["melee"],
            range: 0
        },
        defense: 4,
        health: 1,
        rewards: [
            { get: "item", amount: 1 },
            { get: "health", amount: 1 }
        ]
    },
    {
        name: "Sneaky Goblin",
        id: 'sneaky-goblin',
        position: { x: 0, y: 0 },
        description: "A nimble trickster who excels at avoiding detection and ambushing unsuspecting victims.",
        skill: ["windwalk"],
        move: 3,
        attack: {
            damage: 2,
            type: ["melee"],
            range: 0
        },
        counterAttack: {
            damage: 2,
            bonusPerGoblin: 0,
            type: ["melee"],
            range: 0
        },
        defense: 3,
        health: 1,
        rewards: [
            { get: "item", amount: 1 },
        ]
    },
    {
        name: "Bomber Goblin",
        id: 'bomber-goblin',
        position: { x: 0, y: 0 },
        description: "A reckless pyromaniac who loves to throw explosive surprises.",
        move: 2,
        attack: {
            damage: 4,
            type: ["bomb"],
            range: 4
        },
        counterAttack: {
            damage: 0,
            bonusPerGoblin: 0,
            type: []
        },
        defense: 6,
        health: 1,
        rewards: [
            { get: "item", amount: 1 },
            { get: "bomb", amount: 1 }
        ]
    },
    {
        name: "Boss Goblin",
        id: 'boss-goblin',
        position: { x: 0, y: 0 },
        description: "A hulking brute who commands other goblins and boasts increased strength and resilience.",
        skill: 'Goblins gain +1 Attack while the Boss Goblin is in the dungeon.',
        move: 1,
        attack: {
            damage: 4,
            type: ["melee"],
            range: 0
        },
        counterAttack: {
            damage: 4,
            bonusPerGoblin: 2,
            type: ["melee"],
            range: 0
        },
        defense: 8,
        health: 1,
        rewards: [
            { get: "item", amount: 2 },
            { get: "health", amount: 4 }
        ]
    },
    {
        name: "Shadow Goblin",
        id: 'shadow-goblin',
        position: { x: 0, y: 0 },
        description: "A ghostly goblin that can blend into the shadows, attacking heroes when they least expect it.",
        skill: ["windwalk"],
        move: 3,
        attack: {
            damage: 2,
            bonusPerGoblin: 1,
            type: ["meelee"],
            range: 0
        },
        counterAttack: {
            damage: 2,
            bonusPerGoblin: 1,
            type: ["meelee"],
            range: 0
        },
        defense: 2,
        health: 1,
        rewards: [
            { get: "item", amount: 1 },
        ]
    },
    {
        name: "Shaman Goblin",
        id: 'shaman-goblin',
        position: { x: 0, y: 0 },
        description: "A wise goblin that uses dark magic to heal allies and curse enemies.",
        move: 0,
        attack: {
            damage: 1,
            bonusPerGoblin: 1,
            type: ["magic"],
            range: 3
        },
        counterAttack: {
            damage: 1,
            bonusPerGoblin: 1,
            type: ["magic"],
            range: 3
        },
        defense: 3,
        health: 1,
        rewards: [
            { get: "spell", amount: 1 },
            { get: "health", amount: 2 }
        ]
    },
    {
        name: "Goblin King",
        id: 'goblin-king',
        position: { x: 0, y: 0 },
        description: "The ultimate ruler of goblins, strong and cunning, with the power to summon minions.",
        skill: ["SPAWN_MINION"],
        move: 1,
        attack: {
            damage: 0,
            bonusPerGoblin: 0,
        },
        counterAttack: {
            damage: 4,
            bonusPerGoblin: 2,
            type: ["melee", "range", "magic"],
            range: 3
        },
        defense: 10,
        health: 1,
        rewards: [
            { get: "item", amount: 2 },
            { get: "spell", amount: 2 },
        ]
    }
];

export const GoblinMinion = {
    name: "Goblin Minion",
    id: 'goblin-minion',
    position: { x: 0, y: 0 },
    description: "A feeble and tiny goblin, easily frightened and weak in combat, summoned by the Goblin King to swarm and distract enemies.",
    move: 1,
    attack: {
        damage: 0,
        bonusPerGoblin: 0,
    },
    counterAttack: {
        damage: 1,
        bonusPerGoblin: 1,
        type: ["melee"],
        range: 0
    },
    defense: 1,
    health: 1,
    rewards: [
        { get: "health", amount: 1 }
    ]
};
