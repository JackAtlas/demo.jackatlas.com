import Toolkit from './toolkit'

function checkArray(array: number[]): boolean[] {
    const length = array.length
    const marks: boolean[] = new Array(length)
    marks.fill(true)

    for (let i = 0; i < length; i++) {
        if (!marks[i]) continue
        const v = array[i]

        if (!v) {
            marks[i] = false
            continue
        }

        for (let j = i + 1; j < length; j++) {
            if (v === array[j]) {
                marks[i] = marks[j] = false
            }
        }
    }

    return marks
}

export default class Checker {
    private _matrix: number[][]
    private _matrixMarks: boolean[][]
    private _success: boolean = false

    constructor(matrix: number[][]) {
        this._matrix = matrix
        this._matrixMarks = Toolkit.matrix.makeMatrix(true)
    }

    get matrixMarks(): boolean[][] {
        return this._matrixMarks
    }

    get isSuccess(): boolean {
        return this._success
    }

    check(): boolean {
        this.checkRows()
        this.checkCols()
        this.checkBoxes()

        this._success = this._matrixMarks.every(row => row.every(col => col))
        return this._success
    }

    private checkRows() {
        for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
            const row = this._matrix[rowIndex]
            const marks = checkArray(row)

            for (let colIndex = 0; colIndex < marks.length; colIndex++) {
                if (!marks[colIndex]) this._matrixMarks[rowIndex][colIndex] = false
            }
        }
    }

    private checkCols() {
        for (let colIndex = 0; colIndex < 9; colIndex++) {
            const col = []
            for (let rowIndex = 0; rowIndex < 9; rowIndex ++) {
                col[rowIndex] = this._matrix[rowIndex][colIndex]
            }

            const marks = checkArray(col)

            for (let rowIndex = 0; rowIndex < marks.length; rowIndex++) {
                if (!marks[rowIndex]) this._matrixMarks[rowIndex][colIndex] = false
            }
        }
    }

    private checkBoxes() {
        for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
            const box = Toolkit.box.getBoxCells(this._matrix, boxIndex)
            const marks = checkArray(box)

            for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
                if (!marks[cellIndex]) {
                    const { rowIndex, colIndex } = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex)
                    this._matrixMarks[rowIndex][colIndex] = false
                }
            }
        }
    }
}
