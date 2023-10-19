# SWEN-200 Project 02

Project 2 is about test driven development

Score: 

    40% implementation
    40% tests & test coverage
    20% style, cleanliness

The main resource we'll be using is ts-jest:

https://kulshekhar.github.io/ts-jest/

The principle concept of TDD is to write the tests *before* you
implement the code to be tested.

For this project start with the solution you created for last week's
project (project 01). The idea is to add some features to this
class to make it more useful.

Suppose we wanted to add a feature to permit deleting specific entries
from the database for which a boolean function (predicate) returns "true".
The idea of TDD is to think first about how you could *test*
your implementation of SimpleDB to validate that your new
method actually works. One thing that comes immediately to
mind is that if you pass in a function that always returns
true, it should clear the entire datbase:

    test('When passing a predicate that's always true, the db should be cleared',
        () => {
            loadSampleData(db)
            db.deleteItems(()=>true)
            expect(db.length).toEqual(0);
        });

Of course, you can do this **before** you write the code that
implements the add method. That's what TDD is all about!
When I try to run the tests I get:

        $ yarn jest --coverage
        $ /Users/steve/Development/courses/swen/sw200/2021/projects/proj-02-211/node_modules/.bin/jest --coverage
        FAIL  src/simple.spec.ts
        ● Test suite failed to run

            src/simple.spec.ts:127:8 - error TS2339: Property 'deleteItems' does not exist on type 'SimpleDB<DumbItem>'.

            127     db.deleteItems(() => true)
                    ~~~~~~~~~~~

Yup. I haven't written it yet! So I write the function and then it should pass.

1. Identify a feature you wish to implement.
2. Write a test that can be used to validate the feature.
3. Run the test, and see that it (correctly) fails.
4. Implement the feature.
5. Run the test again, and see the it (correctly) succeeds.

Repeat until you've implemented all the features.

Also, keep adding tests until you have 100% coverage.

Between cycles, check for possible refactoring changes that might improve your code.

## features

1. Delete selected items based on a boolean predicate function, like filter

    `deleteItems( predicate: (item: T) => boolean): void`

2. Update selected items with a data from an object with a predicate

    `updateItems( predicate: (item: T) => boolean, fromObject: Partial<T> ): void`

    Note that `Partial<T>` is a utility type that means some of the attributes of `T` are present, but not neccesarily all of them.

2. Retrieve a string representation of all the data (hint: `JSON.stringify`)

    `getStringRep( ): string`

3. Upload a string representation of new data to import (hint: `JSON.parse`)

    `setStringRep( input: string ): void`

## Software Required

You can use the same software from "project 01".

## Code requirements

You'll find the source code in the `src` directory.

Use TDD. Create a test. Run the test, see that it fails, then write the code to implement the tested feature.

You can either run the tests from the command line:

    yarn test
    
Or use the test runner in VSCode.

Once you've satisfied yourself that the code works, you can commit it to
GitHub using:

    git commit -m "it works" -a
    
    git push
    
Or you can use the IDE Git features.
