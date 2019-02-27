import Sodoku from '../core/sudoku'
import Checker from '../core/checker'
import PopupNumbers from './popupnumbers'

export default class Grid {
    private _$container: JQuery

    constructor(container: JQuery) {
        this._$container = container
    }

    build() {
        const sudoku = new Sodoku()
        sudoku.make()
        const matrix = sudoku.puzzleMatrix

        const $cells = matrix.map(rowValues => rowValues.map(cellValue => {
            return $('<span>').addClass(cellValue ? 'fixed' : 'empty').text(cellValue)
        }))

        const $divArray = $cells.map($spanArray => {
            return $('<div>').addClass('row').append($spanArray)
        })

        this._$container.append($divArray)
    }

    layout() {
        const width = $('span:first', this._$container).width() || 0
        $('span', this._$container).height(width).css({
            'line-height': `${width}px`,
            'font-size': width < 32 ? `${width / 2}px` : ''
        })
    }

    bindPopup(popupNumbers: PopupNumbers) {
        this._$container.on('click', 'span', e => {
            const $cell = $(e.target)
            if ($cell.hasClass('fixed')) return
            popupNumbers.popup($cell)
        })
    }

    check() {
        const data = this._$container.children()
            .toArray()
            .map(div => {
                return $(div).children().map((colIndex, span) => parseInt($(span).text()) || 0)
            })
            .map($data => $data.toArray())

        const checker = new Checker(data)
        if (checker.check()) {
            return true
        }

        const marks = checker.matrixMarks
        this._$container.children()
            .each((rowIndex, div) => {
                $(div).children().each((colIndex, span) => {
                    if ($(span).hasClass('fixed') || marks[rowIndex][colIndex]) {
                        $(span).removeClass('error')
                    } else {
                        $(span).addClass('error')
                    }
                })
            })
    }

    reset() {
        this._$container.find('span:not(.fixed)').removeClass('error mark-1 mark-2').addClass('empty').text(0)
    }

    clear() {
        this._$container.find('span.error').removeClass('error')
    }

    rebuild() {
        this._$container.empty()
        this.build()
        this.layout()
    }
}
