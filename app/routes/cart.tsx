import { Suspense } from "@mewhhaha/ruwuter/components";
import { query } from "../utils/query";

export default function Route() {
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
              <a
                href="/"
                class={`
                  bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text
                  text-2xl font-bold text-transparent
                `}
              >
                ModernStore
              </a>
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
              <a href="/cart" class="font-medium text-blue-600">
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
        <div class="mb-8">
          <h1 class="mb-2 text-3xl font-bold text-slate-900">Shopping Cart</h1>
          <p class="text-slate-600">
            Review your items and proceed to checkout
          </p>
        </div>

        <div
          class={`
            grid grid-cols-1 gap-8
            lg:grid-cols-3
          `}
        >
          <div class="lg:col-span-2">
            <Suspense
              fallback={
                <div class="space-y-4">
                  {[1, 2, 3].map(() => (
                    <div class="animate-pulse rounded-xl bg-white p-6 shadow-md">
                      <div class="flex items-center space-x-4">
                        <div class="size-20 rounded-lg bg-slate-200"></div>
                        <div class="flex-1">
                          <div class="mb-2 h-4 w-3/4 rounded-sm bg-slate-200"></div>
                          <div class="mb-2 h-3 w-1/2 rounded-sm bg-slate-200"></div>
                          <div class="h-4 w-1/4 rounded-sm bg-slate-200"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              }
            >
              {async () => {
                const response = await query(
                  "https://fakestoreapi.com/products?limit=3",
                );

                const products = (await response.json()) as Array<{
                  id: number;
                  title: string;
                  price: number;
                  image: string;
                  category: string;
                }>;

                const cartItems = products.map((product, index) => ({
                  ...product,
                  quantity: index + 1,
                  size: index === 0 ? "M" : index === 1 ? "L" : "S",
                }));

                return (
                  <div class="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        class={`
                          rounded-xl bg-white p-6 shadow-md transition-shadow
                          hover:shadow-lg
                        `}
                      >
                        <div class="flex items-start space-x-4">
                          <img
                            src={item.image}
                            alt={item.title}
                            class={`
                              size-20 rounded-lg bg-slate-50 object-contain p-2
                            `}
                          />
                          <div class="min-w-0 flex-1">
                            <h3
                              class={`
                                mb-1 line-clamp-2 text-lg font-semibold
                                text-slate-900
                              `}
                            >
                              {item.title}
                            </h3>
                            <p class="mb-2 text-sm text-slate-500">
                              {item.category}
                            </p>
                            <div class="mb-4 flex items-center space-x-4">
                              <span class="text-sm text-slate-600">
                                Size: {item.size}
                              </span>
                              <span class="text-lg font-bold text-slate-900">
                                ${item.price}
                              </span>
                            </div>
                            <div class="flex items-center justify-between">
                              <div class="flex items-center space-x-3">
                                <label class="text-sm text-slate-600">
                                  Quantity:
                                </label>
                                <div
                                  class={`
                                    flex items-center rounded-lg border
                                    border-slate-300
                                  `}
                                >
                                  <button
                                    class={`
                                      p-2 transition-colors
                                      hover:bg-slate-100
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
                                        d="M20 12H4"
                                      />
                                    </svg>
                                  </button>
                                  <span
                                    class={`
                                      min-w-12 border-x border-slate-300 px-4
                                      py-2 text-center
                                    `}
                                  >
                                    {item.quantity}
                                  </span>
                                  <button
                                    class={`
                                      p-2 transition-colors
                                      hover:bg-slate-100
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
                                        d="M12 4v16m8-8H4"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              <button
                                class={`
                                  p-2 text-red-500 transition-colors
                                  hover:text-red-700
                                `}
                              >
                                <svg
                                  class="size-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }}
            </Suspense>
          </div>

          <div class="lg:col-span-1">
            <div class="sticky top-8 rounded-xl bg-white p-6 shadow-md">
              <h2 class="mb-6 text-xl font-semibold text-slate-900">
                Order Summary
              </h2>

              <div class="mb-6 space-y-4">
                <div class="flex justify-between text-slate-600">
                  <span>Subtotal (3 items)</span>
                  <span>$89.97</span>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span>$9.99</span>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>Tax</span>
                  <span>$8.00</span>
                </div>
                <div class="border-t border-slate-200 pt-4">
                  <div
                    class={`
                      flex justify-between text-lg font-semibold text-slate-900
                    `}
                  >
                    <span>Total</span>
                    <span>$107.96</span>
                  </div>
                </div>
              </div>

              <div class="space-y-3">
                <div class="flex items-center space-x-2 text-sm text-slate-600">
                  <svg
                    class="size-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Free returns within 30 days</span>
                </div>
                <div class="flex items-center space-x-2 text-sm text-slate-600">
                  <svg
                    class="size-4 text-green-500"
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
                  <span>Secure checkout</span>
                </div>
              </div>

              <button
                class={`
                  mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold
                  text-white transition-colors
                  hover:bg-blue-700
                `}
              >
                Proceed to Checkout
              </button>

              <div class="mt-4 text-center">
                <a
                  href="/products"
                  class={`
                    text-sm font-medium text-blue-600 transition-colors
                    hover:text-blue-800
                  `}
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        </div>

        <section
          class={`
            mt-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8
            text-white
          `}
        >
          <div class="text-center">
            <h2 class="mb-4 text-2xl font-bold">Need Help?</h2>
            <p class="mb-6 text-blue-100">
              Our customer service team is here to assist you
            </p>
            <div
              class={`
                flex flex-col justify-center gap-4
                sm:flex-row
              `}
            >
              <a
                href="#"
                class={`
                  rounded-lg bg-white/20 px-6 py-3 font-medium text-white
                  transition-colors
                  hover:bg-white/30
                `}
              >
                Live Chat
              </a>
              <a
                href="#"
                class={`
                  rounded-lg bg-white/20 px-6 py-3 font-medium text-white
                  transition-colors
                  hover:bg-white/30
                `}
              >
                Call Support
              </a>
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
