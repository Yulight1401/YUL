class tokenTable {
    constructor () {
        this.orderTokens = []
        this.programList = [0]
        this.tokenTable = {}
    }
    showTokens () {
        console.log(this.orderTokens)
        console.log('--------------')
    }
    pushProgram () {
        this.programList.push(this.orderTokens.length - 1)
    }
    popProgram () {
        let lastIndex = this.programList[this.programList.length - 1]
        this.orderTokens.splice(lastIndex+1, this.orderTokens.length - lastIndex)
        this.programList.pop()
    }
    deleteLine (item) {
        delete item.next
    }
    pushToken (token) {
        if (this.ifTokenExist(token.value)) {
            let item = this.tokenTable[token.value]
            token.pre = item
            // throw new TypeError('multiple declarations : ' + token.value)
        } else {
            this.tokenTable[token.value] = token
        }
        this.orderTokens.push(token)
    }
    releaseTokens (start, end) {
        this.orderTokens.splice(start, end - start)
    }
    getTokenIndex (name) {
        for (let index in this.orderTokens) {
            if (this.orderTokens[index] === name) {
                return index
            }
        }
    }
    getToken (token) {
        if (this.ifTokenExist(token.value)) {
            return this.tokenTable[token]
        }
        // throw new TypeError('Canot find token exist in tokenTable : ', token)
    }
    ifTokenExist (token) {
        return !(this.tokenTable[token] === undefined)
    }
}
var instance
if (!instance) {
    instance = new tokenTable()
}
module.exports = instance