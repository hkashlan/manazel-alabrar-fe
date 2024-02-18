import { marked } from 'marked';

export const md = {
  parse(str: string): string {
    return marked.parseInline(str);
  },
};
