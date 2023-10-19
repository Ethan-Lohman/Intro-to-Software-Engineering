import type { RequestEvent, RequestHandler } from './$types';

const TAX_RATE = 0.10;  // 10%

export const GET: RequestHandler = async (reqEvent: RequestEvent) => {
    const price = parseFloat(reqEvent.url.pathname.split('/').slice(-1)[0])
    const tax = price * TAX_RATE

    return new Response(JSON.stringify({tax}))
}

