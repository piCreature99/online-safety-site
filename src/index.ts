// import type { Fetcher } from "react-router";

export interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
  JWT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  FRONTEND_URL: string;
}

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response | undefined> {
    // console.log(">>> WORKER_ENTRY_CHECK:");
    const url = new URL(request.url);
    return await env.ASSETS.fetch(request);
  }
}