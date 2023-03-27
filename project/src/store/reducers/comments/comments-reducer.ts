import { Comment } from '../../../types/comments';
import { createReducer } from '@reduxjs/toolkit';
import { setComments } from './comments-actions';

type InitialState = {
  comments: Comment[];
}

const initialState: InitialState = {
  comments: []
};

const commentsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    });
});

export { commentsReducer };
