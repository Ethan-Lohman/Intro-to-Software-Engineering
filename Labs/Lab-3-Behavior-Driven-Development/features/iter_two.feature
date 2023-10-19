Feature: Iteration Two

    Scenario: A Character cannot Deal Damage to itself.
        Given A character is attacking.
        When The character tries to hit himself
        Then We see their health go down by 0.

    Scenario: A character can only heal itself.
        Given A character is alive.
        When They attempt to heal themselves.
        Then Their health goes up by 500.

#    Scenario: If the target is 5 or more Levels above the attacker, Damage is reduced by 50%
#        Given A character is 5 or more levels below the attacker
#        When The attack is attacking
#        Then The attackers damage is reduced by 50%

   