import { Comments } from '../types/comments';

export const comments: Comments = [{
  'id': 1,
  'user': {
    'id': 15,
    'isPro': false,
    'name': 'Kendall',
    'avatarUrl': 'https://12.react.pages.academy/static/avatar/6.jpg'
  },
  'rating': 4,
  'comment': 'What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!',
  'date': new Date('2023-02-12T10:33:21.322Z')
},
{
  'id': 2,
  'user': {
    'id': 10,
    'isPro': true,
    'name': 'Max',
    'avatarUrl': 'https://12.react.pages.academy/static/avatar/1.jpg'
  },
  'rating': 3,
  'comment': 'The deluxe room was a quite comfortable one with all the adequate facilities. The only thing that made me feel uncomfortable was the rude behavior of an impolite staff at the reception desk.',
  'date': new Date('2023-02-09T10:33:21.322Z')
}];
