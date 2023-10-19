Feature: Working with a singleton DB
 
    Scenario: Adding a single item to a singleDB
        Given I have previously created a singleDB
        When I add a single item to the database
        | name    | height   |
        | Joe     | 69.1     |
        Then I should see the number of items increase by 1

    Scenario: Constructing a new DB should give the original
        Given I have previously created a singleDB
        When I create a new one
        Then It should actually be the old one.

    Scenario: A newly created "second" database should have old content
        Given I have previously created a singleDB with these contents:
        | name    | height   |
        | Joe     | 69.1     |
        When I create a new one
        Then I should see the same contents as the original
