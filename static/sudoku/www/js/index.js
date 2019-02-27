/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var grid_1 = __importDefault(__webpack_require__(1));

var popupnumbers_1 = __importDefault(__webpack_require__(6));

var grid = new grid_1.default($('#container'));
grid.build();
grid.layout();
var popupNumbers = new popupnumbers_1.default($('#popupNumbers'));
grid.bindPopup(popupNumbers);
$('#check').on('click', function (e) {
  if (grid.check()) {
    alert('成功！');
  }
});
$('#reset').on('click', function (e) {
  grid.reset();
});
$('#clear').on('click', function (e) {
  grid.clear();
});
$('#rebuild').on('click', function (e) {
  grid.rebuild();
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var sudoku_1 = __importDefault(__webpack_require__(2));

var checker_1 = __importDefault(__webpack_require__(5));

var Grid =
/*#__PURE__*/
function () {
  function Grid(container) {
    _classCallCheck(this, Grid);

    this._$container = container;
  }

  _createClass(Grid, [{
    key: "build",
    value: function build() {
      var sudoku = new sudoku_1.default();
      sudoku.make();
      var matrix = sudoku.puzzleMatrix;
      var $cells = matrix.map(function (rowValues) {
        return rowValues.map(function (cellValue) {
          return $('<span>').addClass(cellValue ? 'fixed' : 'empty').text(cellValue);
        });
      });
      var $divArray = $cells.map(function ($spanArray) {
        return $('<div>').addClass('row').append($spanArray);
      });

      this._$container.append($divArray);
    }
  }, {
    key: "layout",
    value: function layout() {
      var width = $('span:first', this._$container).width() || 0;
      $('span', this._$container).height(width).css({
        'line-height': "".concat(width, "px"),
        'font-size': width < 32 ? "".concat(width / 2, "px") : ''
      });
    }
  }, {
    key: "bindPopup",
    value: function bindPopup(popupNumbers) {
      this._$container.on('click', 'span', function (e) {
        var $cell = $(e.target);
        if ($cell.hasClass('fixed')) return;
        popupNumbers.popup($cell);
      });
    }
  }, {
    key: "check",
    value: function check() {
      var data = this._$container.children().toArray().map(function (div) {
        return $(div).children().map(function (colIndex, span) {
          return parseInt($(span).text()) || 0;
        });
      }).map(function ($data) {
        return $data.toArray();
      });

      var checker = new checker_1.default(data);

      if (checker.check()) {
        return true;
      }

      var marks = checker.matrixMarks;

      this._$container.children().each(function (rowIndex, div) {
        $(div).children().each(function (colIndex, span) {
          if ($(span).hasClass('fixed') || marks[rowIndex][colIndex]) {
            $(span).removeClass('error');
          } else {
            $(span).addClass('error');
          }
        });
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this._$container.find('span:not(.fixed)').removeClass('error mark-1 mark-2').addClass('empty').text(0);
    }
  }, {
    key: "clear",
    value: function clear() {
      this._$container.find('span.error').removeClass('error');
    }
  }, {
    key: "rebuild",
    value: function rebuild() {
      this._$container.empty();

      this.build();
      this.layout();
    }
  }]);

  return Grid;
}();

exports.default = Grid;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var generator_1 = __importDefault(__webpack_require__(3));

var Sudoku =
/*#__PURE__*/
function () {
  function Sudoku() {
    _classCallCheck(this, Sudoku);

    this.puzzleMatrix = [[]];
    var generator = new generator_1.default();
    generator.generate();
    this.solutionMatrix = generator.matrix;
  }

  _createClass(Sudoku, [{
    key: "make",
    value: function make() {
      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
      // const shouldRid = Math.random() * 9 < level
      this.puzzleMatrix = this.solutionMatrix.map(function (row) {
        return row.map(function (cell) {
          return Math.random() * 9 < level ? 0 : cell;
        });
      });
    }
  }]);

  return Sudoku;
}();

exports.default = Sudoku;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var toolkit_1 = __importDefault(__webpack_require__(4));

var Generator =
/*#__PURE__*/
function () {
  function Generator() {
    _classCallCheck(this, Generator);

    this.matrix = [[]];
    this.orders = [[]];
  }

  _createClass(Generator, [{
    key: "generate",
    value: function generate() {
      while (!this.internalGenerate()) {}
    }
  }, {
    key: "internalGenerate",
    value: function internalGenerate() {
      this.matrix = toolkit_1.default.matrix.makeMatrix();
      this.orders = toolkit_1.default.matrix.makeMatrix().map(function (row) {
        return row.map(function (v, i) {
          return i;
        });
      }).map(function (row) {
        return toolkit_1.default.matrix.shuffle(row);
      });

      for (var n = 1; n <= 9; n++) {
        if (!this.fillNumber(n)) return false;
      }

      return true;
    }
  }, {
    key: "fillNumber",
    value: function fillNumber(n) {
      return this.fillRow(n, 0);
    }
  }, {
    key: "fillRow",
    value: function fillRow(n, rowIndex) {
      if (rowIndex > 8) {
        return true;
      }

      var row = this.matrix[rowIndex];
      var orders = this.orders[rowIndex];

      for (var i = 0; i < 9; i++) {
        var colIndex = orders[i];

        if (row[colIndex]) {
          continue;
        }

        if (!toolkit_1.default.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
          continue;
        }

        row[colIndex] = n;

        if (!this.fillRow(n, rowIndex + 1)) {
          row[colIndex] = 0;
          continue;
        }

        return true;
      }

      return false;
    }
  }]);

  return Generator;
}();

exports.default = Generator;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 宫坐标系工具
 */

var boxToolkit = {
  getBoxCells: function getBoxCells(matrix, boxIndex) {
    var startRowIndex = Math.floor(boxIndex / 3) * 3;
    var startColIndex = boxIndex % 3 * 3;
    var result = [];

    for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
      var rowIndex = startRowIndex + Math.floor(cellIndex / 3);
      var colIndex = startColIndex + cellIndex % 3;
      result.push(matrix[rowIndex][colIndex]);
    }

    return result;
  },
  convertToBoxIndex: function convertToBoxIndex(rowIndex, colIndex) {
    return {
      boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
      cellIndex: rowIndex % 3 * 3 + colIndex % 3
    };
  },
  convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
    return {
      rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
      colIndex: boxIndex % 3 * 3 + cellIndex % 3
    };
  }
};
/**
 * 矩阵和数组工具
 */

var MatrixToolkit =
/*#__PURE__*/
function () {
  function MatrixToolkit() {
    _classCallCheck(this, MatrixToolkit);
  }

  _createClass(MatrixToolkit, null, [{
    key: "makeRow",
    value: function makeRow() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var array = new Array(9);
      array.fill(v);
      return array;
    }
  }, {
    key: "makeMatrix",
    value: function makeMatrix() {
      var _this = this;

      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return Array.from({
        length: 9
      }, function () {
        return _this.makeRow(v);
      });
    }
    /**
     * Fisher-Yates 洗牌算法
     */

  }, {
    key: "shuffle",
    value: function shuffle(array) {
      var endIndex = array.length - 2;

      for (var i = 0; i <= endIndex; i++) {
        var j = i + Math.floor(Math.random() * (array.length - i));
        var _ref = [array[j], array[i]];
        array[i] = _ref[0];
        array[j] = _ref[1];
      }

      return array;
    }
  }, {
    key: "checkFillable",
    value: function checkFillable(matrix, n, rowIndex, colIndex) {
      var row = matrix[rowIndex];
      var column = this.makeRow().map(function (v, i) {
        return matrix[i][colIndex];
      });

      var _boxToolkit$convertTo = boxToolkit.convertToBoxIndex(rowIndex, colIndex),
          boxIndex = _boxToolkit$convertTo.boxIndex;

      var box = boxToolkit.getBoxCells(matrix, boxIndex);

      for (var i = 0; i < 9; i++) {
        if (row[i] === n || column[i] === n || box[i] === n) {
          return false;
        }
      }

      return true;
    }
  }]);

  return MatrixToolkit;
}();

var Toolkit =
/*#__PURE__*/
function () {
  function Toolkit() {
    _classCallCheck(this, Toolkit);
  }

  _createClass(Toolkit, null, [{
    key: "matrix",
    get: function get() {
      return MatrixToolkit;
    }
  }, {
    key: "box",
    get: function get() {
      return boxToolkit;
    }
  }]);

  return Toolkit;
}();

exports.default = Toolkit;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var toolkit_1 = __importDefault(__webpack_require__(4));

function checkArray(array) {
  var length = array.length;
  var marks = new Array(length);
  marks.fill(true);

  for (var i = 0; i < length; i++) {
    if (!marks[i]) continue;
    var v = array[i];

    if (!v) {
      marks[i] = false;
      continue;
    }

    for (var j = i + 1; j < length; j++) {
      if (v === array[j]) {
        marks[i] = marks[j] = false;
      }
    }
  }

  return marks;
}

var Checker =
/*#__PURE__*/
function () {
  function Checker(matrix) {
    _classCallCheck(this, Checker);

    this._success = false;
    this._matrix = matrix;
    this._matrixMarks = toolkit_1.default.matrix.makeMatrix(true);
  }

  _createClass(Checker, [{
    key: "check",
    value: function check() {
      this.checkRows();
      this.checkCols();
      this.checkBoxes();
      this._success = this._matrixMarks.every(function (row) {
        return row.every(function (col) {
          return col;
        });
      });
      return this._success;
    }
  }, {
    key: "checkRows",
    value: function checkRows() {
      for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
        var row = this._matrix[rowIndex];
        var marks = checkArray(row);

        for (var colIndex = 0; colIndex < marks.length; colIndex++) {
          if (!marks[colIndex]) this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }, {
    key: "checkCols",
    value: function checkCols() {
      for (var colIndex = 0; colIndex < 9; colIndex++) {
        var col = [];

        for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
          col[rowIndex] = this._matrix[rowIndex][colIndex];
        }

        var marks = checkArray(col);

        for (var _rowIndex = 0; _rowIndex < marks.length; _rowIndex++) {
          if (!marks[_rowIndex]) this._matrixMarks[_rowIndex][colIndex] = false;
        }
      }
    }
  }, {
    key: "checkBoxes",
    value: function checkBoxes() {
      for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
        var box = toolkit_1.default.box.getBoxCells(this._matrix, boxIndex);
        var marks = checkArray(box);

        for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
          if (!marks[cellIndex]) {
            var _toolkit_1$default$bo = toolkit_1.default.box.convertFromBoxIndex(boxIndex, cellIndex),
                rowIndex = _toolkit_1$default$bo.rowIndex,
                colIndex = _toolkit_1$default$bo.colIndex;

            this._matrixMarks[rowIndex][colIndex] = false;
          }
        }
      }
    }
  }, {
    key: "matrixMarks",
    get: function get() {
      return this._matrixMarks;
    }
  }, {
    key: "isSuccess",
    get: function get() {
      return this._success;
    }
  }]);

  return Checker;
}();

exports.default = Checker;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var PopupNumbers =
/*#__PURE__*/
function () {
  function PopupNumbers($panel) {
    var _this = this;

    _classCallCheck(this, PopupNumbers);

    this._$targetCell = $('div');
    this._$panel = $panel.hide().removeClass('hidden');

    this._$panel.on('click', 'span', function (e) {
      var $cell = _this._$targetCell;
      var $span = $(e.target);

      if ($span.hasClass('mark-1')) {
        if ($cell.hasClass('mark-1')) {
          $cell.removeClass('mark-1');
        } else {
          $cell.removeClass('mark-2').addClass('mark-1');
        }
      } else if ($span.hasClass('mark-2')) {
        if ($cell.hasClass('mark-2')) {
          $cell.removeClass('mark-2');
        } else {
          $cell.removeClass('mark-1').addClass('mark-2');
        }
      } else if ($span.hasClass('empty')) {
        $cell.removeClass('mark-1 mark-2').text(0).addClass('empty');
      } else {
        $cell.removeClass('empty').text($span.text());
      }

      _this.hide();
    });
  }

  _createClass(PopupNumbers, [{
    key: "popup",
    value: function popup($cell) {
      this._$targetCell = $cell;

      this._$panel.show();
    }
  }, {
    key: "hide",
    value: function hide() {
      this._$panel.hide();
    }
  }]);

  return PopupNumbers;
}();

exports.default = PopupNumbers;

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map