import { describe, expect, it } from 'vitest';
import { formatDate, resolveAssetPath } from './utils';

describe('formatDate', () => {
  it('formats a date string in long US format', () => {
    expect(formatDate('2025-12-31')).toBe('December 31, 2025');
  });

  it('handles dates with time components', () => {
    expect(formatDate('2025-06-01T12:00:00Z')).toBe('June 1, 2025');
  });
});

describe('resolveAssetPath', () => {
  it('returns empty input unchanged', () => {
    expect(resolveAssetPath('')).toBe('');
  });

  it('leaves absolute URLs untouched', () => {
    expect(resolveAssetPath('https://example.com/img.png')).toBe('https://example.com/img.png');
    expect(resolveAssetPath('http://example.com/img.png')).toBe('http://example.com/img.png');
  });

  it('leaves paths already prefixed with the base path untouched', () => {
    expect(resolveAssetPath('/blog/images/cover.jpg')).toBe('/blog/images/cover.jpg');
  });

  it('prefixes relative and absolute local paths with the base path', () => {
    expect(resolveAssetPath('/images/cover.jpg')).toBe('/blog/images/cover.jpg');
    expect(resolveAssetPath('images/cover.jpg')).toBe('/blog/images/cover.jpg');
  });
});
