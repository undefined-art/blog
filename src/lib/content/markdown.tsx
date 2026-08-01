import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeReact from 'rehype-react';
import * as runtime from 'react/jsx-runtime';
import type { AnchorHTMLAttributes, ImgHTMLAttributes, ReactElement } from 'react';
import { resolveAssetPath } from '../utils';

type SanitizeOptions = NonNullable<Parameters<typeof rehypeSanitize>[0]>;

type ArticleImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
  src?: string;
  alt?: string;
};

/**
 * Article links: open external URLs in a new tab, keep internal links
 * in place. The `javascript:` protocol is already stripped upstream by
 * rehype-sanitize, so hrefs reaching here are safe.
 */
const ArticleLink = ({ href = '', children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  );
};

/**
 * Article images: resolves local asset paths against the deployment
 * base path and mirrors the previous figure/figcaption treatment when
 * an alt text is present.
 */
const ArticleImage = ({ alt = '', src = '', ...rest }: ArticleImageProps) => {
  const resolvedSrc = resolveAssetPath(src);

  if (alt) {
    return (
      <figure>
        {/* next/image is disabled (static export + unoptimized), plain img keeps
            the build-time pipeline framework-agnostic */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={resolvedSrc} alt={alt} loading="lazy" {...rest} />
        <figcaption>{alt}</figcaption>
      </figure>
    );
  }

  /* eslint-disable-next-line @next/next/no-img-element */
  return <img src={resolvedSrc} alt="" loading="lazy" {...rest} />;
};

/**
 * rehype-sanitize default schema strips `className` and prefixes heading
 * ids with `user-content-`. Extend it so rehype-highlight classes and
 * rehype-slug anchors survive, while keeping every XSS guard intact.
 */
const sanitizeSchema: SanitizeOptions = {
  ...defaultSchema,
  clobberPrefix: '',
  attributes: {
    ...(defaultSchema.attributes ?? {}),
    '*': [...(defaultSchema.attributes?.['*'] ?? []), 'className'],
  },
};

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeHighlight, { ignoreMissing: true })
  .use(rehypeSanitize, sanitizeSchema)
  .use(rehypeReact, {
    Fragment: runtime.Fragment,
    jsx: runtime.jsx,
    jsxs: runtime.jsxs,
    components: {
      a: ArticleLink,
      img: ArticleImage,
    },
  });

/**
 * Compiles trusted-by-format markdown (parsed at build time) into React
 * elements. No dangerouslySetInnerHTML, no client-side parsing.
 */
export const markdownToReact = (markdown: string): ReactElement => {
  return processor.processSync(markdown).result as ReactElement;
};
