import { routes } from "../app/routes.mts";
import { Router } from "@mewhhaha/ruwuter";
import type { Env } from "@mewhhaha/ruwuter";

const router = Router(routes);

const handler: ExportedHandler<Env> = {
  fetch: router.handle,
};

export default handler;
