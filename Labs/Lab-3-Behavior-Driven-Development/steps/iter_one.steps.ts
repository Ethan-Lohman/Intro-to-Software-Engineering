import { defineFeature, loadFeature } from 'jest-cucumber'
import { IPlayer, Player, Combat } from '../rpg-combat'

const feature = loadFeature('./features/iter_one.feature')

defineFeature(feature, (test) => {
    // fresh character test
    test('Creatures start out with max health and alive.', ({
        given,
        when,
        then,
    }) => {
        let player: IPlayer | null = null
        let health: number | undefined
        let level: number | undefined
        let alive: boolean | undefined

        given('A character has just been created', () => {
            player = new Player()
        })

        when('We check their health, level, and status', () => {
            level = player!.level
            health = player!.health
            alive = player!.alive
        })

        then(
            /^We see their health is (\d+), level is (\d+), and status is alive.$/,
            (arg0, arg1) => {
                const expectedLevel = parseInt(arg1)
                const expectedHealth = parseInt(arg0)
                expect(level).toBe(expectedLevel)
                expect(health).toBe(expectedHealth)
                expect(alive).toBe(true)
            }
        )
    })


    // Damage Test
    test('Damage is subtracted from Health.', ({
        given,
        when,
        then,
    }) => {
        let player: IPlayer | null = null
        let health: number | undefined
        let level: number | undefined
        let alive: boolean | undefined
        let hit: boolean | undefined

        given('A character is attacking.', () => {
            hit == true
        })

        when('The character hits the other character.', () => {
            health = new Combat().getHealth()
        })

        then(
            /^We see their health go down by (\d+).$/,
            (arg0) => {
                if (health != undefined && hit == true) {
                    new Combat().isAttacking(hit, arg0)
                    expect(health).toBe(health - arg0)
                    expect(alive).toBe(true)
                }
            }
        )
    })

    // Death Test 
    test('When damage received exceeds current Health, Health becomes 0 and the character dies.', ({
        given,
        when,
        then,
    }) => {
        let player: IPlayer | null = null
        let health: number | undefined
        let level: number | undefined
        let alive: boolean | undefined
        let hit: boolean | undefined

        given('A character is being damaged.', () => {
            hit == true
        })

        when('The damage received exceeds the characters current health.', () => {
            health = new Combat().getHealth()
        })

        then(
            /^The characters health goes to (\d+) and they are dead.$/,
            (arg0) => {
                if (health != undefined && hit == true) {
                    new Combat().isAttacking(hit, health)
                    expect(health).toBe(arg0)
                    expect(alive).toBe(false)
                }
            }
        )
    })

    // Healing dead characters test
    test('Dead characters cannot be healed.', ({
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

        given('A character is dead.', () => {
            hit = true
            alive = false
            isPlayer = true
            new Combat().isAttacking(hit, 1000)
        })

        when('The dead character is healed by another character.', () => {
            health = new Combat().Heal(hit, 10, isPlayer)
        })

        then(
            /^We will see their health remain at (\d+).$/,
            (arg0) => {
                expect(health).toBe(parseInt(arg0))
                expect(alive).toBe(false)
            }
        )
    })

    // Healing does not go above 1000.
    test('Healing cannot raise health above 1000.', ({
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

        given('A character is alive at maximum health.', () => {
            hit = true
            alive = true
            isPlayer = true
            new Combat().setHealth(1000)
        })

        when('The character is healed.', () => {
            health = new Combat().Heal(hit, 10, isPlayer)
        })

        then(
            /^We will not see the characters health exceed (\d+).$/,
            (arg0) => {
                expect(health).toBe(parseInt(arg0))
                expect(alive).toBe(true)
            }
        )
    })
})
