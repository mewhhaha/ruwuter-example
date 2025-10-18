import { routes } from "../app/routes.mts";
import { Router } from "@mewhhaha/ruwuter";

const handler: ExportedHandler<import("@mewhhaha/ruwuter").Env> = {
  fetch(request, env, ctx) {
    const router = Router(routes);
    return router.handle(request, env, ctx);
  },
};

export default handler;
