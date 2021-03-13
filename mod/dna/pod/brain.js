const A = null
const B = null
const X = null
const Z = null

function setReg(reg, val) {
    if (isString(val)) {
        const e = lab.world.locateByTag(val)
        if (!e) {
            log.warn(`unable to locate en entity for [${val}]`)
            return
        }
        val = e
    }
    this[reg] = val
}

// find register value in the provided list
function findRegVal(reg, list) {
    const r = this[reg]
    return list.indexOf(r)
}

function firstRegVal() {
    return (this.A || this.B || this.X || this.Z)
}

function resetFirstReg() {
    if(this.A) this.A = null
    else if (this.B) this.B = null
    else if (this.X) this.X = null
    else if (this.Z) this.Z = null
}

function iorders() {
    if (!this.orders) return 0
    const i = env.tune.orders.indexOf(this.orders)
    return (i < 0? 0 : i)
}

function getOrders() {
    if (!this.orders) return env.tune.orders[0]
    return this.orders
}

function setOrders(orders) {
    this.orders = orders
}

function order(cmd, A, B, X, Z) {
    this.orders = cmd
    this.setReg('A', A)
    this.setReg('B', B)
    this.setReg('X', X)
    this.setReg('Z', Z)
}

function regToString(eg) {
    if (!reg) return '- none -'
    else return (reg.title || reg.name)
}

function dump() {
    log('A: ' + regToString(this.A))
    log('B: ' + regToString(this.B))
    log('X: ' + regToString(this.X))
    log('Z: ' + regToString(this.Z))
}