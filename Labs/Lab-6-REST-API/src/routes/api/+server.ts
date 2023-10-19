import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = async (reqEvent: RequestEvent) => {
    console.log("in GET:", reqEvent.url);
    return new Response(JSON.stringify({a:"a test JSON object"}));
}

