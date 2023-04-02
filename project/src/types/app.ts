import { BookmarkButtonVariant, LogoVariant as LogoVariantEnum, OfferCardVariant } from '../consts/enum';
import { User } from './comments';

export type OfferVariant = typeof OfferCardVariant[keyof typeof OfferCardVariant]

export type LogoVariant = typeof LogoVariantEnum[keyof typeof LogoVariantEnum]

export type BookmarkVariant = typeof BookmarkButtonVariant[keyof typeof BookmarkButtonVariant]

export type Login = {
  email: string;
  password: string;
}

export type AuthUser = User & {
  email: string;
  token: string;
};

export type UpdateFavorite = {
  isFavorite: boolean;
  id: number;
};
