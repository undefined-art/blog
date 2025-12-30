'use client';

import { useMemo } from 'react';

type MDXContentProps = {
  content: string;
};

const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const parseInlineFormatting = (text: string): string => {
  let result = text;

  // Inline code
  result = result.replace(
    /`([^`]+)`/g,
    '<code class="font-mono text-sm bg-parchment-200 dark:bg-ink-800 px-1.5 py-0.5 rounded text-accent-terracotta dark:text-accent-ochre">$1</code>'
  );

  // Bold
  result = result.replace(
    /\*\*(.+?)\*\*/g,
    '<strong class="font-semibold text-ink-900 dark:text-parchment-100">$1</strong>'
  );

  // Italic
  result = result.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links
  result = result.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent-terracotta dark:text-accent-ochre hover:underline transition-colors duration-200">$1</a>'
  );

  return result;
};

const parseTable = (tableText: string): string => {
  const lines = tableText.trim().split('\n');
  if (lines.length < 2) return tableText;

  const headerLine = lines[0];
  const separatorLine = lines[1];
  const bodyLines = lines.slice(2);

  if (!separatorLine.match(/^\|[\s\-:|]+\|$/)) return tableText;

  const parseRow = (line: string): string[] => {
    return line
      .split('|')
      .slice(1, -1)
      .map((cell) => cell.trim());
  };

  const headers = parseRow(headerLine);
  const rows = bodyLines.map(parseRow);

  const headerHtml = headers
    .map(
      (h) =>
        `<th class="px-4 py-3 text-left text-sm font-semibold text-ink-900 dark:text-parchment-100 bg-parchment-100 dark:bg-ink-800">${parseInlineFormatting(h)}</th>`
    )
    .join('');

  const bodyHtml = rows
    .map(
      (row, i) =>
        `<tr class="${i % 2 === 0 ? 'bg-parchment-50 dark:bg-ink-900/50' : 'bg-white dark:bg-ink-950/50'}">
          ${row.map((cell) => `<td class="px-4 py-3 text-sm text-ink-700 dark:text-parchment-300 border-t border-ink-100 dark:border-ink-800">${parseInlineFormatting(cell)}</td>`).join('')}
        </tr>`
    )
    .join('');

  return `
    <div class="my-6 overflow-x-auto rounded-xl border border-ink-200 dark:border-ink-700">
      <table class="w-full border-collapse">
        <thead>
          <tr>${headerHtml}</tr>
        </thead>
        <tbody>${bodyHtml}</tbody>
      </table>
    </div>
  `;
};

const parseNumberedList = (listText: string): string => {
  const lines = listText.trim().split('\n');
  const items = lines
    .filter((line) => line.match(/^\d+\.\s/))
    .map((line) => {
      const match = line.match(/^\d+\.\s*/);
      const itemContent = parseInlineFormatting(line.replace(/^\d+\.\s*/, ''));

      return `<li class="flex items-start gap-3"><span class="text-accent-terracotta dark:text-accent-ochre font-semibold min-w-[1.5rem]">${Number(match?.[0] || 1)}.</span><span>${itemContent}</span></li>`;
    })
    .join('');

  return `<ol class="space-y-2 my-4 text-ink-700 dark:text-parchment-300">${items}</ol>`;
};

const parseBulletList = (listText: string): string => {
  const lines = listText.trim().split('\n');
  const items = lines
    .filter((line) => line.trim().startsWith('- '))
    .map((line) => {
      const itemContent = parseInlineFormatting(line.replace(/^- /, ''));
      return `<li class="flex items-start gap-3"><span class="text-accent-terracotta dark:text-accent-ochre">•</span><span>${itemContent}</span></li>`;
    })
    .join('');
  return `<ul class="space-y-2 my-4 text-ink-700 dark:text-parchment-300">${items}</ul>`;
};

export const MDXContent = ({ content }: MDXContentProps) => {
  const htmlContent = useMemo(() => {
    let html = content;
    const codeBlocks: string[] = [];
    const tables: string[] = [];
    const numberedLists: string[] = [];
    const bulletLists: string[] = [];

    // Store code blocks first
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const index = codeBlocks.length;
      const langClass = lang ? `language-${lang}` : '';
      codeBlocks.push(
        `<pre class="bg-ink-900 border border-ink-700/50 rounded-xl p-4 overflow-x-auto my-6"><code class="${langClass} text-parchment-200 text-sm font-mono">${escapeHtml(code.trim())}</code></pre>`
      );
      return `__CODE_BLOCK_${index}__`;
    });

    html = html.replace(
      /(\|.+\|\n\|[\s\-:|]+\|\n(?:\|.+\|\n?)+)/g,
      (match) => {
        const index = tables.length;
        tables.push(parseTable(match));
        return `__TABLE_${index}__`;
      }
    );

    html = html.replace(/(?:^|\n)((?:\d+\.\s+.+\n?)+)/g, (match, listContent) => {
      const index = numberedLists.length;
      numberedLists.push(parseNumberedList(listContent));
      return `\n__NUMLIST_${index}__\n`;
    });

    html = html.replace(/(?:^|\n)((?:- .+\n?)+)/g, (match, listContent) => {
      const index = bulletLists.length;
      bulletLists.push(parseBulletList(listContent));

      return `\n__BULLETLIST_${index}__\n`;
    });

    html = html.replace(
      /`([^`]+)`/g,
      '<code class="font-mono text-sm bg-parchment-200 dark:bg-ink-800 px-1.5 py-0.5 rounded text-accent-terracotta dark:text-accent-ochre">$1</code>'
    );

    html = html.replace(
      /^### (.+)$/gm,
      '<h3 class="font-display text-xl font-semibold text-ink-900 dark:text-parchment-100 mt-8 mb-3">$1</h3>'
    );

    html = html.replace(
      /^## (.+)$/gm,
      '<h2 class="font-display text-2xl font-semibold text-ink-900 dark:text-parchment-100 mt-12 mb-4">$1</h2>'
    );
    html = html.replace(
      /^# (.+)$/gm,
      '<h1 class="font-display text-3xl font-bold text-ink-900 dark:text-parchment-100 mt-12 mb-6">$1</h1>'
    );

    html = html.replace(
      /\*\*(.+?)\*\*/g,
      '<strong class="font-semibold text-ink-900 dark:text-parchment-100">$1</strong>'
    );
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent-terracotta dark:text-accent-ochre hover:underline transition-colors duration-200">$1</a>'
    );

    html = html.replace(
      /^> (.+)$/gm,
      '<blockquote class="border-l-4 border-accent-terracotta dark:border-accent-ochre bg-parchment-100/50 dark:bg-ink-900/50 py-3 px-4 my-6 rounded-r-lg"><p class="italic text-ink-600 dark:text-parchment-400">$1</p></blockquote>'
    );

    html = html.replace(
      /^---$/gm,
      '<hr class="my-8 border-ink-200 dark:border-ink-700" />'
    );

    const blocks = html.split(/\n\n+/);

    html = blocks
      .map((block) => {
        const trimmed = block.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('<')) return trimmed;
        if (trimmed.startsWith('__CODE_BLOCK_')) return trimmed;
        if (trimmed.startsWith('__TABLE_')) return trimmed;
        if (trimmed.startsWith('__NUMLIST_')) return trimmed;
        if (trimmed.startsWith('__BULLETLIST_')) return trimmed;
        return `<p class="my-4 text-ink-700 dark:text-parchment-300 leading-relaxed">${trimmed.replace(/\n/g, '<br />')}</p>`;
      })
      .join('\n');

    codeBlocks.forEach((block, index) => {
      html = html.replace(`__CODE_BLOCK_${index}__`, block);
    });

    tables.forEach((table, index) => {
      html = html.replace(`__TABLE_${index}__`, table);
    });

    numberedLists.forEach((list, index) => {
      html = html.replace(`__NUMLIST_${index}__`, list);
    });

    bulletLists.forEach((list, index) => {
      html = html.replace(`__BULLETLIST_${index}__`, list);
    });

    html = html.replace(
      /<p class="[^"]*">(<(h[1-6]|ul|ol|blockquote|pre|hr|div)[^>]*>)/g,
      '$1'
    );

    html = html.replace(
      /(<\/(h[1-6]|ul|ol|blockquote|pre|div)>)<\/p>/g,
      '$1'
    );

    return html;
  }, [content]);

  return (
    <div
      className="prose-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};
