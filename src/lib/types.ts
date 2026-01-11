export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  content: string;
  image?: string;
};

export type BlogPostMeta = Omit<BlogPost, 'content'>;

