Feature: Iteration One

    Scenario: Creatures start out with max health and alive.
        Given A character has just been created
        When We check their health, level, and status
        Then We see their health is 1000, level is 1, and status is alive.
    
    Scenario: Damage is subtracted from Health.
        Given A character is attacking.
        When The character hits the other character.
        Then We see their health go down by 2.

   Scenario: When damage received exceeds current Health, Health becomes 0 and the character dies.
        Given A character is being damaged.
        When The damage received exceeds the characters current health.
        Then The characters health goes to 0 and they are dead.

    Scenario: Dead characters cannot be healed.
        Given A character is dead.
        When The dead character is healed by another character.
        Then We will see their health remain at 0.

    Scenario: Healing cannot raise health above 1000.
        Given A character is alive at maximum health.
        When The character is healed.
        Then We will not see the characters health exceed 1000. 

