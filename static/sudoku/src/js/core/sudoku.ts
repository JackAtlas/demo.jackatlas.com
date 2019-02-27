import Generator from '../core/generator'

export default class Sudoku {
    solutionMatrix: number[][]
    puzzleMatrix: number[][] = [[]]

    constructor() {
        const generator = new Generator()
        generator.generate()
        this.solutionMatrix = generator.matrix
    }

    make(level: number = 5) {
        // const shouldRid = Math.random() * 9 < level
        this.puzzleMatrix = this.solutionMatrix.map(row => row.map(cell => Math.random() * 9 < level ? 0 : cell))
    }
}
