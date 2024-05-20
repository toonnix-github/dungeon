const roomInformationList = {
    1: {
        name: "Duke Agares",
        foundGoblin: true,
        exist: {
            top: true,
            bottom: true,
            left: true,
            right: false
        },
        description: "",
        id: 1
    },
    2: {
        name: "Prince Vassago",
        foundGoblin: true,
        exist: {
            top: false,
            bottom: true,
            left: true,
            right: true
        },
        description: "",
        id: 2
    },
    3: {
        name: "Marquis Samigina",
        foundGoblin: true,
        exist: {
            top: true,
            bottom: false,
            left: true,
            right: true
        },
        description: "",
        id: 3
    },
    4: {
        name: "President Marbas",
        foundGoblin: true,
        exist: {
            top: true,
            bottom: true,
            left: true,
            right: true
        },
        description: "",
        id: 4
    },
    5: {
        name: "Duke Valefor",
        foundGoblin: true,
        exist: {
            top: true,
            bottom: false,
            left: false,
            right: true
        },
        description: "",
        id: 5
    },
    6: {
        name: "Marquis Amon",
        foundGoblin: true,
        exist: {
            top: true,
            bottom: true,
            left: false,
            right: true
        },
        description: "",
        id: 6
    },
    7: {
        name: "Duke Barbatos",
        foundGoblin: true,
        exist: {
            top: false,
            bottom: true,
            left: true,
            right: true
        },
        description: "",
        id: 7
    },
    8: {
        name: "King Paimon",
        foundGoblin: true,
        exist: {
            top: true,
            bottom: true,
            left: true,
            right: true
        },
        description: "",
        id: 8
    },
    9: {
        name: "President Buer",
        foundGoblin: true,
        exist: {
            top: true,
            bottom: false,
            left: true,
            right: true
        },
        description: "",
        id: 9
    },
    10: {
        name: "Duke Gusion",
        foundGoblin: true,
        exist: {
            top: false,
            bottom: false,
            left: true,
            right: false
        },
        description: "",
        id: 10
    },
    11: {
        name: "Prince Sitri",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: true,
            left: true,
            right: true
        },
        description: "",
        id: 11
    },
    12: {
        name: "King Beleth",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: true,
            left: false,
            right: true
        },
        description: "",
        id: 12
    },
    13: {
        name: "Marquis Leraje",
        isTrapRoom: true,
        punishment: 2,
        requirePower: 'attack',
        requireAmount: 5,
        solved: false,
        exist: {
            top: true,
            bottom: false,
            left: true,
            right: true
        },
        description: "",
        id: 13
    },
    14: {
        name: "Duke Eligos",
        foundGoblin: false,
        isTrapRoom: true,
        punishment: 2,
        requirePower: 'speed',
        requireAmount: 5,
        solved: false,
        exist: {
            top: true,
            bottom: false,
            left: false,
            right: true
        },
        description: "",
        id: 14
    },
    15: {
        name: "Duke Zepar",
        foundGoblin: false,
        isTrapRoom: true,
        punishment: 2,
        requirePower: 'attack',
        requireAmount: 5,
        solved: false,
        exist: {
            top: true,
            bottom: true,
            left: true,
            right: false
        },
        description: "",
        id: 15
    },
    16: {
        name: "President Botis",
        foundGoblin: false,
        isTrapRoom: true,
        punishment: 2,
        requirePower: 'magic',
        requireAmount: 5,
        solved: false,
        exist: {
            top: true,
            bottom: false,
            left: true,
            right: true
        },
        description: "",
        id: 16
    },
    17: {
        name: "Duke Bathin",
        foundGoblin: false,
        isTrapRoom: true,
        punishment: 2,
        requirePower: 'attack',
        requireAmount: 5,
        solved: false,
        exist: {
            top: true,
            bottom: false,
            left: true,
            right: true
        },
        description: "",
        id: 17
    },
    18: {
        name: "Duke Sallos",
        foundGoblin: false,
        isTrapRoom: true,
        punishment: 2,
        requirePower: 'attack',
        requireAmount: 5,
        solved: false,
        exist: {
            top: false,
            bottom: true,
            left: false,
            right: true
        },
        description: "",
        id: 18
    },
    19: {
        name: "King Purson",
        foundGoblin: false,
        isTrapRoom: true,
        punishment: 2,
        requirePower: 'magic',
        requireAmount: 5,
        solved: false,
        exist: {
            top: true,
            bottom: true,
            left: true,
            right: true
        },
        description: "",
        id: 19
    },
    20: {
        name: "President Morax",
        foundGoblin: false,
        isTrapRoom: true,
        punishment: 2,
        requirePower: 'speed',
        requireAmount: 5,
        solved: false,
        exist: {
            top: false,
            bottom: false,
            left: true,
            right: true
        },
        description: "",
        id: 20
    },
    21: {
        name: "Prince Ipos",
        foundGoblin: false,
        isTrapRoom: true,
        punishment: 2,
        requirePower: 'attack',
        requireAmount: 5,
        solved: false,
        exist: {
            top: true,
            bottom: true,
            left: true,
            right: false
        },
        description: "",
        id: 21
    },
    22: {
        name: "Duke Aim",
        foundGoblin: false,
        isTrapRoom: true,
        punishment: 2,
        requirePower: 'attack',
        requireAmount: 5,
        solved: false,
        exist: {
            top: false,
            bottom: false,
            left: true,
            right: true
        },
        description: "",
        id: 22
    },
    23: {
        name: "Marquis Naberius",
        foundGoblin: false,
        isTreasureRoom: true,
        punishment: 3,
        requirePower: 'magic',
        requireAmount: 5,
        solved: false,
        exist: {
            top: false,
            bottom: true,
            left: false,
            right: true
        },
        description: "",
        id: 23
    },
    24: {
        name: "President Glasya-Labolas",
        foundGoblin: false,
        isTreasureRoom: true,
        punishment: 3,
        requirePower: 'speed',
        requireAmount: 5,
        solved: false,
        exist: {
            top: true,
            bottom: false,
            left: true,
            right: false
        },
        description: "",
        id: 24
    },
    25: {
        name: "Duke Buné",
        foundGoblin: false,
        isTreasureRoom: true,
        punishment: 3,
        requirePower: 'attack',
        requireAmount: 5,
        solved: false,
        exist: {
            top: true,
            bottom: false,
            left: true,
            right: true
        },
        description: "",
        id: 25
    },
    26: {
        name: "Marquis",
        foundGoblin: false,
        isTreasureRoom: true,
        punishment: 3,
        requirePower: 'speed',
        requireAmount: 5,
        solved: false,
        exist: {
            top: true,
            bottom: true,
            left: true,
            right: false
        },
        description: "",
        id: 26
    },
    27: {
        name: "Duke Berith",
        foundGoblin: false,
        isTreasureRoom: true,
        punishment: 3,
        requirePower: 'attack',
        requireAmount: 5,
        solved: false,
        exist: {
            top: true,
            bottom: false,
            left: true,
            right: false
        },
        description: "",
        id: 27
    },
    28: {
        name: "Duke Astaroth",
        foundGoblin: false,
        isTreasureRoom: true,
        punishment: 3,
        requirePower: 'magic',
        requireAmount: 5,
        solved: false,
        exist: {
            top: false,
            bottom: true,
            left: true,
            right: false
        },
        description: "",
        id: 28
    },
    29: {
        name: "Marquis Forneus",
        foundGoblin: false,
        isTreasureRoom: true,
        punishment: 3,
        requirePower: 'attack',
        requireAmount: 5,
        solved: false,
        exist: {
            top: false,
            bottom: true,
            left: true,
            right: false
        },
        description: "",
        id: 29
    },
    30: {
        name: "President Foras",
        foundGoblin: false,
        isTreasureRoom: true,
        punishment: 3,
        requirePower: 'speed',
        requireAmount: 5,
        solved: false,
        exist: {
            top: true,
            bottom: true,
            left: false,
            right: true
        },
        description: "",
        id: 30
    },
    31: {
        name: "King Asmodeus",
        foundGoblin: false,
        isTreasureRoom: true,
        punishment: 3,
        requirePower: 'attack',
        requireAmount: 5,
        solved: false,
        exist: {
            top: true,
            bottom: true,
            left: false,
            right: true
        },
        description: "",
        id: 31
    },
    32: {
        name: "President Gäap",
        foundGoblin: false,
        isTreasureRoom: true,
        punishment: 3,
        requirePower: 'magic',
        requireAmount: 5,
        solved: false,
        exist: {
            top: false,
            bottom: true,
            left: true,
            right: false
        },
        description: "",
        id: 32
    }, 33: {
        name: "Count Furfur",
        foundGoblin: false,
        isTreasureRoom: true,
        punishment: 3,
        requirePower: 'speed',
        requireAmount: 5,
        solved: false,
        exist: {
            top: true,
            bottom: true,
            left: false,
            right: true
        },
        description: "",
        id: 33
    },
    34: {
        name: "Marquis Marchosias",
        foundGoblin: false,
        isTreasureRoom: true,
        punishment: 3,
        requirePower: 'magic',
        requireAmount: 5,
        solved: false,
        exist: {
            top: true,
            bottom: true,
            left: false,
            right: true
        },
        description: "",
        id: 34
    },
    35: {
        name: "Prince Stolas",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: true,
            left: false,
            right: true
        },
        description: "",
        id: 35
    },
    36: {
        name: "Marquis Phenex",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: true,
            left: true,
            right: false
        },
        description: "",
        id: 36
    },
    37: {
        name: "Count Halphas",
        foundGoblin: false,
        exist: {
            top: false,
            bottom: true,
            left: true,
            right: false
        },
        description: "",
        id: 37
    },
    38: {
        name: "President Malphas",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: false,
            left: false,
            right: true
        },
        description: "",
        id: 38
    },
    39: {
        name: "Count Räum",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: true,
            left: true,
            right: true
        },
        description: "",
        id: 39
    },
    40: {
        name: "Duke Focalor",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: false,
            left: true,
            right: true
        },
        description: "",
        id: 40
    },
    41: {
        name: "Duke Vepar",
        foundGoblin: false,
        exist: {
            top: false,
            bottom: true,
            left: false,
            right: true
        },
        description: "",
        id: 41
    },
    42: {
        name: "Marquis Sabnock",
        foundGoblin: false,
        exist: {
            top: false,
            bottom: false,
            left: true,
            right: true
        },
        description: "",
        id: 42
    },
    43: {
        name: "Marquis Shax",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: true,
            left: false,
            right: true
        },
        description: "",
        id: 43
    },
    44: {
        name: "Count Viné",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: false,
            left: true,
            right: true
        },
        description: "",
        id: 44
    },
    45: {
        name: "Count Bifrons",
        foundGoblin: false,
        exist: {
            top: false,
            bottom: true,
            left: true,
            right: false
        },
        description: "",
        id: 45
    },
    46: {
        name: "Duke Vual",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: false,
            left: false,
            right: true,
        },
        description: "",
        id: 46
    },
    47: {
        name: "President Haagenti",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: true,
            left: false,
            right: false
        },
        description: "",
        id: 47
    },
    48: {
        name: "Duke Crocell",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: true,
            left: false,
            right: true
        },
        description: "",
        id: 48
    },
    49: {
        name: "Knight Furcas",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: true,
            left: true,
            right: false
        },
        description: "",
        id: 49
    },
    50: {
        name: "King Balam",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: false,
            left: true,
            right: true
        },
        description: "",
        id: 50
    },
    51: {
        name: "Duke Alloces",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: true,
            left: false,
            right: true
        },
        description: "",
        id: 51
    },
    52: {
        name: "President Caim",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: true,
            left: true,
            right: false
        },
        description: "",
        id: 52
    },
    53: {
        name: "Count Murmur",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: false,
            left: true,
            right: true
        },
        description: "",
        id: 53
    },
    54: {
        name: "Prince Orobas",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: false,
            left: true,
            right: true
        },
        description: "",
        id: 54
    },
    55: {
        name: "Duke Gremory",
        foundGoblin: false,
        exist: {
            top: false,
            bottom: true,
            left: false,
            right: true
        },
        description: "",
        id: 55
    },
    56: {
        name: "President Ose",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: true,
            left: false,
            right: true
        },
        description: "",
        id: 56
    },
    57: {
        name: "President Amy",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: false,
            left: false,
            right: true
        },
        description: "",
        id: 57
    },
    58: {
        name: "Marquis Orias",
        foundGoblin: false,
        exist: {
            top: false,
            bottom: true,
            left: false,
            right: true
        },
        description: "",
        id: 58
    },
    59: {
        name: "Duke Vapula",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: false,
            left: true,
            right: false
        },
        description: "",
        id: 59
    },
    60: {
        name: "President Zagan",
        foundGoblin: false,
        exist: {
            top: false,
            bottom: true,
            left: true,
            right: true
        },
        description: "",
        id: 60
    },
    61: {
        name: "President Valac",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: false,
            left: false,
            right: true
        },
        description: "",
        id: 61
    },
    62: {
        name: "Marquis Andras",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: false,
            left: true,
            right: true
        },
        description: "",
        id: 62
    },
    63: {
        name: "Duke Flauros",
        foundGoblin: false,
        exist: {
            top: false,
            bottom: true,
            left: false,
            right: true
        },
        description: "",
        id: 63
    },
    64: {
        name: "Marquis Andrealphus",
        foundGoblin: false,
        exist: {
            top: false,
            bottom: true,
            left: true,
            right: false
        },
        description: "",
        id: 64
    },
    65: {
        name: "Marquis Kimaris",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: true,
            left: true,
            right: false
        },
        description: "",
        id: 65
    },
    66: {
        name: "Duke Amdusias",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: false,
            left: false,
            right: true
        },
        description: "",
        id: 66
    },
    67: {
        name: "King Belial",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: true,
            left: false,
            right: true
        },
        description: "",
        id: 67
    },
    68: {
        name: "Marquis Decarabia",
        foundGoblin: false,
        exist: {
            top: false,
            bottom: false,
            left: true,
            right: true
        },
        description: "",
        id: 68
    },
    69: {
        name: "Prince Seere",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: true,
            left: false,
            right: false
        },
        description: "",
        id: 69
    },
    70: {
        name: "Duke Dantalion",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: true,
            left: false,
            right: false
        },
        description: "",
        id: 70
    },
    71: {
        name: "Count Andromalius",
        foundGoblin: false,
        exist: {
            top: true,
            bottom: false,
            left: true,
            right: false
        },
        description: "",
        id: 71
    },
    72: {
        name: "King Bael",
        foundGoblin: true,
        exist: {
            top: true,
            bottom: false,
            left: true,
            right: true
        },
        description: "",
        id: 0
    },
}
export default roomInformationList; 