/// <reference types="vite/client" />
import "@mewhhaha/ruwuter";

declare module "@mewhhaha/ruwuter" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Env extends Cloudflare.Env {}
}
