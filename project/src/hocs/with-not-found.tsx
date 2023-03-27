import React, { ComponentType, Dispatch, SetStateAction, useState } from 'react';
import NotFoundScreen from '../pages/not-found-screen/not-found-screen';

type HOCProps = {
  isNotFound: boolean;
  setNotFound: Dispatch<SetStateAction<boolean>>;
}

function withNotFound<T>(Component: ComponentType<T>): ComponentType<Omit<T, keyof HOCProps>> {

  type ComponentProps = Omit<T, keyof HOCProps>;

  function WithNotFound(props: ComponentProps): JSX.Element {
    const [isNotFound, setNotFound] = useState(false);

    return isNotFound
      ? <NotFoundScreen resetNotFound={() => setNotFound(false)}/>
      : <Component setNotFound={setNotFound} {...props as T}/>;
  }

  return WithNotFound;
}

export default withNotFound;
