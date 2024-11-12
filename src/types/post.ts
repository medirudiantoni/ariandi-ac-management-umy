export type Category = {
  id: number;
  name: string;
};

export type Author = {
  id: number;
  username: string;
};

export type Post = {
  id: number;
  title: string;
  category: Category;
  author: Author;
  content: string;
  status: boolean;
  createdAt: string;
  poster: string;
};

export type PostApiResponse = {
  data: Post[];
};

export type PostApiResponseSingle = {
  data: Post;
};
