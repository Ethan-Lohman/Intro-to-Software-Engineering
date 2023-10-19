# SWEN-200 Exam 1 Fall 2023

The exam questions are below. You may edit the code in place. Insert explanations and answers right here in the README.md file.

1. Find the StoreManager, ShelfManager, and InventoryManager classes defined in the InventoryClasses.ts file in the src directory. These classes are intended to manage inventory that lives in multiple stores, where each store has a collection of shelves in specific locations, and each shelf has a known inventory of items.

   1. Review the methods and properties of InventoryClasses. What are the primary responsibilities of the StoreManager, ShelfManager, and InventoryManager classes respectively?
      Answer: 
         - StoreManager's responsibility is to give the functions that other classes can call, for example others can call the store's managers function count(), which will give the size of the simpleDB list.

         - ShelfManager's responsibility is to create shelves inside certain stores, so inventory can be appointed to each shelf. In all it makes the shelves that are needed.

         - InventoryManager's responibility is to create items, add them to a shelf (which also adds them to a certain store.), and it can also get the total value of said shelf.

   2. Suppose you were tasked with adding a method to the InventoryManager class called "removeItemFromShelf".
      1. Describe a plan to implement this method.
         - I would first recieve the itemID as a string, then I would use the already made rm() function for the inventory list like this: super.rm(itemID).

      2. If you have time, implement it.
         - Answer: I did implement it.

   3. Describe how you would add a test to InventoryManager.test.ts to test this new method. If you have time, implement this test.
      - Answer: I would make a store and a shelf, then I would make three items to be inventoried. Then, I would call the remove function on one of the items. Then expect the total items amount to be two.

      - Answer: Also, I implemented the test in InventoryManager.test.ts.

2. Check the coverage of the tests that are already implmented: `yarn test`. Write at least two tests that improve test coverage for the InventoryClasses.ts file. Add at least one test to the InventoryManager.test.ts file, and at least one feature to inventory.feature and a corresponding test case to the inventory.steps.ts file.
   - Answer: I made a test for lines 90, and 110 which is in the InventoryManager.test.ts. Then I also made a feature, that is in inventory.steps.ts and inventory.feature. This covers for line 63-65. I also made a second feature, that covers for line 67-69.

3. There is a broken test in inventory.steps.ts in the steps directory. Identify the problem and fix the test.
   - Answer: The problem with the test was that it wasn't taking into the fact that it needs to multiply by the quanity of each item, which didn't give the full value of the current inventory.

4. Create one class diagram and one activity diagram for some aspect of the classes or methods defined already, or added by you during the exam. Save the text definition of your diagram in this readme file. If you use plantText, Save the images of these diagrams (png files) in the docs directory.
   - Answer: I used plantUML, so they are in the docs folder. The class diagram is of InventoryManager, and the activity diagram is of the finding of the StoreID.
