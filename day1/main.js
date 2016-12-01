var mapInput = 'R1, R1, R3, R1, R1, L2, R5, L2, R5, R1, R4, L2, R3, L3, R4, L5, R4, R4, R1, L5, L4, R5, R3, L1, R4, R3, L2, L1, R3, L4, R3, L2, R5, R190, R3, R5, L5, L1, R54, L3, L4, L1, R4, R1, R3, L1, L1, R2, L2, R2, R5, L3, R4, R76, L3, R4, R191, R5, R5, L5, L4, L5, L3, R1, R3, R2, L2, L2, L4, L5, L4, R5, R4, R4, R2, R3, R4, L3, L2, R5, R3, L2, L1, R2, L3, R2, L1, L1, R1, L3, R5, L5, L1, L2, R5, R3, L3, R3, R5, R2, R5, R5, L5, L5, R2, L3, L5, L2, L1, R2, R2, L2, R2, L3, L2, R3, L5, R4, L4, L5, R3, L4, R1, R3, R2, R4, L2, L3, R2, L5, R5, R4, L2, R4, L1, L3, L1, L3, R1, R2, R1, L5, R5, R3, L3, L3, L2, R4, R2, L5, L1, L1, L5, L4, L1, L1, R1',
    mapPath = [],
    currentPos = {
        x: 0,
        y: 0
    },
    directions = [
        'north',
        'east',
        'south',
        'west'
    ],
    turnDirections = {
        'north': {
            'R': 'east',
            'L': 'west'
        },
        'east': {
            'R': 'south',
            'L': 'north'
        },
        'south': {
            'R': 'west',
            'L': 'east'
        },
        'west': {
            'R': 'north',
            'L': 'south'
        }
    }
    lookingAt = 'north',
    distance = 0;

function parseMap() {
    mapPath = mapInput.split(', ');
}

function walkPath() {
    for (path of mapPath) {
        var direction = path.match('[LR]')[0],
            length = parseInt(path.match(/\d+/)[0]);

        lookingAt = turnDirections[lookingAt][direction];

        if (lookingAt === 'south' || lookingAt === 'west') {
            length = -length;
        };

        if (lookingAt === 'north' || lookingAt ==='south') {
            currentPos.y += length;
        } else {
            currentPos.x += length;
        }
    }
}

function calculateDistance() {
    distance = currentPos.x + Math.abs(currentPos.y);
}

parseMap();
walkPath();
calculateDistance();

console.log('distance', distance);