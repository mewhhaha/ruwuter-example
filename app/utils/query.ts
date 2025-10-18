// Only here to not spam the example api too much, just use fetch
export async function query(url: string): Promise<Response> {
  return await fetch(url, {
    cf: {
      cacheTtlByStatus: { "200-299": 86400, 404: 1, "500-599": 0 },
      cacheEverything: true,
    },
  });
}
