import { SuspenseProvider } from "@mewhhaha/ruwuter/components";
import type { Route as t } from "./+types.document";
import stylesUrl from "./assets/tailwind.css?url";
import fixiUrl from "./assets/fixi.js?url&no-inline";
import iconUrl from "./assets/favicon.ico?url";
import clientUrl from "@mewhhaha/ruwuter/client.mjs?url&no-inline";
import resolveUrl from "@mewhhaha/ruwuter/resolve.mjs?url&no-inline";

export default function Document({ children }: t.ComponentProps) {
  return (
    <html lang="en">
      <head>
        <title>wawaweewa</title>
        <meta charset="UTF-8"></meta>
        <link rel="icon" type="image/svg" href={iconUrl}></link>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, interactive-widget=resizes-content"
        ></meta>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin=""
        />
        <link rel="stylesheet" href={stylesUrl} />
        <script type="module" src={fixiUrl}></script>
        <script type="module" src={clientUrl}></script>
        <script type="module" src={resolveUrl}></script>
      </head>

      <body>
        <SuspenseProvider>{children}</SuspenseProvider>
      </body>
    </html>
  );
}
