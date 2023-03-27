import { createAction } from '@reduxjs/toolkit';
import { Comment } from '../../../types/comments';

const setComments = createAction<Comment[]>('comments/setComments');

export { setComments };
