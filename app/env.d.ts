/// <reference types="vite/client" />
import "@mewhhaha/ruwuter";

declare module "@mewhhaha/ruwuter" {
  export interface Env extends Cloudflare.Env {}
}
