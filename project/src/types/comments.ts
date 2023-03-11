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

export type Comments = Comment[]
