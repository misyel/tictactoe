console.log("loaded");

const board = (() => {
    let board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ]

    const setCell = (value, cell) => {
        board[cell] = value
    }

    const getCell = (cell) => {
        return board[cell];
    }

    const checkWinner = () => {
        if(
            board[1]==board[2]==board[3]
            || board[4]==board[5]==board[6] 
            || board[7]==board[8]==board[9]
            || board[1]==board[5]==board[9]
            || board[7]==board[5]==board[3]
            || board[1]==board[4]==board[7]
            || board[2]==board[5]==board[8]
            || board[3]==board[6]==board[9]
        ){
            return true;
        }
    }
    //display game board
    const render = () =>{
        console.log("rendering");
        const cells = document.querySelectorAll('.cell');
        for(i=0;i<board.length;i++){
            cells[i].innerHTML = board[i];
        }
    }

    return {render, setCell, checkWinner, getCell};
})();

const Player = (name, mark) => {

    return{name, mark}
}

const gameState = (() => {
    const startButton = document.getElementById('start');
    const cells = document.querySelectorAll('.cell');
    const form = document.getElementById('form');
    const closeForm = document.getElementById('cancel');
    const submitForm = document.getElementById('submit');
    const inputs = document.querySelectorAll('input');
    const turnString = document.getElementById('turn');
    const player1 = Player();
    const player2 = Player();
    var turn = player1; //start with x turn


    const started = () => {
        board.render();
        startButton.addEventListener("click", startGame);
    }

    const startGame = () => {
        form.style.display = 'block'; //display form
        submitForm.addEventListener('click', initPlayers);
        cells.forEach(cell => cell.addEventListener('click', function(){
            console.log(cell);
            const clicked = cell;
            move(clicked);
        }));
    }

    const initPlayers = () => {
        form.style.display = 'none'; //close form
        player1.name = inputs[0].value;
        player1.mark = "X";
        player2.name = inputs[1].value;
        player2.mark = "O";
        //turn = player1.name;
    }

    const switchTurns = () => {
        if(turn==player1){
            turn=player2;
        }
        else{
            turn=player1;
        }
        console.log(turn);
    }
    const move = (cell) => {
        console.log('moving');
        console.log(cell);
        var index = parseInt(cell.getAttribute('data-index'));
        console.log(index);
        board.setCell(turn.mark, index);
        board.render();
        switchTurns();
    }

    return{started}
})();

gameState.started();
