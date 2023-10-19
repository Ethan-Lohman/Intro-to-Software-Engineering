export interface IPlayer {
    name: string
    level: number
    health: number
    alive: boolean
}

export class Player implements IPlayer {
    public name: string = ''
    public level: number = 1
    public health: number = 1000
    public alive: boolean = true

    constructor() {
        
    }
}

let playerOne = new Player()

export class Combat extends Player{
    public name: string = ''
    public level: number = 1
    public health: number = 1000
    public alive: boolean = true

    isAttacking (hit: boolean, damage: number, isPlayer: boolean = false): void {
        if (hit == true && isPlayer == false) {
            playerOne.health -= damage
        } else {
            playerOne.health -= 0
        }
    }

    Heal (hit: boolean, pointsHealed: number, isPlayer: boolean = false): number {
        if (hit == true && playerOne.health > 0 && playerOne.health < 1000 && isPlayer == true) {
            playerOne.health += pointsHealed
            return playerOne.health
        }
        return playerOne.health
    }

    getHealth (): number {
        return playerOne.health
    }

    setHealth (wantedHealth: number): void {
        playerOne.health = wantedHealth
    }

    getLevel (): number {
        return playerOne.level
    }

    setLevel (wantedLevel: number): void {
        playerOne.level = wantedLevel
    }
}



