# SWEN-200 Project 04

Project 4 is about documenting and enumerating application object
architecture in the form of diagrams and a classification
system knows as [Design Patterns](https://en.wikipedia.org/wiki/Design_Patterns).
There is also a nice "explainer" site here: [Refactoring Guru](https://refactoring.guru)
These are somewhat ancient lore at this point, but they are still
used in many places so you should be aware of them.

Your project will be evaluated in three ways:

1. The quality and clarity of the descriptive documentation. (2pts)
2. The style of the code itself. (2pts)
3. The correct function of the code iteself. (6 pts)

For documentation please create a document in the
root directory of the project called `classes.md`.
In this document provide

1. A class diagram for SingleDB (be sure to include inheritance!) and DBObserver.
2. A sequence diagram for a SingleDB observer in action.

For code, please complete the implementation of the SingleDB class
and the "steps" files to implement the tests of the SingleDB class
interacting with an observer. You are provided a working SimpleDB, a
working DBObserver class, and a set of feature files to describe the
tests needed. Don't worry about coverage for index.ts and simpledb.ts.

## Diagrams

For diagrams the main tool we'll be using is:

https://www.planttext.com

and

https://plantuml.com

These are free/easy Unified Modeling Language (UML) diagram generators.
UML is a conventional collection of diagrams that we can use
to communication the intention of a software design.

We'll be learning about

1. Class Diagrams
2. Activity Diagrams
3. Sequence Diagrams
4. Use Case Diagrams

## Design Patterns

We'll also be learning about a concpet called
[Design Patterns](http://wiki.c2.com/?DesignPatternsBook). We will
focus on only a few design patterns including:

1. Creational Patterns

   - Factory
   - Singleton

2. Structural Patterns

   - Adaptor
   - Decorator

3. Behavioral Patterns
   - Chain of Responsibility
   - Observer Pattern

There are _many_ other patterns we will _not_ learn right now
but you can read about them in many places, including a great
free [book](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)
by Addy Osmani. The bad news is that this book is a bit outdated
so it doesn't use the Typescript. Happily the folks at
[refactoring.guru](https://refactoring.guru/design-patterns/typescript)
have translated the patterns to typescript with lots of
great commentary.

One comment about patterns: These were originally developed to
solve problems that occurred in the c++ programming language.
Typescript and python don't suffer from all the problems c++ has so
not all the patterns are really _necessary_ in these languages.
The primary value is _not_ that we want to incorporate these exact
classes in our designs, but that the concepts are useful in
many different situations and the value of _knowing_ these patterns
enables us to _communicate_ the intent of a solution clearly
and efficiently.

## SOLID

One easy way to remember design principles is with a handy
acronym. S.O.L.I.D. is just such a handy acronym. ;-) It is
generally attributed to [Bob Martin](https://en.wikipedia.org/wiki/SOLID) who
is a zealot for clean code and clean design.

It stands for:

    S. Single responsibility. We've learned this about functions,
        but it's a more general concept. Reduce the number
        of responsibities so that every element of code
        (class, function, object) has a clear scope.

    O. Open/Closed. Code should be open for extension, but
        closed to modification. As new classes and features
        are added we should not have to modify existing
        classes to accomodate those additions.

    L. Liskov Substiution Principle: Any subclass should
        be able to stand in for it's parent class.

    I. Interface segregation. Clients should not be forced
        to depend on methods they do not use.

    D. Dependecy inversion: Concrete things can depend on
        abstractions, but abstractions should not depend
        on concrete things.

We'll be visiting these all semester, but it's good to get them
on the page so we can discuss them.

## Software Required

The only package we're adding this time is `jest-cucumber` which
has already beed added to the `package.json` file in the project
repository. Just `yarn install` as usual.

## Code requirements

You'll find the source code in the `src` directory:

You can run the `index.ts` file using 

    yarn start

Edit the two functions and then test your code at any time using:

    yarn test

You can add tests by editing the `src/tests/test_calc.test.js` file.

Once you've satisfied yourself that the code works, you can commit it to
gitkeeper using:

    git commit -m "it works" -a

    git push
