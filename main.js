console.log("loaded");

const board = (() => {
    let board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];
    
    const reset = () => {
        board = [
            "", "", "",
            "", "", "",
            "", "", ""
        ];
    }

    const setCell = (value, cell) => {
        board[cell] = value
    }

    const getCell = (cell) => {
        return board[cell];
    }

    const checkWinner = () => {
        console.log((board[1]==board[2]) && (board[2]==board[3]) && !(board[2]==""));
        console.log((board[1]==board[2]))
        console.log((board[2]==board[3]))
        console.log(!(board[2]==""))
        if((board[0]==board[1]) && (board[1]==board[2]) && !(board[1]=="")){
            console.log('1')
            return true;
        }
        else if((board[3]==board[4]) && (board[4]==board[5]) && !(board[4]=="")){
            console.log('2')
            return true;
        }
        else if((board[6]==board[7]) && (board[7]==board[8]) && !(board[7]=="")){
            console.log('3')
            return true;
        }
        else if((board[0]==board[4]) && (board[4]==board[8]) && !(board[4]=="")){
            console.log('4')
            return true;
        }
        else if((board[6]==board[4]) && (board[4]==board[2])&& !(board[4]=="")){
            console.log('5')
            return true;
        }
        else if((board[0]==board[3]) && (board[3]==board[6]) && !(board[3]=="")){
            console.log('6')
            return true;
        }
        else if((board[1]==board[4]) && (board[4]==board[7])&& !(board[4]=="")){
            console.log('7')
            return true;
        }
        else if((board[2]==board[5]) && (board[5]==board[8])&& !(board[5]=="")){
            console.log('8')
            return true;
        }
        return false;
    }
    //display game board
    const render = () =>{
        const cells = document.querySelectorAll('.cell');
        for(i=0;i<board.length;i++){
            cells[i].innerHTML = board[i];
        }
    }

    return {render, setCell, checkWinner, getCell, reset};
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
            const clicked = cell;
            move(clicked);
        }));
    }

    const initPlayers = () => {
        if(inputs[0].value && inputs[1].value){
            form.style.display = 'none'; //close form
            player1.name = inputs[0].value;
            player1.mark = "X";
            player2.name = inputs[1].value;
            player2.mark = "O";
            turnString.innerText = `${turn.name}'s turn`
        }
        else{
            alert("please enter names!");
        }
    }

    const switchTurns = () => {
        if(turn==player1){
            turn=player2;
        }
        else{
            turn=player1;
        }
        turnString.innerText = `${turn.name}'s turn`
        console.log(turn);
    }
    const move = (cell) => {
        var index = parseInt(cell.getAttribute('data-index'));
        if(!board.getCell(index)){
            board.setCell(turn.mark, index);
            board.render();
            console.log(board.checkWinner());
        }
        if(board.checkWinner()){
            console.log('win is', board.checkWinner());
            turnString.innerText = `${turn.name} wins!`
            alert(`${turn.name} wins!`);
            board.reset();
            board.render();
        }
        switchTurns();
    }

    return{started}
})();

gameState.started();
