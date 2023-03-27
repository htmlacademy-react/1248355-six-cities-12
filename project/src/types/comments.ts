export type User = {
  id: number;
  isPro: boolean;
  name: string;
  avatarUrl: string;
}

export type Comment = {
  id: number;
  user: User;
  rating: number;
  comment: string;
  date: Date;
}

export type AuthUser = User & {
  email: string;
  token: string;
} | null

export type NewComment = {
  comment: string;
  rating: number;
  id: number;
}

export type Comments = Comment[]
