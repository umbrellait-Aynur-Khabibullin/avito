/**
 * Иконки таб-бара из Icons8 (icons8.com).
 * ID получены через icons8 MCP: search_icons + get_icon_png_url.
 */
const ICONS8_BASE = 'https://img.icons8.com/?id=';

/** Монохромные иконки ios7 — поддерживают параметр color в URL */
export const tabIconIds = {
  ProductsTab: '119', // Price Tag
  MyProductsTab: '482', // Briefcase
  MessagesTab: '118377', // Chat Message
  ProfileTab: '7823', // Profile
} as const;

/** HEX без решётки, например FF6B35 или 6B6B6B */
export function getTabIconUrl(
  tab: keyof typeof tabIconIds,
  size: number,
  colorHex: string
): string {
  return `${ICONS8_BASE}${tabIconIds[tab]}&format=png&size=${size}&color=${colorHex.replace('#', '')}`;
}
