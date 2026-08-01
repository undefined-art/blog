import { describe, expect, it } from 'vitest';
import { parseFrontmatter } from './frontmatter';

describe('parseFrontmatter', () => {
  it('parses valid frontmatter', () => {
    const result = parseFrontmatter(
      { title: 'Hello', description: 'A post', date: '2025-01-15', tags: ['Web', 'Dev'] },
      'hello'
    );

    expect(result).toEqual({
      title: 'Hello',
      description: 'A post',
      date: '2025-01-15',
      tags: ['Web', 'Dev'],
    });
  });

  it('applies defaults for missing optional fields', () => {
    const result = parseFrontmatter({ title: 'Minimal' }, 'minimal');

    expect(result.description).toBe('');
    expect(result.tags).toEqual([]);
    expect(result.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('accepts an image field', () => {
    const result = parseFrontmatter(
      { title: 'With image', image: '/images/cover.jpg' },
      'with-image'
    );

    expect(result.image).toBe('/images/cover.jpg');
  });

  it('rejects a missing title', () => {
    expect(() => parseFrontmatter({}, 'no-title')).toThrow(/Invalid frontmatter.*no-title/);
  });

  it('rejects malformed dates', () => {
    expect(() => parseFrontmatter({ title: 'Bad', date: 'not-a-date' }, 'bad-date')).toThrow(
      /YYYY-MM-DD/
    );
  });
});
