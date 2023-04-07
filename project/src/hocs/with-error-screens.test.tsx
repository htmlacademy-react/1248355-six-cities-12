import { render, screen } from '@testing-library/react';
import withErrorScreens from './with-error-screens';

describe('HOC: withErrorScreens', () => {
  it('base component should correct rendering when use with HOC', () => {
    const BaseComponentWrapped = withErrorScreens(() => <h1>withErrorScreens</h1>);

    render(<BaseComponentWrapped/>);

    expect(screen.getByText(/withErrorScreens/i)).toBeInTheDocument();
  });
});
