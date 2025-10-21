
import * as document from "./document.tsx";
import { type route } from "@mewhhaha/ruwuter";
import * as $_index from "./routes/_index.tsx";
import * as $account from "./routes/account.tsx";
import * as $cart from "./routes/cart.tsx";
import * as $products from "./routes/products/route.tsx";
const $document = { id: "", mod: document };
const $$_index = { id: "_index", mod: $_index };
const $$account = { id: "account", mod: $account };
const $$cart = { id: "cart", mod: $cart };
const $$products = { id: "products", mod: $products };

export const routes: route[] = [[new URLPattern({ pathname: "/:__asset(.+\\.html)?" }), [$document,$$_index]],
[new URLPattern({ pathname: "/account/:__asset(.+\\.html)?" }), [$document,$$account]],
[new URLPattern({ pathname: "/cart/:__asset(.+\\.html)?" }), [$document,$$cart]],
[new URLPattern({ pathname: "/products/:__asset(.+\\.html)?" }), [$document,$$products]]];
