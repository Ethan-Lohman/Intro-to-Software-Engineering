# SWEN-200 Project 03

Project 3 is about documenting and enumerating requirements
in the form of "User Stories" that describe specific tasks
that users hope to perform.

The main resource we'll be using is jest-cucumber:

[jest-cucumber](https://github.com/bencompton/jest-cucumber#readme)

This package builds on the jest testing framework but adds
the concept of user stories converted to jest tests. This
is called "Behavior Driven Development", or sometimes "Acceptance Test Driven Development".

[Behavior Driven Development (BDD)](https://en.wikipedia.org/wiki/Behavior-driven_development)

[Acceptance Test Driven Development (ATTD)](https://en.wikipedia.org/wiki/Acceptance_test–driven_development)

The idea is to use "english" descriptions of the correct
_behavior_ of the software and align those descriptions with
automated tests that validate the actual behavior with code.

We'll be learning the jest-cucumber framework in the context
of a "recipe" application that users will rely on to keep
their recipes organized. There are only a few simple methods
to implement, and you can use the SimpleDB class from the first
two projects to hold the ingredients for the recipes.

The _real_ objective is to learn how to formulate user stories
and align them with specific tests that validate the
function of the story.

You'll be implementing the `Recipe` class:

        /*
        ** Class to represent a recipe
        */

        import { SimpleDB } from "./simpledb"

        class Recipe {

            constructor( ) {
                this.ingredients = new SimpleDB([]);
            }

            addIngredient(name: string, amount: number, units: string) {
                /*
                ** Add an ingredient to the Recipe.
                ** Each ingredient has a name (string),
                ** an amount (number), and units (string).
                ** e.g., ('milk', 0.5, 'cups')
                **
                ** The ingredients themselves are simple
                ** objects so:
                **  {name:'milk', amount:0.5, units:'cups'}
                **
                ** Note: names must be unique.
                **  if the user tries to add a new
                **  ingrediate that is already in
                **  the recipe, this method should
                **  throw an exception.
                */

            }

            updateIngredient(name: string,
                             newValue: Partial<RecipeItem>): void {
                /*
                ** Update an ingredient with a new information.
                 */

            }

            deleteIngredient(name: string): void {
                /*
                ** Pretty obvious. Delete the ingredient
                ** with the given name.
                **
                ** if the name doesn't exist, throw.
                */

            }

            getIngredients(): RecipeItem[] {
                /*
                ** return an Array of ingredients which
                ** should be simple objects.
                */

            }

            numberOfIngredients(): number {
                /*
                ** Return the number of ingredients in the Recipe.
                */

            }
        }

In addition you'll be writing a set of requrements that map onto tests, like this:

    Feature: Working with the recipes

        Scenario: Adding a single ingredient to a recipe
            Given I have previously created a recipe
            When I add a single ingredient to the recipe:
            | name  | amount | units |
            | milk  | 0.5    | cups  |
            Then I should see the number of ingredients increase by 1

These are written in a domain specific language called `Gherkin`. They always have a `Given`, `When`, and `Then` clause. You can also use tables to provide specific test data:

Here's an example from this project that illustrates how that works:

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

For this project you need to

1. implement the Recipe class
2. test that class using the Behavior Driven Development tool `jest-cucumber`. 
3. add to the existing feature files and steps files in the repository
4. test as much of the application as possible. Check for coverate using:

    yarn test:coverage

If you find code that's not tested, you can add either a user story in a feature file, or just a plain old unit test. Be sure to assert something 
useful in any test you write. If you find a use-case that not described, go ahead and add it in a feature file, and write steps to match. You should 
aim for a minimum of 90% coverage overall, but for full credit you should shoot for 100% coverage. Note that coverage alone is not a great metric
for testing, but it's one metric that is often used.

## Software Required

The only package we're adding this time is `jest-cucumber` which
has already beed added to the `package.json` file in the project
repository. Just `yarn install` as usual.

## Code requirements

After you check out the repository and install nodejs
you can install dependencies by using:

    yarn install

Edit the implementation, feature, step, and spec files and then test your code at any time using:

    yarn test

Once you've satisfied yourself that the code works, you can commit it to GitHub using:

    git commit -m "it works" -a

    git push
