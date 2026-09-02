// Access gate for CRUX.
//
// Every note in this app is compiled INTO the JS bundle (registry.ts globs the
// markdown eagerly), so a client-side password box would be theatre — anyone
// could fetch /assets/index-*.js and read the lot. The gate therefore has to run
// on the edge, before anything is served, and it has to cover the assets too.
//
// No `config.matcher` on purpose: this runs on every request. A matcher is one
// more thing that can be subtly wrong and leave a path open.
//
// Credentials live in Vercel env vars (CRUX_USER / CRUX_PASS), never in the repo.
// To rotate:  npx vercel env rm CRUX_PASS production && npx vercel env add CRUX_PASS production

export default function middleware(request: Request): Response | undefined {
  const user = process.env.CRUX_USER
  const pass = process.env.CRUX_PASS

  // Fail closed. If the env vars go missing, serve nothing rather than everything.
  if (!user || !pass) {
    return new Response('CRUX gate is misconfigured (CRUX_USER / CRUX_PASS unset).', {
      status: 503,
      headers: { 'Cache-Control': 'no-store' },
    })
  }

  const expected = `Basic ${btoa(`${user}:${pass}`)}`

  if (request.headers.get('authorization') === expected) {
    return undefined // let the request through to the static build
  }

  return new Response('CRUX is private.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="CRUX", charset="UTF-8"',
      'Cache-Control': 'no-store',
      // Belt and braces: keep it out of search engines even if a page ever leaks.
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
