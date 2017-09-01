// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {
  window.callCount = 0;
  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyRooksConflictsOn: function(rowIndex, colIndex) {
      return (this.hasRowConflictAt(rowIndex) || this.hasColConflictAt(colIndex));
    }, 

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(rowIndex, colIndex) ||
        this.hasMinorDiagonalConflictAt(rowIndex, colIndex)
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // console.log('hello', this.attributes);
      var board = this.rows();
      var results = false;
      var count = 0;

      board[rowIndex].forEach(function(ele) {
        // console.log('ele', ele)
        if (ele === 1) {
          count++;
        }
      });
      if (count > 1) {
        results = true;
      }
      return results; 
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // console.log('hello', this.attributes);
      var board = this.rows();
      var results = false;
      //set a count
      //loop through the board object
        //for each row count how many elements equal 1;
        // if there are more than 1 '1' in any row return true;
      var count = 0;
      for (var i in board) {
        count = 0;
        // console.log('problem', i, board[i], board)
        // console.log('row maybe', board[i])
        if (Array.isArray(board[i])) {
          board[i].forEach(function(ele) {
            // console.log('ele', ele)
            if (ele === 1) {
              count++;
            }
          });
          if (count > 1) {
            results = true;
          }
        }
      }
      return results; 
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var board = this.rows();
      var count = 0;

      for (var i = 0; i < board.length; i++) {
        var row = board[i];
        if (Array.isArray(row)) {
          if (row[colIndex] === 1) {
            count++;
          }
        }
      }
      if (count > 1) {
        return true;
      }
      return false; 
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var board = this.rows();
      var context = this;
      var results = false;
      if (!Array.isArray(board[0])) {
        debugger;
      }
      if (Array.isArray(board[0])) {
        console.log('hello')
        // debugger;
        board[0].forEach(function(column, columnIndex) {
          if (context.hasColConflictAt(columnIndex)) {
            results = true;
          }
        });
      }

      return results;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(roIndex, majorDiagonalColumnIndexAtFirstRow) { 
      var board = this.rows();
      // start with first row index 
      var rowIndex = roIndex;
      var columnIndex = majorDiagonalColumnIndexAtFirstRow;
      var count = 0;
      var result = false;
      var recursiveCount = 0;
      var checkedCoordinates = {};
      // add one to the row index and also to the column index and set it to a variable newIndex
      var recursive = function(rowIndex, colIndex) {
        recursiveCount++;
        checkedCoordinates[`${rowIndex}, ${colIndex}`] = true;
        //checks if there is more than one element in majorDiagonal
        if (board[rowIndex][colIndex] === 1) {
          count++;
          if (count > 1) {
            result = true;
            return;
          }
        }
        // if ((recursiveCount > 1) && (rowIndex === roIndex) && (colIndex === majorDiagonalColumnIndexAtFirstRow)) {
        //   return;
        // }
        // console.log('problem', board)
        if (board[rowIndex + 1] !== undefined && board[rowIndex + 1][colIndex + 1] !== undefined && !checkedCoordinates[`${rowIndex + 1}, ${colIndex + 1}`]) {
          recursive(rowIndex + 1, colIndex + 1);
        } 
        if (board[rowIndex - 1] !== undefined && board[rowIndex - 1][colIndex - 1] !== undefined && !checkedCoordinates[`${rowIndex - 1}, ${colIndex - 1}`]) {     
          recursive(rowIndex - 1, colIndex - 1);
        } 
      };
      //check if newIndex has a value of one
      //repeat this until you run out of squares
      // debugger;
      recursive(rowIndex, columnIndex);
      return result; 
    },


    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var board = this.rows();
      var result = false;
      var context = this;

      board.forEach(function(row, rowIndex) {
        row.forEach(function(ele, index) {
          if (context.hasMajorDiagonalConflictAt(rowIndex, index)) {
            result = true;
          }
        });
      }); 
      return result;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(roIndex, minorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      // start with first row index 
      var rowIndex = roIndex;
      var columnIndex = minorDiagonalColumnIndexAtFirstRow;
      var count = 0;
      var result = false;
      var recursiveCount = 0;
      var checkedCoordinates = {};
      // add one to the row index and also to the column index and set it to a variable newIndex
      var recursive = function(rowIndex, colIndex) {
        checkedCoordinates[`${rowIndex}, ${colIndex}`] = true;
        recursiveCount++;
        if (board[rowIndex][colIndex] === 1) {
          count++;
          if (count > 1) {
            result = true;
            return;
          }
        }

        // if ((recursiveCount > 1) && (rowIndex === roIndex) && (colIndex === minorDiagonalColumnIndexAtFirstRow && ``)) {
        //   return;
        // }
        // console.log('problem', board)
        if (board[rowIndex + 1] !== undefined && board[rowIndex + 1][colIndex - 1] !== undefined && !checkedCoordinates[`${rowIndex + 1}, ${colIndex - 1}`]) {
          recursive(rowIndex + 1, colIndex - 1);
        } 
        if (board[rowIndex - 1] !== undefined && board[rowIndex - 1][colIndex + 1] !== undefined && !checkedCoordinates[`${rowIndex - 1}, ${colIndex + 1}`]) {
          recursive(rowIndex - 1, colIndex + 1);
        } 
      };
      //check if newIndex has a value of one
      //repeat this until you run out of squares
      recursive(rowIndex, columnIndex);
      return result; 
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var board = this.rows();
      var result = false;
      var context = this;

      board.forEach(function(row, rowIndex) {
        row.forEach(function(ele, index) {
          if (context.hasMinorDiagonalConflictAt(rowIndex, index, board)) {
            result = true;
          }
        });
      }); 
      return result;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
