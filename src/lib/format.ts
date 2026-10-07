// Helpers de formato y parseo para es-CL.

export const fmtCLP = (n: number) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n);

export const fmtNum = (n: number, dec = 2) =>
  new Intl.NumberFormat('es-CL', { minimumFractionDigits: dec, maximumFractionDigits: dec }).format(n);

/** Parsea formato chileno (punto = miles, coma = decimales) a número. */
export const parseNum = (s: string): number => {
  if (!s) return 0;
  const clean = s.replace(/\./g, '').replace(',', '.').replace(/[^0-9.]/g, '');
  const v = parseFloat(clean);
  return isNaN(v) ? 0 : v;
};

/** Extrae solo los dígitos de un texto y los devuelve como entero (0 si no hay). */
export const parseIntDigits = (raw: string): number => {
  const n = parseInt((raw || '').replace(/[^0-9]/g, ''), 10);
  return isNaN(n) ? 0 : n;
};

/** Agrupa miles con punto (es-CL). */
export const groupMiles = (n: number): string => n.toLocaleString('es-CL');
