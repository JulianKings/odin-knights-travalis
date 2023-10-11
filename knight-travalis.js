class Movement {
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.path = [];
    }
}

class Square {
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.possibleMoves = [];
        this.visited = false;
        this.parent = -1;
    }
}


const isValidPosition = (position) => (position >= 0 && position < 8)

const populateMoves = (origin) => {

    let movementArray = [];
    let originX = origin.x;
    let originY = origin.y;

    // downwards
    if(isValidPosition(originX-2) && isValidPosition(originY+1))
    {
        movementArray.push(new Movement(originX-2, originY+1))
    }

    if(isValidPosition(originX-1) && isValidPosition(originY+2))
    {
        movementArray.push(new Movement(originX-1, originY+2))
    }

    if(isValidPosition(originX+2) && isValidPosition(originY+1))
    {
        movementArray.push(new Movement(originX+2, originY+1))
    }

    if(isValidPosition(originX+1) && isValidPosition(originY+2))
    {
        movementArray.push(new Movement(originX+1, originY+2))
    }

    // upwards
    if(isValidPosition(originX-2) && isValidPosition(originY-1))
    {
        movementArray.push(new Movement(originX-2, originY-1))
    }

    if(isValidPosition(originX-1) && isValidPosition(originY-2))
    {
        movementArray.push(new Movement(originX-1, originY-2))
    }

    if(isValidPosition(originX+2) && isValidPosition(originY-1))
    {
        movementArray.push(new Movement(originX+2, originY-1))
    }

    if(isValidPosition(originX+1) && isValidPosition(originY-2))
    {
        movementArray.push(new Movement(originX+1, originY-2))
    }
    
    return movementArray;
}

const gameBoard = [
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','','']
];

const populateBoard = () => {
    for(let x = 0; x < 8; x++)
    {
        for(let y = 0; y < 8; y++)
        {
            let currentSquare = new Square(x, y);
            currentSquare.possibleMoves = populateMoves(currentSquare);
            currentSquare.visited = false;
            currentSquare.parent = -1;
            gameBoard[y][x] = currentSquare;
        }
    }    
}

const knightMoves = (start, end) =>
{
    let startPos = new Movement(start[0], start[1]);
    let endPos = new Movement(end[0], end[1]);    
    populateBoard();

    tryMovement(startPos, endPos);
}

const tryMovement = (start, end) => {
    let pathArray = [];

    let queue = [];
    queue.push(start);

    gameBoard[start.y][start.x].visited = true;
    gameBoard[start.y][start.x].parent = -1;

    queueloop:
    while(queue.length > 0)
    {
        let nextNode = queue.shift();
        for(square of gameBoard[nextNode.y][nextNode.x].possibleMoves)
        {
            let nextSquare = gameBoard[square.y][square.x];
            if(!nextSquare.visited)
            {
                gameBoard[square.y][square.x].visited = true;
                gameBoard[square.y][square.x].parent = nextNode;
                queue.push(square);

                if(square.x === end.x && square.y === end.y)
                break queueloop;
            }
        }
    }

    let currentParent = gameBoard[end.y][end.x].parent;
    while(currentParent !== -1)
    {
        if(currentParent.x !== start.x && currentParent.y !== start.y)
        {
            pathArray.push(currentParent);
        }
        currentParent = gameBoard[currentParent.y][currentParent.x].parent;
    }
    pathArray.push(start);
    let finalArray = pathArray.reverse();    
    finalArray.push(end);

    console.log("Your shortest path has " + finalArray.length + " steps:")
    for(move of finalArray)
    {
        console.log(`[${move.x},${move.y}]`);
    }
    console.log("----");
}

knightMoves([0,0],[3,3]);
knightMoves([0,0],[1,2]);
knightMoves([3,3],[0,0]);
knightMoves([0,0],[7,1]);
