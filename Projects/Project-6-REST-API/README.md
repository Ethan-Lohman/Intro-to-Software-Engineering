# Individual Coding Project 6

We'll be learning more about REST APIs:

* [Intro to REST APIs](https://www.geeksforgeeks.org/rest-api-introduction/)
* [SvelteKit API Endpoints (+server.ts)](https://kit.svelte.dev/docs/routing#server)
* [HTTP Error codes](https://restfulapi.net/http-status-codes/)
* [Li Hau, Endpoints (note: changes to SvelteKit since this video)](https://youtu.be/FSCUj7DgfUE)
* [Li Hau, Examples (note: changes to SvelteKit since this video)](https://youtu.be/rHckl5bZtpE)

# Requirements

Create your own API using a custom data type (not string!) and connect it to a simple front end that exercises the API.

Implement `PUT` and `DELETE` using the mock database client.

You can use a REST API chrome extenstion (e.g., boomerang, ARC, etc) or e.g., Postman to test your endpoints outside of the SvelteKit application. You can also use the command line utility `curl`:

```
curl -d '{"baz":"bap"}' -H 'Content-Type: application/json' -X POST http://localhost:5173/api
```

Points will be distributed as follows:

- 20% Implement REST API: GET to retrieve a collection with your data type
- 20% Implement REST API: POST to create new items with your data type
- 20% Implement REST API: PUT to update an existing item
- 20% Implment REST API: DELETE to remove an existing item
- 10% Uses correct Typescript typing
- 10% Uses consistent and clean style

To run the web server:

    npm run dev
  