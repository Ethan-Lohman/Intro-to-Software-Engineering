// Facade Class
export class Calculator {
    // Makes the variables that hold the subclasses
    add = new Addition();
    sub = new Subtraction();
    mul = new Multiplication();
    div = new Division();

    public calc(num1:number, num2:number, operation:string): number {
        // Makes the definitions for the object.
        let adding = this.add.ition(num1, num2)
        let subtracting = this.sub.tract(num1, num2)
        let multiplying = this.mul.tiple(num1, num2)
        let dividing = this.div.ide(num1, num2)
        
        // Holds the valid symbols and their function that would be called.
        const validSymbol: { [key: string]: number } = {'+':adding, '-':subtracting, '*':multiplying, '/':dividing}
        
        // Finds the valid operation, and returns that operation.
        for (const symbol in validSymbol) {
            if (symbol === operation) {
                return validSymbol[symbol]
            }
        }
        
        // Throws an Error if not one valid symbol is found.
        throw new Error("Not a valid Symbol")
    }
}

// Subclasses
class Addition {
    public ition(num1: number, num2: number): number {
        return num1 + num2;
    }
}

class Subtraction {
    public tract(num1: number, num2: number): number {
        return num1 - num2;
    }
}

class Multiplication {
    public tiple(num1: number, num2: number): number {
        return num1 * num2;
    }
}

class Division {
    public ide(num1: number, num2: number): number {
        return num1 / num2;
    }
}