class Engine {
    get rollBtn() {
        return document.querySelector('#rollBtn');
    }

    get clearBtn() {
        return document.querySelector('#clearBtn');
    }

    get rolls() {
        return document.querySelector('#rolls')
    }

    get times() {
        return this._getNum(document.querySelector('#times').value);
    }

    get rollType() {
        return this._getNum(document.querySelector('#rollType').value);
    }

    get drop() {
        return this._getNum(document.querySelector('#drop').value);
    }

    get rerollOnes() {
        return document.querySelector('#rerolls').checked
    }

    constructor() {
        // bind to this
        this.rollBtnClick = this.rollBtnClick.bind(this);
        this.clearBtnClick = this.clearBtnClick.bind(this);
    }

    init() {
        this.rollBtn.addEventListener('click', this.rollBtnClick)
        this.clearBtn.addEventListener('click', this.clearBtnClick)
    }

    rollBtnClick() {
        console.log(this.times)
    }

    clearBtnClick() {
        this.rolls.textContent += ""
    }

    _getNum(value) {
        let num = parseInt(value);
        if(!isNaN(num)) {
            return num;
        }
        else {
            return null;
        }
    }
}
