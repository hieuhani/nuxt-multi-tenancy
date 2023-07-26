export type User = {
  name: string;
  username: string;
  user_id: number;
  profile_image: string;
  profile_image_90: string;
};

export type Organization = {
  id: number;
  name: string;
  username: string;
  slug: string;
  tag_line?: string;
  profile_image: string;
  profile_image_90: string;
  joined_at: string;
};
export type Article = {
  id: number;
  title: string;
  description: string;
  slug: string;
  comments_count: number;
  public_reactions_count: number;
  readable_publish_date: string;
  created_at: string;
  tag_list: string[];
  user: User;
  cover_image?: string;
  reading_time_minutes: number;
  organization?: Organization;
};

export type ArticleDetail = Article & {
  body_html: string;
  body_markdown: string;
};
