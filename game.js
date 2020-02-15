class Game {
    constructor() {
        this.inProgress = true;
        this.winner = null;
        this.currentTurn = Game.O;
        this.movesMade = 0;
        this.squares = new Array(9).fill().map( s=> new Square() ),

        this.doMove = function(i){
            if (this.inProgress && !this.squares[i].value) {
                this.squares[i].value = this.currentTurn;
    
                this.movesMade++;
                this.checkForWinner();
                this.currentTurn = (this.currentTurn === Game.O) ? Game.X : Game.O;
            }
        },

        this.checkForWinner = function(){
            const winningCombos = [
                [0,1,2],
                [3,4,5],
                [6,7,8],
                [0,3,6],
                [1,4,7],
                [2,5,8],
                [0,4,8],
                [2,4,6],
            ];
    
            winningCombos.forEach((wc) => {
                const [a,b,c] = wc;
                const sqA = this.squares[a]
                const sqB = this.squares[b]
                const sqC = this.squares[c]
    
                if (sqA.value && sqA.value === sqB.value && sqA.value === sqC.value ) {
                   this.inProgress = false; 
                   this.winner = sqA.value;
                   sqA.isMarked = sqB.isMarked = sqC.isMarked = true;
                }
            });
    
            // Checking for tie
            if (this.movesMade === this.squares.length) {
                this.inProgress = false; // meaning Winner = null;
            }
        }
    }
}

Game.O ='O';
Game.X = 'X';