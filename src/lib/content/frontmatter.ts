import { z } from 'zod';

/**
 * Schema for article frontmatter. Validated at build time so a typo
 * surfaces as an error instead of silently producing "Untitled" posts.
 */
export const frontmatterSchema = z.object({
  title: z.string().min(1, 'title is required'),
  description: z.string().default(''),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be in YYYY-MM-DD format')
    .default(() => new Date().toISOString().split('T')[0]),
  tags: z.array(z.string()).default([]),
  image: z.string().optional(),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

export const parseFrontmatter = (data: unknown, slug: string): Frontmatter => {
  const result = frontmatterSchema.safeParse(data);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `${issue.path.join('.') || 'frontmatter'}: ${issue.message}`)
      .join(', ');

    throw new Error(`Invalid frontmatter in content/articles/${slug}.mdx — ${issues}`);
  }

  return result.data;
};
