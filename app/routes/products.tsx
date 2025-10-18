import { Suspense, ref, on } from "@mewhhaha/ruwuter/components";
import { query } from "../utils/query";
import clsx from "clsx";
import type { Route as t } from "../../.router/types/app/routes/+types.products";

// Exported handler; routes generator will annotate with an href for on-demand loading
// and the client runtime will bind `this` to the provided `bind={{ count }}` object.
// Update the displayed count after incrementing and reflect it in the UI.
export const click = on(function click(this: any, ev: Event) {
  if (this && typeof this.count?.set === "function") {
    this.count.set((v: number) => (typeof v === "number" ? v + 1 : 1));
    const el = ev.currentTarget as HTMLElement | null;
    const span = el?.querySelector(".tabular-nums");
    if (span) span.textContent = String(this.count.get());
  }
});

export const loader = ({ context: [env] }: t.LoaderArgs) => {
  const apiUrl = env.FAKE_STORE_API_URL || "https://fakestoreapi.com";

  // Start fetching product list immediately
  const productsPromise = query(`${apiUrl}/products?limit=6`);

  return {
    productsPromise,
    apiUrl,
  };
};

export default function Route({
  loaderData: { productsPromise, apiUrl },
}: t.ComponentProps) {
  // Simple client interaction test: a counter button using Ruwuter client refs
  const clickCount = ref(4);

  return (
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header class="border-b border-slate-200 bg-white shadow-lg">
        <div
          class={`
            mx-auto max-w-7xl px-4
            sm:px-6
            lg:px-8
          `}
        >
          <div class="flex h-16 items-center justify-between">
            <div class="flex items-center">
              <h1
                class={`
                  bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text
                  text-2xl font-bold text-transparent
                `}
              >
                ModernStore
              </h1>
            </div>
            <nav
              class={`
                hidden space-x-8
                md:flex
              `}
            >
              <a
                href="/products"
                class={`
                  font-medium text-slate-700 transition-colors
                  hover:text-blue-600
                `}
              >
                Products
              </a>
              <a
                href="/cart"
                class={`
                  font-medium text-slate-700 transition-colors
                  hover:text-blue-600
                `}
              >
                Cart
              </a>
              <a
                href="/account"
                class={`
                  font-medium text-slate-700 transition-colors
                  hover:text-blue-600
                `}
              >
                Account
              </a>
            </nav>
            <div class="flex items-center space-x-4">
              <button
                class={`
                  p-2 text-slate-600 transition-colors
                  hover:text-blue-600
                `}
              >
                <svg
                  class="size-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <button
                class={`
                  relative p-2 text-slate-600 transition-colors
                  hover:text-blue-600
                `}
              >
                <svg
                  class="size-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h8a2 2 0 002-2v-8"
                  />
                </svg>
                <span
                  class={`
                    absolute -top-1 -right-1 flex size-5 items-center
                    justify-center rounded-full bg-red-500 text-xs text-white
                  `}
                >
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main
        class={`
          mx-auto max-w-7xl px-4 py-8
          sm:px-6
          lg:px-8
        `}
      >
        {/* Simple interactions demo using @mewhhaha/ruwuter/components */}
        <div class="mb-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-semibold text-slate-800">
              Interactions Test
            </h3>
            <button
              bind={{ count: clickCount }}
              on={click}
              class={clsx(
                "rounded-lg",
                "bg-blue-600",
                ["px-3", "py-1.5"],
                "text-sm font-medium text-white",
                "transition-colors",
                { "hover:bg-blue-700": true },
              )}
            >
              Clicked{" "}
              <span class="tabular-nums">{clickCount.get()}</span>
            </button>
          </div>
        </div>

        <section class="mb-12">
          <div class="mb-8 text-center">
            <h2 class="mb-4 text-3xl font-bold text-slate-900">
              Featured Products
            </h2>
            <p class="text-lg text-slate-600">
              Discover our handpicked selection of premium items
            </p>
          </div>

          <Suspense
            fallback={
              <div
                class={`
                  grid grid-cols-1 gap-6
                  md:grid-cols-2
                  lg:grid-cols-3
                `}
              >
                {[1, 2, 3, 4, 5, 6].map(() => (
                  <div
                    class={`
                      animate-pulse overflow-hidden rounded-xl bg-white
                      shadow-md
                    `}
                  >
                    <div class="h-64 bg-slate-200"></div>
                    <div class="p-6">
                      <div class="mb-2 h-4 rounded-sm bg-slate-200"></div>
                      <div class="mb-4 h-4 w-2/3 rounded-sm bg-slate-200"></div>
                      <div class="h-10 rounded-sm bg-slate-200"></div>
                    </div>
                  </div>
                ))}
              </div>
            }
          >
            {async () => {
              // Await the products list
              const response = await productsPromise;
              const products = (await response.json()) as Array<{
                id: number;
                title: string;
                price: number;
                description: string;
                category: string;
                image: string;
                rating: { rate: number; count: number };
              }>;

              // Start fetching individual product details in parallel
              const productDetailsPromises = products.map((product) =>
                query(`${apiUrl}/products/${product.id}`),
              );

              return (
                <div
                  class={`
                    grid grid-cols-1 gap-6
                    md:grid-cols-2
                    lg:grid-cols-3
                  `}
                >
                  {products.map((_, index) => {
                    const productPromise = productDetailsPromises[index];

                    return (
                      <Suspense
                        fallback={
                          <div
                            class={`
                              animate-pulse overflow-hidden rounded-xl bg-white
                              shadow-md
                            `}
                          >
                            <div class="h-64 bg-slate-200"></div>
                            <div class="p-6">
                              <div class="mb-2 flex items-center justify-between">
                                <div class="h-6 w-20 rounded-full bg-slate-200"></div>
                                <div class="h-4 w-16 rounded-sm bg-slate-200"></div>
                              </div>
                              <div class="mb-2 h-5 rounded-sm bg-slate-200"></div>
                              <div class="mb-2 h-4 w-3/4 rounded-sm bg-slate-200"></div>
                              <div class="mb-4 h-4 w-1/2 rounded-sm bg-slate-200"></div>
                              <div class="flex items-center justify-between">
                                <div class="h-8 w-20 rounded-sm bg-slate-200"></div>
                                <div class="h-10 w-32 rounded-sm bg-slate-200"></div>
                              </div>
                            </div>
                          </div>
                        }
                      >
                        {async () => {
                          const response = await productPromise;
                          const product = (await response.json()) as {
                            id: number;
                            title: string;
                            price: number;
                            description: string;
                            category: string;
                            image: string;
                            rating: { rate: number; count: number };
                          };

                          return (
                            <div
                              class={`
                                group overflow-hidden rounded-xl bg-white shadow-md
                                transition-all duration-300
                                hover:shadow-xl
                              `}
                            >
                              <div class="relative h-64 overflow-hidden">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  class={`
                                    size-full object-contain p-4 transition-transform
                                    duration-300
                                    group-hover:scale-105
                                  `}
                                />
                                <div
                                  class={`
                                    absolute top-3 right-3 rounded-full bg-white p-2
                                    opacity-0 shadow-md transition-opacity
                                    group-hover:opacity-100
                                  `}
                                >
                                  <svg
                                    class="size-5 text-slate-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <div class="p-6">
                                <div class="mb-2 flex items-center justify-between">
                                  <span
                                    class={`
                                      rounded-full bg-blue-50 px-2 py-1 text-sm
                                      font-medium text-blue-600
                                    `}
                                  >
                                    {product.category}
                                  </span>
                                  <div
                                    class={`flex items-center text-sm text-slate-500`}
                                  >
                                    <svg
                                      class="mr-1 size-4 text-yellow-400"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    {product.rating.rate} (
                                    {product.rating.count})
                                  </div>
                                </div>
                                <h3
                                  class={`
                                    mb-2 line-clamp-2 text-lg font-semibold
                                    text-slate-900
                                  `}
                                >
                                  {product.title}
                                </h3>
                                <p class="mb-4 line-clamp-2 text-sm text-slate-600">
                                  {product.description}
                                </p>
                                <div class="flex items-center justify-between">
                                  <span class="text-2xl font-bold text-slate-900">
                                    ${product.price}
                                  </span>
                                  <button
                                    class={`
                                      flex items-center space-x-2 rounded-lg
                                      bg-blue-600 px-4 py-2 font-medium text-white
                                      transition-colors
                                      hover:bg-blue-700
                                    `}
                                  >
                                    <svg
                                      class="size-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h8a2 2 0 002-2v-8"
                                      />
                                    </svg>
                                    <span>Add to Cart</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        }}
                      </Suspense>
                    );
                  })}
                </div>
              );
            }}
          </Suspense>
        </section>

        <section class="mb-12">
          <div class="mb-8 text-center">
            <h2 class="mb-4 text-3xl font-bold text-slate-900">
              Customer Reviews
            </h2>
            <p class="text-lg text-slate-600">What our customers are saying</p>
          </div>

          <Suspense
            fallback={
              <div
                class={`
                  grid grid-cols-1 gap-6
                  md:grid-cols-2
                `}
              >
                {[1, 2].map(() => (
                  <div class="animate-pulse rounded-xl bg-white p-6 shadow-md">
                    <div class="mb-4 flex items-center">
                      <div class="mr-4 size-12 rounded-full bg-slate-200"></div>
                      <div>
                        <div class="mb-2 h-4 w-24 rounded-sm bg-slate-200"></div>
                        <div class="h-3 w-16 rounded-sm bg-slate-200"></div>
                      </div>
                    </div>
                    <div class="mb-2 h-4 rounded-sm bg-slate-200"></div>
                    <div class="h-4 w-3/4 rounded-sm bg-slate-200"></div>
                  </div>
                ))}
              </div>
            }
          >
            {async () => {
              const reviews = [
                {
                  id: 1,
                  name: "Sarah Johnson",
                  email: "sarah.johnson@example.com",
                  body: "Amazing quality products! Fast shipping and excellent customer service. I've been shopping here for over a year and never been disappointed.",
                  avatar:
                    "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
                },
                {
                  id: 2,
                  name: "Michael Chen",
                  email: "m.chen@example.com",
                  body: "The product selection is fantastic and the prices are very competitive. The website is easy to navigate and checkout process is smooth.",
                  avatar:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                },
              ];

              return (
                <div
                  class={`
                    grid grid-cols-1 gap-6
                    md:grid-cols-2
                  `}
                >
                  {reviews.map((review) => (
                    <div
                      class={`
                        rounded-xl bg-white p-6 shadow-md transition-shadow
                        hover:shadow-lg
                      `}
                    >
                      <div class="mb-4 flex items-center">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          class="mr-4 size-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 class="font-semibold text-slate-900">
                            {review.name}
                          </h4>
                          <div class="flex text-yellow-400">
                            {[1, 2, 3, 4, 5].map(() => (
                              <svg
                                class="size-4 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p class="leading-relaxed text-slate-600">
                        {review.body}
                      </p>
                    </div>
                  ))}
                </div>
              );
            }}
          </Suspense>
        </section>

        <section
          class={`
            rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8
            text-white
          `}
        >
          <div class="text-center">
            <h2 class="mb-4 text-3xl font-bold">Why Choose ModernStore?</h2>
            <p class="mb-8 text-lg text-blue-100">
              Experience the future of online shopping
            </p>
          </div>

          <div
            class={`
              grid grid-cols-1 gap-8
              md:grid-cols-3
            `}
          >
            <div class="text-center">
              <div
                class={`
                  mx-auto mb-4 flex size-16 items-center justify-center
                  rounded-full bg-white/20
                `}
              >
                <svg
                  class="size-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 class="mb-2 text-xl font-semibold">
                Lightning Fast Delivery
              </h3>
              <p class="text-blue-100">
                Get your orders delivered within 24 hours with our express
                shipping service.
              </p>
            </div>

            <div class="text-center">
              <div
                class={`
                  mx-auto mb-4 flex size-16 items-center justify-center
                  rounded-full bg-white/20
                `}
              >
                <svg
                  class="size-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 class="mb-2 text-xl font-semibold">Premium Quality</h3>
              <p class="text-blue-100">
                Every product is carefully curated and tested to ensure the
                highest quality standards.
              </p>
            </div>

            <div class="text-center">
              <div
                class={`
                  mx-auto mb-4 flex size-16 items-center justify-center
                  rounded-full bg-white/20
                `}
              >
                <svg
                  class="size-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 class="mb-2 text-xl font-semibold">24/7 Support</h3>
              <p class="text-blue-100">
                Our dedicated customer service team is always ready to help you
                with any questions.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer class="mt-16 bg-slate-900 text-white">
        <div
          class={`
            mx-auto max-w-7xl px-4 py-12
            sm:px-6
            lg:px-8
          `}
        >
          <div
            class={`
              grid grid-cols-1 gap-8
              md:grid-cols-4
            `}
          >
            <div>
              <h3 class="mb-4 text-xl font-bold">ModernStore</h3>
              <p class="text-slate-400">
                Your premier destination for quality products and exceptional
                service.
              </p>
            </div>
            <div>
              <h4 class="mb-4 font-semibold">Quick Links</h4>
              <ul class="space-y-2 text-slate-400">
                <li>
                  <a
                    href="/products"
                    class={`
                      transition-colors
                      hover:text-white
                    `}
                  >
                    All Products
                  </a>
                </li>
                <li>
                  <a
                    href="/categories"
                    class={`
                      transition-colors
                      hover:text-white
                    `}
                  >
                    Categories
                  </a>
                </li>
                <li>
                  <a
                    href="/deals"
                    class={`
                      transition-colors
                      hover:text-white
                    `}
                  >
                    Special Deals
                  </a>
                </li>
                <li>
                  <a
                    href="/new"
                    class={`
                      transition-colors
                      hover:text-white
                    `}
                  >
                    New Arrivals
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="mb-4 font-semibold">Customer Care</h4>
              <ul class="space-y-2 text-slate-400">
                <li>
                  <a
                    href="/contact"
                    class={`
                      transition-colors
                      hover:text-white
                    `}
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="/shipping"
                    class={`
                      transition-colors
                      hover:text-white
                    `}
                  >
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a
                    href="/returns"
                    class={`
                      transition-colors
                      hover:text-white
                    `}
                  >
                    Returns
                  </a>
                </li>
                <li>
                  <a
                    href="/faq"
                    class={`
                      transition-colors
                      hover:text-white
                    `}
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="mb-4 font-semibold">Follow Us</h4>
              <div class="flex space-x-4">
                <a
                  href="#"
                  class={`
                    text-slate-400 transition-colors
                    hover:text-white
                  `}
                >
                  <svg class="size-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  class={`
                    text-slate-400 transition-colors
                    hover:text-white
                  `}
                >
                  <svg class="size-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
                <a
                  href="#"
                  class={`
                    text-slate-400 transition-colors
                    hover:text-white
                  `}
                >
                  <svg class="size-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.751-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div
            class={`
              mt-8 border-t border-slate-800 pt-8 text-center text-slate-400
            `}
          >
            <p>&copy; 2024 ModernStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
