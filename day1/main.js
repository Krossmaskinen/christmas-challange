!function (){
    'use strict';

    var mapInput = 'R1, R1, R3, R1, R1, L2, R5, L2, R5, R1, R4, L2, R3, L3, R4, L5, R4, R4, R1, L5, L4, R5, R3, L1, R4, R3, L2, L1, R3, L4, R3, L2, R5, R190, R3, R5, L5, L1, R54, L3, L4, L1, R4, R1, R3, L1, L1, R2, L2, R2, R5, L3, R4, R76, L3, R4, R191, R5, R5, L5, L4, L5, L3, R1, R3, R2, L2, L2, L4, L5, L4, R5, R4, R4, R2, R3, R4, L3, L2, R5, R3, L2, L1, R2, L3, R2, L1, L1, R1, L3, R5, L5, L1, L2, R5, R3, L3, R3, R5, R2, R5, R5, L5, L5, R2, L3, L5, L2, L1, R2, R2, L2, R2, L3, L2, R3, L5, R4, L4, L5, R3, L4, R1, R3, R2, R4, L2, L3, R2, L5, R5, R4, L2, R4, L1, L3, L1, L3, R1, R2, R1, L5, R5, R3, L3, L3, L2, R4, R2, L5, L1, L1, L5, L4, L1, L1, R1',
    // var mapInput = 'R8, R4, R4, R8',
        mapPath = [],
        currentPos = {
            x: 0,
            y: 0
        },
        trail = [],
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
        },
        lookingAt = 'north',
        visitedTwiceLocation;

    function parseMap() {
        mapPath = mapInput.split(', ');
    }

    function checkDoubleVisit() {
        if (!visitedTwiceLocation) {
            for(let i = 0; i < trail.length; ++i) {
                let step = trail[i];

                if (step.x === currentPos.x && step.y === currentPos.y) {
                    console.log(i);
                    visitedTwiceLocation = {
                        x: currentPos.x,
                        y: currentPos.y
                    };
                }
            }
        }
    }

    function walkPath() {
        trail.push({
            x: currentPos.x,
            y: currentPos.y
        });

        for (let path of mapPath) {
            var direction = path.match('[LR]')[0],
                directionMultiplier,
                length = parseInt(path.match(/\d+/)[0]);

            lookingAt = turnDirections[lookingAt][direction];
            directionMultiplier = (lookingAt === 'west' || lookingAt === 'south') ? -1 : 1;

            if (lookingAt === 'south' || lookingAt === 'west') {
                length = -length;
            };

            if (lookingAt === 'north' || lookingAt ==='south') {
                for (let i = 0; i < Math.abs(length); i++) {
                    currentPos.y += directionMultiplier;
                    checkDoubleVisit();
                    trail.push({
                        x: currentPos.x,
                        y: currentPos.y
                    });
                }
            } else {
                for (let i = 0; i < Math.abs(length); i++) {
                    currentPos.x += directionMultiplier;
                    checkDoubleVisit();
                    trail.push({
                        x: currentPos.x,
                        y: currentPos.y
                    });
                }
            }
        }
    }

    function calculateDistance(position) {
        return Math.abs(position.x) + Math.abs(position.y);
    }

    function getHQDistance() {
        var distX = Math.abs(Math.abs(currentPos.x) - Math.abs(visitedTwiceLocation.x)),
            distY = Math.abs(Math.abs(currentPos.y) - Math.abs(visitedTwiceLocation.y));

        return distX + distY;
    }

    parseMap();
    walkPath();

    var currentDistance = calculateDistance(currentPos);
    var HQDistance = calculateDistance(visitedTwiceLocation);

    var indexes = [];

    console.log('distance', currentDistance);
    console.log('HQ distance', HQDistance);
}();