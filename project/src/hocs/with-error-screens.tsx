import React, { ComponentType, Dispatch, SetStateAction, useState } from 'react';
import NotFoundScreen from '../pages/not-found-screen/not-found-screen';
import ErrorScreen from '../pages/error-screen/error-screen';
import { TIMOUT_ERROR_CODE } from '../consts/app';

export type WithErrorScreensHOCProps = {
  handleErrorScreensShow: (error: string | undefined) => void;
  setNotFoundScreen: Dispatch<SetStateAction<boolean>>;
  setErrorScreen: Dispatch<SetStateAction<boolean>>;
}

function withErrorScreens<T>(Component: ComponentType<T>): ComponentType<Omit<T, keyof WithErrorScreensHOCProps>> {

  type ComponentProps = Omit<T, keyof WithErrorScreensHOCProps>;

  function WithErrorScreens(props: ComponentProps): JSX.Element {
    const [isNotFoundScreen, setNotFoundScreen] = useState(false);
    const [isErrorScreen, setErrorScreen] = useState(false);

    const handleErrorScreensShow: WithErrorScreensHOCProps['handleErrorScreensShow'] = (error) => {
      error === TIMOUT_ERROR_CODE
        ? setErrorScreen(true)
        : setNotFoundScreen(true);
    };

    if (isNotFoundScreen) {
      return <NotFoundScreen resetNotFound={() => setNotFoundScreen(false)}/>;
    }

    if (isErrorScreen) {
      return <ErrorScreen onClick={() => setErrorScreen(false)}/>;
    }

    return (
      <Component
        setNotFoundScreen={setNotFoundScreen}
        setErrorScreen={setErrorScreen}
        handleErrorScreensShow={handleErrorScreensShow}
        {...props as T}
      />);
  }

  return WithErrorScreens;
}

export default withErrorScreens;
