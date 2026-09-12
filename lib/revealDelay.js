const REVEAL_DELAYS = ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'];

export function revealDelayClass(index, mod) {
  return REVEAL_DELAYS[index % mod];
}
