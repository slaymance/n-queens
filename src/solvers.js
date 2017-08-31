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
  var solutionCount = undefined; //fixme

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
