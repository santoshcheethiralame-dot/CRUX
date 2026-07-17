// ============================================================================
//  ORBIT HANDOFF (responder side)
//
//  Lets Orbit pull study items without the export→download→import file dance.
//  Orbit opens this app in a popup at  ?handoff=orbit&origin=<orbit-origin> .
//  We read our own (first-party) localStorage, build the payload, and hand it
//  straight back to the Orbit window via postMessage. No file, no server.
//
//  A popup (not a hidden iframe) on purpose: a popup is a top-level, first-party
//  context, so it reads the user's real CRUX progress. A third-party iframe's
//  localStorage gets partitioned/blocked by modern browsers and would read
//  empty. The cost is a popup, which is fine because Orbit opens it from a click.
//
//  SECURITY — two-sided:
//   • We only postMessage to an origin on ORBIT_ORIGINS (below), so a page that
//     opens us with ?origin=evil.com gets nothing.
//   • Orbit, for its part, only accepts a message whose e.origin is this app.
// ============================================================================
import { buildOrbitPayload } from './orbitExport'

// Where Orbit is allowed to live. Add a custom domain here if Orbit moves.
const ORBIT_ORIGINS = [
  'https://orbitv2-five.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174',
]

/**
 * If this load is an Orbit handoff, service it and return true (the caller
 * should then NOT mount the normal app). Otherwise return false.
 */
export function handleOrbitHandoff(): boolean {
  const params = new URLSearchParams(window.location.search)
  if (params.get('handoff') !== 'orbit') return false

  const target = params.get('origin') || ''
  const opener = window.opener as Window | null
  const render = (html: string) => {
    document.body.innerHTML =
      `<div style="min-height:100vh;display:grid;place-items:center;background:#0a0a0a;color:#f7f5ef;font-family:Inter,system-ui,sans-serif;text-align:center;padding:24px">${html}</div>`
  }

  if (!opener || !ORBIT_ORIGINS.includes(target)) {
    render(
      `<div><div style="font-size:32px;margin-bottom:12px">⛔</div>
       <div style="font-weight:700;font-size:18px;margin-bottom:6px">Can't complete the handoff</div>
       <div style="color:#9a9aa2;max-width:360px">Open this from Orbit's <b>Import from CRUX</b> button, not directly.</div></div>`,
    )
    return true
  }

  try {
    const payload = buildOrbitPayload()
    opener.postMessage(payload, target)
    render(
      `<div><div style="font-size:36px;margin-bottom:12px">✅</div>
       <div style="font-weight:700;font-size:18px;margin-bottom:6px">Sent to Orbit</div>
       <div style="color:#9a9aa2">${payload.counts.items} item${payload.counts.items === 1 ? '' : 's'} (${payload.counts.cards} flashcards). You can close this.</div></div>`,
    )
  } catch (err) {
    opener.postMessage({ handoffError: err instanceof Error ? err.message : 'export failed' }, target)
    render(
      `<div><div style="font-size:32px;margin-bottom:12px">⚠️</div>
       <div style="font-weight:700;font-size:18px">Couldn't build the export</div></div>`,
    )
  }

  // Close shortly after; Orbit also closes us once it has the data.
  window.setTimeout(() => { try { window.close() } catch { /* ignore */ } }, 1800)
  return true
}
