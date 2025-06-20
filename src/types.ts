export type UserRequestBody = {
  username: string;
  name: string;
  email: string;
  password: string;
  location: string;
  bio: string;
  avatar: string;
  cover_image: string;
};

export type TweetRequestBody = {
  id: string;
  author: string;
  content: string;
  media: string[];
};

export type ReplyRequestBody = {
  id: string;
  user_id: string;
  tweet: string;
  content: string;
  media: string[];
};
