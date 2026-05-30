import { FetchState, astro } from 'astro/fetch';

export default {
  async fetch(request: Request): Promise<Response> {
    const state = new FetchState(request);
		const response = await astro(state);
		console.log(`Request: ${request.url} - State: ${state.status}`);
    return response;
  },
};
