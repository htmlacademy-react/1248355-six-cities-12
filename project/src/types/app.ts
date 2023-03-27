import { BookmarkButtonVariant, LogoVariant as LogoVariantEnum, OfferCardVariant } from '../consts/enum';

export type OfferVariant = typeof OfferCardVariant[keyof typeof OfferCardVariant]

export type LogoVariant = typeof LogoVariantEnum[keyof typeof LogoVariantEnum]

export type BookmarkVariant = typeof BookmarkButtonVariant[keyof typeof BookmarkButtonVariant]

export type Login = {
  email: string;
  password: string;
}
