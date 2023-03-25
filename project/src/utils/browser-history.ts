import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();

const findParamInPath = <P extends string>(params: string[]) =>
  browserHistory.location.pathname.split('/')
    .find<P>((item): item is P => params.includes(item));

export { browserHistory, findParamInPath };
