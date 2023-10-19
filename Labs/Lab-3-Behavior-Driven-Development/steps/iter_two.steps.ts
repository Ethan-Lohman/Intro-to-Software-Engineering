import { defineFeature, loadFeature } from 'jest-cucumber'
import { IPlayer, Player, Combat } from '../rpg-combat'

const feature = loadFeature('./features/iter_two.feature')

defineFeature(feature, (test) => {
    // A player cannot damage itself test
    test('A Character cannot Deal Damage to itself.', ({
        given,
        when,
        then,
    }) => {
        let player: IPlayer | null = null
        let health: number | undefined
        let level: number | undefined
        let alive: boolean | undefined
        let hit: boolean
        let isPlayer: boolean

        given('A character is attacking.', () => {
            new Combat().setHealth(1000)
            health = new Combat().getHealth()
            hit = true
            isPlayer = true
        })

        when('The character tries to hit himself', () => {
            new Combat().isAttacking(hit, 900, isPlayer)
        })

        then(
            /^We see their health go down by (\d+).$/,
            (arg0) => {
                const expectedHealth = 1000 - parseInt(arg0)
                expect(health).toBe(expectedHealth)
            }
        )
    })

    // Character only heals itself test.
    test('A character can only heal itself.', ({
        given,
        when,
        then,
    }) => {
        let player: IPlayer | null = null
        let health: number
        let level: number | undefined
        let alive: boolean | undefined
        let hit: boolean
        let isPlayer: boolean

        given('A character is alive.', () => {
            new Combat().setHealth(500)
            health = new Combat().getHealth()
            hit = true
            isPlayer = true
        })

        when('They attempt to heal themselves.', () => {
            new Combat().Heal(hit, 500, isPlayer)
        })
        then(
            /^Their health goes up by (\d+).$/,
            (arg0) => {
                const expectedHealth = health + parseInt(arg0)
                health = new Combat().getHealth()
                expect(health).toBe(expectedHealth)
            }
        )
    })

    // Wasn't finished

    /*// Tests the damage debuff
    test('A character can only heal itself.', ({
        given,
        when,
        then,
    }) => {
        let player: IPlayer | null = null
        let health: number | undefined
        let level: number
        let alive: boolean | undefined
        let hit: boolean
        let isPlayer: boolean
        let damage: number
        let otherPlayerLvl: number

        given(/^A character is (\d+) or more levels below the attacker$/, (arg0) => {
            
            new Combat().setHealth(1000)
            new Combat().setLevel(8)
            hit = true
            isPlayer = true
        })

        when('The attack is attacking', () => {
            new Combat().Heal(hit, 500, isPlayer)
        })

        then(
            /^The attackers damage is reduced by (\d+)%.$/,
            (arg1) => {
                health = new Combat().getHealth()
                const expectedDamage = damage * (arg1/100)
                expect(health).toBe(health - expectedDamage)
            }
        )
    })*/
})