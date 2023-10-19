// Imports the calculator to test.
import { Calculator } from "../src/index"
const calculator = new Calculator

describe('Addition Function Test', () => {
    it('Should add up to 3', () => {
        const calc = calculator.calc(1, 2, '+') // num1, num2, function
        expect(calc).toBe(3)
    })
})

describe('Subtraction Function test', () => {
    it('Should subtract to 1', () => {
        const calc = calculator.calc(2, 1, '-') // num1, num2, function
        expect(calc).toBe(1)
    })
})

describe('Multiplication Function Test', () => {
    it('Should multiply to 9', () => {
        const calc = calculator.calc(3, 3, '*') // num1, num2, function
        expect(calc).toBe(9)
    })
})

describe('Division Function Test', () => {
    it('Should divide to 2', () => {
        const calc = calculator.calc(18, 9, '/') // num1, num2, function
        expect(calc).toBe(2)
    })
})

describe('No Function Test', () => {
    it('Throw an Error', () => {
        let func: () => void
        func = () => calculator.calc(18, 9, '=')
        expect(func).toThrow()
    })
})