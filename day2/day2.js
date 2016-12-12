!function() {
    'use strict';

    var keypad = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ],
        intelligentDesignKeypad = [
            '  1  ',
            ' 234 ',
            '56789',
            ' ABC ',
            '  D  '
        ],
        instructions = `ULL
RRDDD
LURDL
UUUUD`,
        instructionsIntelligent = `RLRDDRLLDLRLUDDULLDRUUULDDLRLUDDDLDRRDUDDDLLURDDDLDDDRDURUDRDRRULUUDUDDRRRLRRRRRLRULRLLRULDRUUDRLRRURDDRLRULDLDULLLRULURRUULLRLLDDDDLLDURRUDLDLURDRDRDLUUUDDRDUUDDULLUURRDRLDDULURRRUDLLULULDLLURURUDRRRRUDRLRDLRRLDDRDDLULDLLLURURDUDRRRRUULURLRDULDRLUDRRUDDUULDURUDLDDURRRDLULLUUDRLLDUUDLDRUDDRLLLLLLDUDUDDLRDLRRDRUDDRRRLLRRDLLRLDDURUURRRDDLDUULLDLDLRURDLLLDDRUUDRUDDDDULRLLDUULRUULLLULURRRLLULDLDUDLDLURUDUDULLDLLUUDRRDRLUURURURURDLURUUDLDRLUDDUUDULDULULLLDLDDULLULLDULRRDRULLURRRULLDDDULULURLRDURLLURUDDULLRUDLRURURRDRDUULDRUUDURDURDDLRDUUULDUUDRDURURDRRRURLLDDLLLURURULULUDLRDLDRDRURLRLULRDLU
UDLDURRULDRDDLDUULUDLDUULUURDDRUDRURRRUDRURLLDDRURLDLRDUUURDLLULURDDUDDDRRRURLLDLDLULRDULRLULDLUUDLLRLDLRUUULDDUURDLDDRRDLURLDUDDRURDRRURDURRRLUULURDDLRDLDRRRLDUDRLRLLRLDDUULDURUUULLLRRRRRRRDRRRDRLUULDLDDLULDRDUDLLUDRRUDRUUDULRLUURDDDDRRUUDLURULLLURDULUURDRDDURULRUDRRDLRDUUUUUDDDRDRDDRUDRDDDRLRUUDRDRDDDLUDRDRLDRDDRULURDRLDRUDUDRUULRLLUDRDRLLLLDUDRRLLURDLLLDRRUDDUDRLRLDUDRLURRUUULURDDRUURRLDRLRRRUUDLULDDDRDLDUUURLLUULDDRRUDLDDRUDUDUURURDDRDULLLLLULRRRDLRRRDDDLURDDDDLUULLLRDDURRRRLURRLDDLRUULULRDRDDDDLDUUUUUUDRRULUUUDD
UURDRRUDLURRDDDLUDLRDURUDURDLLLLRDLRLRDDRDRDUUULRDLLDLULULRDUDDRRUUDURULDLUDLRDRUDLDDULLLDDRDLLDULLLURLLRDDLDRDULRRDDULRDURLLRUDRLRRLUDURLDRDLDLRLLLURLRRURDLDURDLUDULRDULLLDRDDRDLDRDULUULURDRRRLDRRUULULLDDRRLDLRUURLRUURLURRLLULUUULRLLDDUDDLRLDUURURUDLRDLURRLLURUDLDLLUDDUULUUUDDDURDLRRDDDLDRUDRLRURUUDULDDLUUDDULLDDRRDDRRRUDUDUDLDLURLDRDLLLLDURDURLRLLLUUDLRRRRUDUDDLDLRUURRLRRLUURRLUDUDRRRRRRRLDUDDRUDDLUDLRDDDRLDUULDRDRRDLDRURDLDRULRLRLUDRDLRRUURUUUUDLDUUULLLRRRRRDLRRURDDLLLLUULDLLRULLUDLLDLLUDLRLRRLRURDDRRL
URDRDLLRDDDLLLDDLURLRURUURRRLUURURDURRLLUDURRLRLDLUURDLULRRDRUDDLULDLDRLDLRLRRLLLDDDUDDDLRURURRLLDRRRURUDLRDDLLDULDDLDRLUUUDRRRULDUULRDDDLRRLLURDDURLULRDUDURRLLDLLRLDUDDRRDDLRLLLDUDRLUURRLLDULRLDLUUUUUDULUDLULUDDUURRURLDLDRRLDLRRUDUDRRDLDUDDLULLDLLRDRURDRDRRLDDDDRDDRLLDDDLLUDRURLURDRRRRRUDDDUDUDDRDUUDRRUDUDRLULDDURULUURUUUURDRULRLRULLDDRRRUULRRRRURUDLDLRDLLDRLURLRUULLURDUDULRRURLRLLRRLLLURULRRRLDDUULLUUULRRDRULUUUUDRDRRDLRURLRLLRLRRRDRDRLDLUURUURULLDLULRRLRRDRULRRLLLDDURULLDLDLDLUUURDLDLUUDULRLLUDDRRDLLDLDLDURLUURRDDRRURDRLUDRLUUUDLDULDLUDRLDUDDLLRUDULLLLLDRRLLUULLUUURRDDUURDLLRDDLRLLU
LDUDRRDLUUDDRLLUUULURLDUDLUDLRLDRURLULRLLDDLRRUUUDDDDRDULDDUUDLRUULDRULLRDRUDDURLDUUURRUDUDRDRDURRDLURRRDRLDLRRRLLLRLURUURRDLLRDLDDLLRDUDDRDUULRULRRURLUDDUDDDUULLUURDULDULLLLRUUUDDRRRLDDDLDLRRDRDRDLUULRLULDRULDLRDRRUDULUDLLUDUULRDLRRUUDDLLDUDDRULURRLULDLDRRULDDRUUDDLURDLRDRLULRRLURRULDUURDLUDLLDRLDULLULDLLRDRDLLLUDLRULLRLDRDDDLDDDLRULDLULLRUUURRLLDUURRLRLDUUULDUURDURRULULRUUURULLLRULLURDDLDRLLRDULLUDLDRRRLLLLDUULRRLDURDURDULULDUURLDUDRLRURRDLUUULURRUDRUUUDRUR`,
        code = '',
        codeIntelligent = '',
        currentPos = [1, 1],
        currentPosIntelligent = [0, 2],
        edge = keypad[0].length - 1,
        intelligentEdge = intelligentDesignKeypad[0].length - 1;

    function parseInstructions() {
        instructions = instructions.split('\n');
        instructionsIntelligent = instructionsIntelligent.split('\n');
    }

    function getNewPos(origin, instruction) {
        let pos = origin;

        for (let move of instruction) {
            if (move === 'U') {
                if (pos[1] > 0)
                    pos[1]--;
            } else if (move === 'R') {
                if (pos[0] < edge)
                    pos[0]++;
            } else if (move === 'D') {
                if (pos[1] < edge)
                    pos[1]++;
            } else if (move === 'L') {
                if (pos[0] > 0)
                    pos[0]--;
            }
        }

        return pos;
    }

    function getNewPosIntelligent(origin, instruction) {
        let pos = origin.slice(),
            prevPos;

        for (let move of instruction) {
            console.log('move', move);
            prevPos = pos.slice();

            if (move === 'U') {
                if (pos[1] > 0)
                    pos[1]--;
            } else if (move === 'R') {
                if (pos[0] < intelligentEdge)
                    pos[0]++;
            } else if (move === 'D') {
                if (pos[1] < intelligentEdge)
                    pos[1]++;
            } else if (move === 'L') {
                if (pos[0] > 0)
                    pos[0]--;
            }

            console.log('pos', pos);

            let keypadValue = intelligentDesignKeypad[pos[1]][pos[0]];

            if (keypadValue === ' ' || !keypadValue) {
                console.log('no value here!', pos);
                console.log('prev:', prevPos);
                pos = prevPos.slice();
            }
        }


        return pos;
    }

    function readCode() {
        for (let instruction of instructions) {
            currentPos = getNewPos(currentPos, instruction);

            code += keypad[currentPos[1]][currentPos[0]];
        }
    }

    function readCodeIntelligent() {
        for (let instruction of instructionsIntelligent) {
            currentPosIntelligent = getNewPosIntelligent(currentPosIntelligent, instruction);

            codeIntelligent += intelligentDesignKeypad[currentPosIntelligent[1]][currentPosIntelligent[0]];
        }
    }

    parseInstructions();
    readCode();
    console.log('code', code);
    readCodeIntelligent();
    console.log('intelligent code', codeIntelligent);
}();