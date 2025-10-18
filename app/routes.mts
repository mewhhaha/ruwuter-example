
import * as document from "./document.tsx";
import { type route } from "@mewhhaha/ruwuter";
import * as $account from "./routes/account.tsx";
import * as $cart from "./routes/cart.tsx";
import * as $products from "./routes/products.tsx";
import * as $_index from "./routes/_index.tsx";
const $document = { id: "", mod: document };
const $$account = { id: "account", mod: $account };
const $$cart = { id: "cart", mod: $cart };
const $$products = { id: "products", mod: $products };
const $$_index = { id: "_index", mod: $_index };

export const routes: route[] = [[new URLPattern({ pathname: "/account/:__asset?" }), [$document,$$account]],
[new URLPattern({ pathname: "/cart/:__asset?" }), [$document,$$cart]],
[new URLPattern({ pathname: "/products/:__asset?" }), [$document,$$products]],
[new URLPattern({ pathname: "/:__asset?" }), [$document,$$_index]]];
