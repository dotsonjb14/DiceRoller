class Engine {
    get rollBtn() {
        return document.querySelector('#rollBtn');
    }

    get clearBtn() {
        return document.querySelector('#clearBtn');
    }

    get rollsContainer() {
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

    get output() {
        return this.rollsContainer.textContent;
    }

    set output(value) {
        this.rollsContainer.textContent = value;
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
        if(this.times === null) {
            alert('enter in a number for rolls');
            return;
        }
        let rolls = [];
        for(let i = 0; i < this.times; i++) {
            rolls.push(this._getRoll());
        }
        

        this.output += rolls.map(x => x.toString()).join(', ') + '\n';

        if(this.rerollOnes) {
            rolls = this.doRerollOnes(rolls);
        }

        if(this.drop !== null) {
            this.output += `Dropping lowest ${this.drop} rolls\n`;

            let droppable = rolls.map(x => x);
            droppable.sort();

            let toDrop = [];

            for(let i = 0; i < this.drop; i++) {
                toDrop.push(droppable[i]);
            }

            this.output += 'Dropping ' + toDrop.map(x => x.toString()).join(', ') + '\n'

            for(let r of toDrop) {
                let index = rolls.indexOf(r);
                rolls[index] = null;
            }

            rolls = rolls.filter(x => x !== null);

            this.output += 'Left is ' + rolls.map(x => x.toString()).join(', ') + '\n';
        }

        let sum = rolls.reduce((state, val) => state + val, 0);

        this.output += `Total: ${sum}\n`

    }

    doRerollOnes(rolls) {
        let numRerolls = rolls.filter(x => x === 1).length;
        if(numRerolls == 0) {
            return rolls;
        }

        this.output += `rerolling ${numRerolls} times due to 1(s)\n`

        let newRolls = rolls.filter(x => x !== 1);

        for(let i = 0; i < numRerolls; i++) {
            newRolls.push(this._getRoll());
        }

        this.output += 'Rolled: ';

        this.output += newRolls.map(x => x.toString()).join(', ') + '\n';

        return this.doRerollOnes(newRolls);
    }

    clearBtnClick() {
        this.rollsContainer.textContent = ""
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

    _getRoll() {
        return Math.floor(Math.random() * (this.rollType - 1 + 1)) + 1;
    }
}
