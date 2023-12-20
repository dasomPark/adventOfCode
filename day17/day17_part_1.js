const input = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`;

const inputArray = input.split(`\n`);
const startIndex = [0, 0];
const maxRowIndex = inputArray.length - 1;
const maxColIndex = inputArray[0].length - 1;
const distance = [...Array(maxRowIndex + 1)].map(e => Array(maxColIndex + 1));
const visited = [...Array(maxRowIndex + 1)].map(e => Array(maxColIndex + 1));
const prevVisited = [...Array(maxRowIndex + 1)].map(e => Array(maxColIndex + 1));

// distance : shortest path from (0, 0) to (i, j)
// visited : have we visited (i, j) before
for(let i = 0; i < maxRowIndex + 1; i ++) {
    for(let j = 0; j < maxColIndex + 1; j++) {
        distance[i][j] = Infinity;
        visited[i][j] = false;
        prevVisited[i][j] = null;
    }
}

const notVisited = () => {
    const result = [];
    for(let i = 0; i < maxRowIndex + 1; i ++) {
        for(let j = 0; j < maxColIndex + 1; j++) {
            if(!visited[i][j]) {
                result.push([i, j])
            }
            
        }
    }

    return result;
}

const isMaxStraightLine = (row, col, dir) => {
    const firstPrev = prevVisited[row][col];
    if(!firstPrev) {
        return false;
    }

    const secondPrev = prevVisited[firstPrev[0]][firstPrev[1]];
    if(!secondPrev) {
        return false;
    }

    const thridPrev = prevVisited[secondPrev[0]][secondPrev[1]];
    if(!thridPrev) {
        return false;
    }

    if((firstPrev[2] === secondPrev[2]) && (secondPrev[2] === thridPrev[2]) && (thridPrev[2] === dir)) {
        console.log('---------')
        return true;
    }
    return false;
}

const getAdjacentBlocks = (current, previousBlock) => {
    const [row, col] = current;
    const blocks = [];
    const isPreviousBlock = (row, col) => {
        if(!previousBlock) {
            return false;
        } else {
            const [prevRow, prevCol] = previousBlock;
            if(prevRow === row && prevCol === col) {
                return true;
            }
        }
        return false;
    }

    // left
    if(col > 0 && !isPreviousBlock(row, col - 1)) {
        blocks.push([row, col - 1, 'l']);
    }

    // right
    if(col < maxColIndex && !isPreviousBlock(row, col + 1)) {
        blocks.push([row, col + 1, 'r']);
    }

    // upper
    if(row > 0 && !isPreviousBlock(row - 1, col)) {
        blocks.push([row - 1, col, 'u']);
    }

    // lower
    if(row < maxRowIndex && !isPreviousBlock(row + 1, col)) {
        blocks.push([row + 1, col, 'd']);
    }

    return blocks;
}

const findNextBlockToVisit = () => {
    var min = Infinity;
    var minIndex;

    for(let i = 0; i < distance.length; i++) {
        for(let j = 0; j < distance[i].length; j++) {
            if(visited[i][j]) {
                continue;
            }

            if((distance[i][j] < min)) {
                min = distance[i][j];
                minIndex = [i, j];
            }
        }
    }

    return minIndex;
}

const traverse = (startIndex, endIndex, currentDistance, prev = null) => {
    const [row, col] = startIndex;
    visited[row][col] = true;
    var adjacentBlocks = getAdjacentBlocks([row, col], prev);

    adjacentBlocks.map(block => {
        const [newRow, newCol, dir] = block;
        const prevDistance = distance[newRow][newCol];
        const newDistance = Number(inputArray[newRow][newCol]) + currentDistance;
        if(prevDistance > newDistance) {
            distance[newRow][newCol] = newDistance;
            prevVisited[newRow][newCol] = [row, col, dir];
        }
    })

    const nextBlock = findNextBlockToVisit();
    if(!nextBlock) {
        return;
    }

    traverse(nextBlock, endIndex, distance[nextBlock[0]][nextBlock[1]], startIndex);
}

// start from (0, 0)
// visited[0][0] = true;
distance[0][0] = 0;
traverse([0,0], [maxRowIndex, maxColIndex], 0);


var prev = [maxRowIndex, maxRowIndex]
var anss = [prev];
while(prev) {
    prev = prevVisited[prev[0]][prev[1]];
    if(!prev) {
        break;
    }
    anss = [prev, ...anss]
}

var indexToRemove;
for(let i = 0; i < anss.length; i++) {
    if(isMaxStraightLine(anss[i][0], anss[i][1], anss[i][2])) {
        console.log(anss[i])
        indexToRemove = [anss[i][0], anss[i][1]];
        break;
    }
}

console.log(inputArray[indexToRemove[0]])
console.log(anss)
console.log(distance[maxRowIndex][maxColIndex])