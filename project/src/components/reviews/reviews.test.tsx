import { render, screen } from '@testing-library/react';
import { createMockStoreWithAPI, ProviderWrapper } from '../../utils/jest';
import Reviews from './reviews';
import { DeepPartial } from '@reduxjs/toolkit';
import { RootState } from '../../types/store';
import { AuthorizationStatus, NameSpace } from '../../consts/enum';
import { makeFakeComment } from '../../utils/mocks';

const fakeState: DeepPartial<RootState> = {
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth
  },
  [NameSpace.Offer]: {
    comments: [makeFakeComment()]
  },
};
const { fakeStore } = createMockStoreWithAPI(fakeState);

describe('Component: Reviews', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <Reviews>
          <p>test</p>
        </Reviews>
      </ProviderWrapper>
    );

    const commentCount = fakeState[NameSpace.Offer]?.comments?.length.toString() as string;

    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByTestId('count')).toHaveTextContent(commentCount);
  });
});
