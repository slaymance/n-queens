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
  emptyBoard.forEach(function(row, rowIndex) {
    row.forEach(function(ele, colIndex) {
      board.rows()[rowIndex][colIndex] = 1;
      if (board.hasAnyRooksConflictsOn(rowIndex, colIndex)) {
        board.rows()[rowIndex][colIndex] = 0;
      }      
    });
  });
  return board.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n, rowIndex = 0, rookStorage = {}, solutionCount = 0, rookCount = 0) {
  var solutionCount = 0; //fixme
  var rookCount = 0;

  var recursive = function(rowIndex, rookStorage = {}) {
    if (rowIndex === n) {
      if (rookCount === n) { solutionCount++; }
      return;
    }
    for (var colIndex = 0; colIndex < n; colIndex++) {  
      if (!rookStorage[`row ${rowIndex}`] && !rookStorage[`col ${colIndex}`]) {
        rookStorage[`row ${rowIndex}`] = true;
        rookStorage[`col ${colIndex}`] = true;
        rookCount++;
        recursive(rowIndex + 1, rookStorage);
        rookStorage[`row ${rowIndex}`] = false;
        rookStorage[`col ${colIndex}`] = false;
        rookCount--;
      }
    }    
  };
  recursive(0);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
    // var solution = undefined; //fixme
  if (n === 1) {
    return [[1]];
  }
  var emptyBoard = new Array(n);

  for (var i = 0; i < n; i++) {
    emptyBoard[i] = [];
    for (var j = 0; j < n; j++) {
      emptyBoard[i].push(0);
    } 
  }


  var board = new Board(emptyBoard);
  emptyBoard.forEach(function(row, rowIndex) {
    row.forEach(function(ele, colIndex) {
      if (colIndex === 0 && rowIndex === 0) {
        return;
      }
      board.rows()[rowIndex][colIndex] = 1;
      if (board.hasAnyQueenConflictsOn(rowIndex, colIndex)) {
        board.rows()[rowIndex][colIndex] = 0;
      }      
    });
  });
  return board.rows();
};


window.countNQueensSolutions = function(n) {
  const validSolution = 2 ** n - 1;
  let solutionCount = 0;

  function recursive(majorDiagonal, column, minorDiagonal) {
    console.log('Start Recursion');
    if (column === validSolution) {
      solutionCount++;
      return;
    }

    let possibleSolution = ~(majorDiagonal | column | minorDiagonal);

    while (possibleSolution & validSolution) {
      let powerOfTwo = possibleSolution & -possibleSolution;
      possibleSolution -= powerOfTwo;
      recursive((majorDiagonal|powerOfTwo)>>1, column|powerOfTwo, (minorDiagonal|powerOfTwo)<<1)
    }
  };
  recursive(0, 0, 0);
  return solutionCount;
};
