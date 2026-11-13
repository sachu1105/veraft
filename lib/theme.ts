/**
 * Manual light/dark theme. Light is the default; the OS preference is
 * deliberately ignored. The choice lives on <html data-theme> and in
 * localStorage, and is applied before first paint by `themeInitScript`.
 */

export type Theme = "light" | "dark";

export const THEME_KEY = "veraft-theme";
export const THEME_COLORS: Record<Theme, string> = { light: "#ffffff", dark: "#0e0e0d" };

/** Inline <head> script: apply a saved dark choice before paint (no flash). */
export const themeInitScript = `(function(){try{if(localStorage.getItem("${THEME_KEY}")==="dark"){var d=document.documentElement;d.dataset.theme="dark";var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","${THEME_COLORS.dark}")}}catch(e){}})();`;
