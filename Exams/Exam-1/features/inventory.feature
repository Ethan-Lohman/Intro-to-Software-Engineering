Feature: InventoryManager Scenarios

    Scenario Outline: Adding items to a shelf
        Given I have a store
        And given I have a shelf in that store
        When I add an item to that shelf with data <title> <quantity> <description> <price>
        Then I should have added that item to the shelf

        Examples:
            | title        | quantity | description                           | price |
            | Moby Dick    | 10       | a book about a big fish               | 2.5   |
            | Star Wars    | 15       | an old, yet somehow new, movie series | 3.4   |

    Scenario: Total cost should be calculated correctly
        Given I have previously created an inventory with these contents:
            | title        | quantity | description                           | price |
            | Moby Dick    | 10       | a book about a big fish               | 2.5   |
            | Star Wars    | 15       | an old, yet somehow new, movie series | 3.4   |
        When I compute the total cost
        Then it should be calculated correctly

    Scenario: Inventory should be sorted descending by price
        Given I have previously created an inventory with these contents:
            | title        | quantity | description                           | price |
            | Moby Dick    | 10       | a book about a big fish               | 2.5   |
            | Star Wars    | 15       | an old, yet somehow new, movie series | 3.4   |
        When I sort the items by price
        Then it should been sorted by price descending, [3.4, 2.5]

    Scenario: Inventory should be give the right count.
        Given I have previously created an inventory with these contents:
            | title        | quantity | description                           | price |
            | Moby Dick    | 10       | a book about a big fish               | 2.5   |
            | Star Wars    | 15       | an old, yet somehow new, movie series | 3.4   |
        When I count the amount in the inventory.
        Then it should be the right size.

