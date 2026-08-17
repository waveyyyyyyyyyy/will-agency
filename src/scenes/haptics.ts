/**
 * Thin wrapper around the Web Vibration API — a tactile cue only, never
 * anything visual. Supported on Android Chrome/Firefox; iOS Safari has
 * never implemented the Vibration API at all (an Apple platform choice,
 * not something fixable from a web page), and desktop computers have no
 * vibration motor for a browser to drive in the first place — both cases
 * are simply silent no-ops here, so it's always safe to call.
 */
function vibrate(pattern: number | number[]) {
  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") return;
  try {
    navigator.vibrate(pattern);
  } catch {
    /* a handful of browsers throw if this is called outside a user
       gesture or too soon after another call — harmless to skip */
  }
}

/** A light tap — selecting or toggling a card on. */
export function hapticTap() {
  vibrate(10);
}

/** A slightly firmer double-pulse — confirming a choice, stepping into a path. */
export function hapticConfirm() {
  vibrate([12, 40, 14]);
}
