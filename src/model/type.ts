export interface CommentProps {
  postId: string;
  id: string;
  name: string;
  email: string;
  body: string;
}
export interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  isPremium: boolean;
  isFriend: boolean;
  isBlocked: boolean;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface PostProps {
  body: string;
  id?: string | null;
  title: string;
  userId: number;
  isBlocked?: boolean;
  likes: number;
}
export interface SinglePostProps {
  body: string;
  createdAt: string;
  title: string;
  updatedAt: string;
  userId: string;
  _v: number;
  _id: string;
}
export interface PhotoProps {
  albumId: string;
  id: string;
  thumbnailUrl: string;
  title: string;
  url: string;
}
