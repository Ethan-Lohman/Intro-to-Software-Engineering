# Exam 2 (Final Exam)

See [FinalExam.pdf](FinalExam.pdf)

Edit the files in this repository to complete these three questions. For question 2 and 3 you can simply include you answers in this README.md file. For question 1, actually perform the merge. Leave the resulting code on checked in on the main branch.

## 1. GitHub/Testing (50 pts)

You should find two branches here:

- substring name search
- description search

Merge these two branches into the main branch and edit/add tests to confirm both features still work. To actually perform the merge you'll need to use the git command line with the switch: '--allow-unrelated-histories', e.g.:

    git merge no_past_events --allow-unrelated-histories

## 2. Ethics Case Study (25 pts)

Read the case study and describe how it relates to one of the domains of the ethical principles. Also, share what you feel would be the ethical response to the situation.

- The most important code of ethic to consider in this situation would have to be client and employer. I say this because with the contract part it can cost the company millions if the product is not released on time. The public will incounter some bugs, but the major bugs can be patched afterwards. But the money lost by the employer along with it's reputation is much harder to repair. Then, it is also unethical against the client as they are expecting this software, and delaying it may upset their operations as they might of been relying on using the quality control software. So the ethical thing to do in this situation is to tell the boss that it will be able to be shipped out, but there will have to be a bug patch release shortly after. 

## 3. Design Alternatives (25 pts)

Read the design options and write a paragraph or two on making a case for a specific option, or outlining steps that could be taken to choose one option over the other.

Assumptions: There is a million programs, downloading a program takes 16 KB, the letter e brings up 100,000 programs.

- The best design alternative would have to be design alternative two. With design alternative one, if the user tried to just search for programs with the letter, 'e', then they would get hundreds of thousands of programs on their memory. This would in turn bloat their memory up along with the internet usage of downloading it all onto the memory. This can affect the user on a economic level as they could be using a limited internet plan. For example, if the letter, 'e', has 100,000 programs that pop up, and the average program takes 16 kilobytes to download to memory, that would be about 1.5 gigabytes. When I had limited internet the average plan was about 10 gigabytes a month, so this downloading onto memory would absolutely kill the internet plan, along with the possibility of the system freezing because the RAM was filled up.

- The advantage of design alternative two is that the user will be able to download only what they will generally see. This allows the internet usage to be low and RAM usage to be low. The only disadvantage would be the slight loading when the user is at the end of a batch of programs, which wouldn't happen if you downloaded all the programs at once. This would impact the user experience, but not as much as design alternative one would impact economical needs and the applications performance. In all, the better choice is design alternative two.
