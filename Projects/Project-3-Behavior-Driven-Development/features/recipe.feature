Feature: RecipeItems CRUD

    Scenario Outline: Adding valid data
        Given I hope to be able to add items to the recipie
        When I enter valid data <name>, <amount>, <units>
        Then I should have added an item to the recipe

        Examples:
            | name      | amount | units |
            | milk      | 1      | cup   |
            | sugar     | 2      | tsp   |
            | chocolate | 1      | Tbsp  |

    Scenario Outline: Invalid/missing data
        Given I need to reject invalid data
        When I enter invalid data <name>, <amount>, <units>
        Then I should have added no items to the recipe

        Examples:
            | name      | amount | units |
            |           | 1      | cup   |
            | sugar     | x      | tsp   |
            | chocolate | 1      |       |

    Scenario: Adding an item with no name
        Given I don't want to retype everything
        When I enter an invalid name
        Then The form should be refreshed, keeping my good data

    Scenario: Adding an item with no amount
        Given I don't want to retype everything
        When I enter an invalid amount
        Then The form should be refreshed, keeping my good data

    Scenario: Adding an item with no units
        Given I don't want to retype everything
        When I enter an invalid units
        Then The form should be refreshed, keeping my good data

    Scenario: Should show error notification on bad data
        Given I need hints about invalid data
        When I enter a bad amount
        Then I should see an error message

    Scenario: Should throw if item isn't in recipe
        Given I need to remove an item
        When I remove an item that isn't in the recipe
        Then It should throw

    Scenario: Should update sugar
        Given I need to update the amount of sugar
        When I update sugar's 1 to 99
        Then It should change the amount from 1 to 99
        
    Scenario: Should throw when updating an item that doesn't exist
        Given I need to update an item
        When That item doesn't exist
        Then It should throw

    Scenario: Should delete an item
        Given I need to delete sugar
        When I delete sugar
        Then sugar is gone
