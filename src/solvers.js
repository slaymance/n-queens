/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // var solution = undefined; //fixme
  var emptyBoard = new Array(n);

  for (var i = 0; i < n; i++) {
    emptyBoard[i] = [];
    for (var j = 0; j < n; j++) {
      emptyBoard[i].push(0);
    } 
  }


  var board = new Board(emptyBoard);
  // console.log('Board: ' + board.hasAnyRooksConflictsOn(0, 0));
  // console.log('board', board, emptyBoard);
  emptyBoard.forEach(function(row, rowIndex) {
    row.forEach(function(ele, colIndex) {
      // console.log('First board: ' + board.rows());
      board.rows()[rowIndex][colIndex] = 1;
      if (board.hasAnyRooksConflictsOn(rowIndex, colIndex)) {
        board.rows()[rowIndex][colIndex] = 0;
        // console.log('Second board: ' + board.rows());
      }      
    });
  });
  
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // console.log('maybe board', n, 'board', board)
  return board.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  //iterate through first row, setting the element to 1
  //  then recursively find every permutation with a 1 at that element
  //  base case would be last row can't move its 1
  //
  var emptyBoard = new Array(n);
  for (var i = 0; i < n; i++) {
    emptyBoard[i] = [];
    for (var j = 0; j < n; j++) {
      emptyBoard[i].push(0);
    } 
  }
  
  if (n === 2) {
    console.log('n === 2');
    // debugger;
  }
  // var board = new Board(emptyBoard);
  // for (var m = 0; m < emptyBoard.length; i++) {
  var recursive = function(rowIndex, colIndex, board) {
    //loop from 0 - n with variable i'
    var newBoard = new Board(board);
    var board = newBoard.rows();

    if (rowIndex === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < board[rowIndex].length; i++) {  
      newBoard.rows()[rowIndex][i] = 1;
      if (newBoard.hasAnyRooksConflictsOn(rowIndex, i)) {
        newBoard.rows()[rowIndex][i] = 0;
      } else {
        recursive(rowIndex + 1, 0, newBoard.rows());
        newBoard.rows()[rowIndex][i] = 0;
      }
    }
      

    // recursive(index, index, board.rows());
    
  };
  recursive(0, 0, emptyBoard);

//build board
//recursly(rowIndex, colIndex) call 0,i
//base case: if rowIndex === n, store board as solution, return
//place one at cordinate
//check if theres a column conflict
//if yes, make cordinate equal 0
//recursive(rowIndex, colIndex + 1)
//if not, recursive(rowIndex + 1, 0)
//check for row conflict
//if there is a row conflict set coordinate to 0
  //recurse()
// otherwise, call the recursion(rowIndex)

  
  

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
