export class Items {
    values = new Set()

    constructor() {}

    add(v: number) {
        this.values.add(v)
        return this.values
    }

    remove(v: number) {
        this.values.delete(v)
        return this.values
    }

    getRandom() {
        const index = Math.floor(Math.random() * this.values.size)
        const random = Array.from(this.values)[index]
        console.log({random, index})
        return random
    }
}