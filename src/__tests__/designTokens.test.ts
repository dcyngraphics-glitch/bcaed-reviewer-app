import { describe, test, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const css = readFileSync(resolve(__dirname, '../index.css'), 'utf-8');

/**
 * Extracts all --color-* custom property names from the @theme block.
 */
function extractColorTokens(css: string): string[] {
  const themeMatch = css.match(/@theme\s*\{([\s\S]*?)\}/);
  if (!themeMatch) return [];
  const body = themeMatch[1];
  const names: string[] = [];
  const re = /--color-([\w-]+)\s*:/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) {
    names.push(m[1]);
  }
  return names;
}

/**
 * Extracts all --*-radius custom property names.
 */
function extractRadiusTokens(css: string): string[] {
  const themeMatch = css.match(/@theme\s*\{([\s\S]*?)\}/);
  if (!themeMatch) return [];
  const body = themeMatch[1];
  const names: string[] = [];
  const re = /--radius-([\w-]+)\s*:/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) {
    names.push(m[1]);
  }
  return names;
}

/**
 * Extracts all --shadow-* custom property names.
 */
function extractShadowTokens(css: string): string[] {
  const themeMatch = css.match(/@theme\s*\{([\s\S]*?)\}/);
  if (!themeMatch) return [];
  const body = themeMatch[1];
  const names: string[] = [];
  const re = /--shadow-([\w-]+)\s*:/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) {
    names.push(m[1]);
  }
  return names;
}

/**
 * Extracts all --font-* custom property names.
 */
function extractFontTokens(css: string): string[] {
  const themeMatch = css.match(/@theme\s*\{([\s\S]*?)\}/);
  if (!themeMatch) return [];
  const body = themeMatch[1];
  const names: string[] = [];
  const re = /--font-([\w-]+)\s*:/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) {
    names.push(m[1]);
  }
  return names;
}

// ─── Colour scales ───────────────────────────────────────────────────────────

const SCALES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const;

const SEMANTIC_COLORS = [
  'primary',
  'secondary',
  'neutral',
  'success',
  'warning',
  'error',
  'info',
] as const;

describe('Design Token System — Colour Scales', () => {
  test('has a @theme block', () => {
    expect(css).toMatch(/@theme\s*\{/);
  });

  test.each(SEMANTIC_COLORS)('has a complete %s scale (50–950)', (color) => {
    const tokens = extractColorTokens(css);
    for (const shade of SCALES) {
      expect(tokens).toContain(`${color}-${shade}`);
    }
  });

  test('every colour token uses oklch()', () => {
    const themeMatch = css.match(/@theme\s*\{([\s\S]*?)\}/);
    expect(themeMatch).not.toBeNull();
    const body = themeMatch![1];
    const colorDeclarations = body.match(/--color-[\w-]+\s*:\s*[^;]+/g) ?? [];
    expect(colorDeclarations.length).toBeGreaterThan(0);
    for (const decl of colorDeclarations) {
      expect(decl).toMatch(/oklch\(/);
    }
  });
});

// ─── Semantic / alias tokens ────────────────────────────────────────────────

describe('Design Token System — Semantic Tokens', () => {
  test('has background and foreground aliases', () => {
    const tokens = extractColorTokens(css);
    expect(tokens).toContain('background');
    expect(tokens).toContain('foreground');
  });

  test('has card and card-foreground aliases', () => {
    const tokens = extractColorTokens(css);
    expect(tokens).toContain('card');
    expect(tokens).toContain('card-foreground');
  });

  test('has muted and muted-foreground aliases', () => {
    const tokens = extractColorTokens(css);
    expect(tokens).toContain('muted');
    expect(tokens).toContain('muted-foreground');
  });

  test('has a border alias', () => {
    const tokens = extractColorTokens(css);
    expect(tokens).toContain('border');
  });

  test('has a ring alias', () => {
    const tokens = extractColorTokens(css);
    expect(tokens).toContain('ring');
  });
});

// ─── Typography ─────────────────────────────────────────────────────────────

describe('Design Token System — Typography', () => {
  test('has a --font-sans token', () => {
    const fonts = extractFontTokens(css);
    expect(fonts).toContain('sans');
  });

  test('has a --font-mono token', () => {
    const fonts = extractFontTokens(css);
    expect(fonts).toContain('mono');
  });
});

// ─── Border radius ──────────────────────────────────────────────────────────

describe('Design Token System — Border Radius', () => {
  test.each(['sm', 'md', 'lg', 'xl', '2xl'])('has a --radius-%s token', (size) => {
    const radii = extractRadiusTokens(css);
    expect(radii).toContain(size);
  });
});

// ─── Shadows ────────────────────────────────────────────────────────────────

describe('Design Token System — Shadows', () => {
  test.each(['sm', 'md', 'lg', 'xl'])('has a --shadow-%s token', (size) => {
    const shadows = extractShadowTokens(css);
    expect(shadows).toContain(size);
  });
});

// ─── Backwards compatibility ────────────────────────────────────────────────

describe('Design Token System — Backwards Compatibility', () => {
  test('retains the original primary-50 token', () => {
    const tokens = extractColorTokens(css);
    expect(tokens).toContain('primary-50');
  });

  test('retains the original primary-100 token', () => {
    const tokens = extractColorTokens(css);
    expect(tokens).toContain('primary-100');
  });

  test('retains the original primary-500 token', () => {
    const tokens = extractColorTokens(css);
    expect(tokens).toContain('primary-500');
  });

  test('retains the original primary-600 token', () => {
    const tokens = extractColorTokens(css);
    expect(tokens).toContain('primary-600');
  });

  test('retains the original primary-700 token', () => {
    const tokens = extractColorTokens(css);
    expect(tokens).toContain('primary-700');
  });

  test('retains the original primary-800 token', () => {
    const tokens = extractColorTokens(css);
    expect(tokens).toContain('primary-800');
  });

  test('retains the original secondary-50 token', () => {
    const tokens = extractColorTokens(css);
    expect(tokens).toContain('secondary-50');
  });

  test('retains the original secondary-100 token', () => {
    const tokens = extractColorTokens(css);
    expect(tokens).toContain('secondary-100');
  });

  test('retains the original secondary-600 token', () => {
    const tokens = extractColorTokens(css);
    expect(tokens).toContain('secondary-600');
  });

  test('retains the original secondary-700 token', () => {
    const tokens = extractColorTokens(css);
    expect(tokens).toContain('secondary-700');
  });

  test('retains the original secondary-800 token', () => {
    const tokens = extractColorTokens(css);
    expect(tokens).toContain('secondary-800');
  });

  test('retains the original ring token', () => {
    const tokens = extractColorTokens(css);
    expect(tokens).toContain('ring');
  });
});
