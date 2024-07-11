import { Items } from "./mockClass"

describe('Mock Class Tests', () => {
    const cl = new Items()
    it('Adds', () => {
        cl.add(1)
        cl.add(2)
        expect(cl.values).toEqual(new Set([1,2]))
    })
    it('Removes', () => {
        cl.remove(2)
        expect(cl.values).toEqual(new Set([1]))
    })
    it('Gets random int', () => {
        cl.add(2)
        cl.add(3)
        cl.add(4)
        const random = cl.getRandom()
        expect(typeof random).toBe("number")
        expect(cl.values.has(random)).toBeTruthy()
    })
})