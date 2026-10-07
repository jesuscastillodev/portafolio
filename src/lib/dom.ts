/** Atajo tipado para document.querySelector (devuelve el elemento ya tipado). */
export const $ = <T extends HTMLElement = HTMLElement>(s: string) => document.querySelector(s) as T;
