# Final Project Report

1. Requirements Specification (10 pts): Prepare a requirements specification for the “Web VPython” user stories you implemented. Represent the functional requirements (user-facing requirements, not unit tests) as Gherkin scenarios.
```
Scenario: Monaco Editor is initialized correctly.
    Given the user has a previous program.
    When a user clicks on edit or view their program.
    Then the editor page will display with the Monaco Editor.

Scenario: Save a program from the Monaco Editor.
    Given the user has made changes.
    When a user types in the editor.
    Then the editor will save by sending the program data to the server.

Scenario: Load a program into the Monaco Editor.
    Given the user has a previous program.
    When a user clicks on edit or view their program.
    Then the previous program data will load into the Monaco editor.
```
2. System Overview (10 pts): This section should describe the implementation of the parts of the program that satisfy the requirements from section one.

- A system object model diagram describing how the various implemented functions or components relate to one another.

![Object Class Diagram - Monaco Editor](https://www.planttext.com/api/plantuml/png/TLD1JiCm4Bpx5NiiAka38eHQGIcLA5G4YRE9jv5f4bVskY0g_exZEAbJsbjsF3ix7c-cXhWcMvMCaQGIKrYfckSAvaAIql3oyOavEL1W2VUI5vfNZEKbDoOmM-BoVWu71f00-Zg5ZQrpaghseE5x741Z3-dHLGfx9OL7AgytQGKckKPEs1D-kwbPqtSSPxLCmP2MTU7h0ccjLMCpKrRdE3WqI1bniYP2np1RBtUMHf7ITJ0SLw8hOykkrGriJ0QztkQo5lZz-BPw2ZwhAAmKMcztBbKlupGUP8cc4OgEUh5dLxadi8uIv4h51VuNsl5yomkyfFEgB0M9CIoGtfNUjezmZfsXTb73mG77soHsbzm6eHHcPcjWu_Oa38w8DubGNtNIKpEiXJd3QmLFTYbr-KcIl9G_65QHiJY5KtLtcQDuJ1pw7PfWfnlSahiD2zSZvP5BP1zIb4IKv6b7PxhhMSYzSnWri11vJ-oTD5-j5SzWREfkudxRFm00)

- A use case model describing the relationship between the implemented requirements and the actors using the implemented functions

![Use Case Diagram - Monaco Editor](https://www.planttext.com/api/plantuml/png/NP112i8m44NtSug_j8lc045AeOeRfQ9uWD0EDLWJI59TY7UtQQEecyndydWpJEc3Sc6uzaJ-eWsSzKmKTEWPEsjKOx5kTR0EEKwUKQdnMMdLENKbSjm4PReFcz070Oi3gpQBOMjJYBzJEAeRP_Gaadjdewc-6tOI93S3-o29feeyBzwURt3kpxQvG8WYQILgW-eyRiKqZyPIY8HBn8v7ilq0qvn_W4esxNYT5m00)

- Either a sequence diagram, a flowchart, or a state model for each action you implemented that describes the implementation of each of these actions.
   - Initialization

![Initialization Sequence Diagram](https://www.planttext.com/api/plantuml/png/RP0v3W8n34Lxdy8Nc0jCWK0i0ecXOEkZYK4M8HQ9Ho1EJw9149R6XV-p_Vs7KKtGxkm0bDLHZGlFoiRntIYBnmetTEd8juGJDiTWpW2cLGcuYnG0SiMg6gGvIxVvjbdME7RSdY9EBIicSCzq1NZfcE2rT4gnnb4yuI4XZNZJ2ixOKGJerSojn58ZjdDFEFxIRxXmi25luzVMObTfuH_wuRMNyZCIYdW8-nP02UI174dzL74fnf856AOpAUO7)

   - Saving

![Saving Sequence Diagram](https://www.planttext.com/api/plantuml/png/RP51RWCX34NtFeKlC1TWKIMQj6gaJ1HrsWCWSASe1AjWeggdBuHHCqcxOV7_u_DjLabqb7po0EB4ay9HdrsOiCEHFZC5GxXnUehw1A2DSCItH16WdjXr3xWDbhwUNuUTmjuxSqpuQ9q0_EfOe1VEGadXEXtnlMGC7BHXV7AU4a1pAxTdImFRx6Su_QMlyEBbaO9DTwcBh6M5_z2RhisgGt1KvH4dJdltJTWaW2LGBzHLgDd57MjBzhgUsxJ-GuUfzEbBj_kW0fVTrwZrONl8WgR1S56RJ_42L2MXy2m0hCfGvHD_0000)

   - Loading

![Loading Sequence Diagram](https://www.planttext.com/api/plantuml/png/RP51RW8n34NtFeKlC1V8eW81RP4OL36b-sZY8eiGgt7ILfoUX47jJEacY_oNx--VcIORKpvvWCJ9ay6DMCVXW0rsz94fz8HBjeTeJm2sJn9nhnG1webDyu3huEZx-RNT65nuxe-AAyS92_Z6z0NmesE1Tv8JgS6v7l6z8Aq4smi-iYS56DJARSLHAoxx6wptz2yyIj1HSFh7TUGrZl0VEiawI7KPYQOCuSJMyvbmk08O0_L1H_6J2Zf_MJzHmavoBEqjodWOf6jVKzjQjqxGEzlQjBaDlVBa06ObVVcs2m00)

- Describe the impact these solutions may have on global, economic, environmental, or societal contexts.
   - Initialization
       - The impact that initialization of the Monaco Editor would be an impact on societal context. When people work on a program, for example lets say a physics program, and they work on this project for a long time it saves them time when the editor is a good editor. If you shave a seconds off their time by using, for example intellisense, it can allow the programmer to save time to use else where, whether it be doing research, being a physicist, or even spending time with family. Thus, this helps the overall societal health of the user.
   - Saving
       - The impact that saving has on the user with societal context is huge. If someone wrote a long winded program and that program doesn't save, then that programmer would of wasted his time and get frustrated. This waste of time and waste of anger is a negative impact to society overall. As this time could of been used elsewhere and the emotional drain could effect others around him/her, bringing down the overall mood.
   - Loading
       - The impact that the loading has is tied right in with the saving solution, thus also being a societal context. As the programmer will feel very agitated which this emotional response can impact the people around the programmer which overall creates a cynical cycle of depression and bad moods until the next day.
    
3. Issues, Bugs, and Tests (20 pts): Identify at least one or two “bugs” or “features”. Post a corresponding issue to your repo (called “issues” on Github). For each bug/feature, write a test that triggers the bug and fails when the bug occurs. Then document how you fixed the bug (what changes did you make? Why did you choose to fix the bug this way?) Make sure your test now passes.
- The test now passes, 'yarn test' can be used to see for yourself.
