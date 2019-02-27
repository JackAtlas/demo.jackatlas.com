export default class PopupNumbers {
    private _$panel: JQuery
    private _$targetCell: JQuery = $('div')

    constructor($panel: JQuery) {
        this._$panel = $panel.hide().removeClass('hidden')

        this._$panel.on('click', 'span', e => {
            const $cell = this._$targetCell
            const $span = $(e.target)

            if ($span.hasClass('mark-1')) {
                if ($cell.hasClass('mark-1')) {
                    $cell.removeClass('mark-1')
                } else {
                    $cell.removeClass('mark-2').addClass('mark-1')
                }
            } else if ($span.hasClass('mark-2')) {
                if ($cell.hasClass('mark-2')) {
                    $cell.removeClass('mark-2')
                } else {
                    $cell.removeClass('mark-1').addClass('mark-2')
                }
            } else if ($span.hasClass('empty')) {
                $cell.removeClass('mark-1 mark-2').text(0).addClass('empty')
            } else {
                $cell.removeClass('empty').text($span.text())
            }
            this.hide()
        })
    }

    popup($cell: JQuery) {
        this._$targetCell = $cell
        this._$panel.show()
    }

    hide() {
        this._$panel.hide()
    }
}
