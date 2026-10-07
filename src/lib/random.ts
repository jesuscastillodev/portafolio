/**
 * Entero uniforme en [0, max) usando crypto.getRandomValues con rechazo
 * (sin sesgo de módulo). Devuelve 0 si max <= 0.
 */
export function randomInt(max: number): number {
  if (!Number.isFinite(max) || max <= 0) return 0;
  const maxUint32 = 0xffffffff;
  const limit = maxUint32 - (maxUint32 % max); // umbral de rechazo
  const buf = new Uint32Array(1);
  let x = 0;
  do {
    crypto.getRandomValues(buf);
    x = buf[0];
  } while (x >= limit);
  return x % max;
}
