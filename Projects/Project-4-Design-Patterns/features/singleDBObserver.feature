Feature: Working with an observable singleton DB

    Scenario: An observer subscribes to changes
        Given An observer subscribes to changes
        When An object is added to the db
        Then the observer should be notified.

    Scenario: An observer unsubscribes from changes
        Given An observer subscribes to changes
        And the observer unsubscribes from changes
        When An object is added to the db
        Then the observer should not be notified.

    Scenario: An observer subscribes and something is removed
        Given An observer subscribes to changes
        And some data is added to the db
        When An object is removed from the db
        Then the observer should be notified.

    Scenario: An observer subscribes and the DB is cleared
        Given An observer subscribes to changes
        And some data is added to the db
        When The DB is cleared
        Then the observer should be notified.

    Scenario: An observer subscribes and the DB is updated
        Given An observer subscribes to changes
        And some data is added to the db
        When The DB is updated
        Then the observer should be notified.
