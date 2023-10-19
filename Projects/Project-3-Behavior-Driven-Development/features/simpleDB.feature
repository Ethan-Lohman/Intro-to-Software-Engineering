Feature: Working with the SimpleDB
 
    Scenario: Adding a single item to the DB
        Given I have previously created a database
        When I add a single item to the DB
        Then I should see its size increase

    Scenario: Find an item in the DB
        Given my DB has the following items:
        | name    | height   |
        | Joe     | 69.1     |
        | Sarah   | 64.2     |
        | Shaq    | 86.0     |
        When I search for someone over 80 inches
        Then I should see the following result:
        | name    | height   |
        | Shaq    | 86.0     |

    Scenario: Clearing DB
        Given I have previously created a database:
        | name    | height   |
        | Joe     | 69.1     |
        | Sarah   | 64.2     |
        | Shaq    | 86.0     |
        When I want to clear it
        Then It should be empty

    Scenario: Updating DB
        Given I have previously created a database:
        | name    | height   |
        | Joe     | 69.1     |
        | Sarah   | 64.2     |
        | Shaq    | 86.0     |
        When I want update Joe's height to 70
        Then Joe's height should be 70

    Scenario: Sorting DB
        Given I have previously created a database:
        | name    | height   |
        | Joe     | 69.1     |
        | Sarah   | 64.2     |
        | Shaq    | 86.0     |
        When I want the database to be descending
        Then The database off height should be largest to smallest

    Scenario: Sorting DB with Limits
        Given I have previously created a database:
        | name    | height   |
        | Joe     | 69.1     |
        | Sarah   | 64.2     |
        | Shaq    | 86.0     |
        When I want the database to be descending but only two values
        Then The database off height should be largest to smallest with only two values

    Scenario: Find an item in the DB with limits
        Given my DB has the following items:
        | name    | height   |
        | Joe     | 69.1     |
        | Sarah   | 64.2     |
        | Shaq    | 86.0     |
        | John    | 89.0     |
        When I search for someone over 65 inches
        Then I should see the following result:
        | name    | height   |
        | Joe     | 69.1     |
        | Shaq    | 86.0     |