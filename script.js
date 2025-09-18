function gameboard(){
   const board = Array.from({ length: 9 }, () => Cell());

    // // return the board
    const getboard=() => board;

    // print board on console
    const printBoard = () => {
        const display = board.map(cell => cell.getValue());
        console.log(display.slice(0,3));
        console.log(display.slice(3,6));
        console.log(display.slice(6,9));
    }

    //     // add mark to the board
    const dropMarker = (index, player) => {
    if (board[index].getValue() === '') {
        board[index].addMarker(player);
        return true;
    } else {
        console.log("Cell already taken!");
        return false;
    }
    };

    return{getboard,dropMarker,printBoard};
}

function Cell(){
    let value='';
    const addMarker= (player) => {
        if(value===''){
        value=`${player}`;
        }
    }
    const getValue = () => value;

    return { addMarker, getValue };
}

function GameControl(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
){
    const board=gameboard();

    const players=[
        {
            name:playerOneName,
            marker:'X'
        },
        {
            name:playerTwoName,
            marker:'O'
        }
    ]
    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const playRound= (column) => {
        console.log(
      `Placing ${getActivePlayer().name}'s token into column ${column}...`);
        board.dropMarker(column,getActivePlayer().marker);
        // after turn completion switch player
        switchPlayerTurn();
        printNewRound();
    }
    return{playRound,getActivePlayer};
}
    

// integrating with html 

const p1name=document.querySelector('#p1name');
const p2name=document.querySelector('#p2name');
const submit=document.querySelector('#submit');

submit.addEventListener('click', (event) => {
    event.preventDefault();
    game = GameControl(p1name.value, p2name.value);
    console.log("Game started!");
    makeMove(0)
});

// Create a function to be triggered from UI or manually
function makeMove(index) {
    if (game) {
        game.playRound(index);
    } else {
        console.log("Game has not started yet!");
    }
}


// game.playRound(1)
// game.playRound(2)
// game.playRound(3)
// game.playRound(4)
// game.playRound(5)
// game.playRound(6)
// game.playRound(7)
// game.playRound(8)
// game.playRound(1)