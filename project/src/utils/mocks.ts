import * as faker from 'faker';
import { City } from '../consts/enum';
import { Offer } from '../types/offers';
import { Comment } from '../types/comments';
import { AuthUser } from '../types/app';

type MakeFakeOffer = (
  {
    city,
    price,
    rating,
    isFavorite
  }:
    {
      city?: City;
      rating?: number;
      price?: number;
      isFavorite?: boolean;
    }) => Offer

const makeFakeOffer: MakeFakeOffer = (
  {
    city = City.Paris,
    price = faker.datatype.number(),
    rating = faker.datatype.number(),
    isFavorite = faker.datatype.boolean()
  } = {}
) => {
  const id = faker.datatype.number();

  return {
    city: {
      name: city,
      location: {
        latitude: faker.datatype.float(),
        longitude: faker.datatype.float(),
        zoom: faker.datatype.float()
      }
    },
    previewImage: faker.image.image(),
    images: [faker.image.image(), faker.image.image(), faker.image.image()],
    title: faker.name.findName(),
    isFavorite: isFavorite,
    isPremium: faker.datatype.boolean(),
    rating: rating,
    type: faker.name.findName(),
    bedrooms: faker.datatype.number(),
    maxAdults: faker.datatype.number(),
    price: price,
    goods: [faker.name.findName(), faker.name.findName(), faker.name.findName()],
    host: {
      id,
      name: faker.name.findName(),
      isPro: faker.datatype.boolean(),
      avatarUrl: faker.image.avatar()
    },
    description: faker.name.findName(),
    location: {
      latitude: faker.datatype.float(),
      longitude: faker.datatype.float(),
      zoom: faker.datatype.float()
    },
    id
  };
};

const makeFakeComment = (): Comment => ({
  id: faker.datatype.number(),
  user: {
    id: faker.datatype.number(),
    isPro: faker.datatype.boolean(),
    name: faker.name.findName(),
    avatarUrl: faker.image.avatar()
  },
  rating: faker.datatype.number(),
  comment: faker.lorem.sentence(),
  date: faker.date.past()

});

const makeFakeUser = (): AuthUser => ({
  id: faker.datatype.number(),
  isPro: faker.datatype.boolean(),
  name: faker.name.findName(),
  avatarUrl: faker.image.avatar(),
  email: faker.datatype.string(),
  token: faker.datatype.string()
});

export { makeFakeOffer, makeFakeComment, makeFakeUser };
