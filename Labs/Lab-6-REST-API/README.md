# Lab 6

This week we’re going to build on what we learned last time about [Svelte](https://svelte.dev), and explore [SvelteKit](https://kit.svelte.dev)

# Requirements

We're going to build on the code from earlier projects to create a recipe application completely in SvelteKit. The main point of SvelteKit is that it include server side support as well as client side. You can use SvelteKit to deploy a full client-server application.

In this lab you'll:

1. Add a "price" field to the Recipe item
2. Add a server side function that computes the tax with a "GET" request
3. Use the observer to update the RecipeCountDisplay component to also compute and display the total cost, including tax, every time the recipe is modified.
