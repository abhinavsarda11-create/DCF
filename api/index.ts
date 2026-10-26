import type { IncomingMessage, ServerResponse } from 'http';
import { buildApp } from '../app.ts';

let appPromise: ReturnType<typeof buildApp> | null = null;

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  appPromise ||= buildApp();
  const app = await appPromise;
  return (app as any)(req, res);
}
